const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { response } = require('express');
const dotenv = require('dotenv');
var fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const sharp = require('sharp');



// cors
const cors = require('cors');
app.use(express.json());
app.use(cors());



function getOTP() {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}


// Define a route that responds with "Welcome to Archikraft Backend Server"
app.get('/', (req, res) => {
  res.send('Welcome to Archikraft Backend Server');
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password, username, name, confirmPassword, role, country, phoneNumber } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/add-user';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '537'
    };
    const response = await axios.get(apiUrl, {
      params: {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phoneNumber,
        country: country,
        role: role
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail });
    }
    else {
      res.status(500).json({ error: 'An error occurred during signup' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/login-user';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '345'
    };
    // make password as string
    const passwordString = password.toString();
    const response = await axios.get(apiUrl, {
      params: {
        email: email,
        password: passwordString
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail, user: response.data.user });
    }
    else {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});


app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/get-user-by-email';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '456'
    };
    const response = await axios.get(apiUrl, {
      params: {
        email: email
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      const otp = getOTP();
      const apiUrl = 'http://0.0.0.0:8000/send-email';
      const response = await axios.get(apiUrl, {
        params: {
          email: email,
          otp: otp
        },
        headers: headers
      });
      console.log(response.data);
      let { status_code, detail } = response.data;
      if (status_code == 400) {
        res.status(400).json({ error: detail });
      }
      else if (status_code == 200) {
        res.status(200).json({ message: detail, otp: otp });
      }
      else {
        res.status(500).json({ error: 'An error occurred during forgot password' });
      }
    }
    else {
      res.status(500).json({ error: 'An error occurred during forgot password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during forgot password' });
  }
});


app.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/update-password';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '567'
    };
    // make password as string
    const passwordString = password.toString();
    const response = await axios.get(apiUrl, {
      params: {
        email: email,
        password: passwordString
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail });
    }
    else {
      res.status(500).json({ error: 'An error occurred during reset password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during reset password' });
  }
});


app.post('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during logout' });
  }
});


app.post('/saveMessage', async (req, res) => {
  try {
    // console.log(req.body);
    const { message, sender, featureVector, lastMsg, id } = req.body;
    // console.log(req.body);
    const answer = await generateContent(message, featureVector, lastMsg);
    const jsonAnswer = JSON.parse(answer);
    console.log("Answer: ", jsonAnswer);

    // console.log("Answer: ", answer);
    const apiUrl = 'http://0.0.0.0:8000/save-message';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '678'
    };
    let payload = {
      sender: sender,
      receiver: 'gemini',
      message: message,
      timestamp: new Date().toISOString(),
      id: id,
      featureVector: jsonAnswer["featureVector"]
    };

    console.log("Payload" , payload);
    const response = await axios.post(apiUrl,payload);
    console.log("Saving user message",response.data);
    let { status_code, detail } = response.data;
    if (status_code != 200) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      // save gemini's answer
      const apiUrl = 'http://0.0.0.0:8000/save-message';
      // add ngrok-skip-browser-warning in header
      const headers = {
        'ngrok-skip-browser-warning': '678'
      };

      payload = {
        sender: 'gemini',
        receiver: sender,
        message: jsonAnswer["response"],
        timestamp: new Date().toISOString(),
        id: id,
        featureVector: jsonAnswer["featureVector"]
      }
      const response = await axios.post(apiUrl, payload );
      console.log("Saving AI response",response.data);
      let { status_code, detail } = response.data;
      if (status_code == 400) {
        res.status(400).json({ error: detail });
      }
      else if (status_code == 200) {
        res.status(200).json({ message: detail, answer: jsonAnswer["response"], featureVector: jsonAnswer["featureVector"] });
      }
      else {
        res.status(500).json({ error: 'An error occurred during saving message' });
      }
    }
    else {
      res.status(500).json({ error: 'An error occurred during saving message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during saving message', msg: error });
  }
});


app.get('/getMessages', async (req, res) => {
  try {
    const { id } = req.query;
    const apiUrl = 'http://0.0.0.0:8000/get-messages';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '789'
    };
    const response = await axios.get(apiUrl, {
      params: {
        id: id
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail, messages: response.data.chat });
    }
    else {
      res.status(500).json({ error: 'An error occurred during getting messages' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during getting messages' });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const apiUrl = 'http://0.0.0.0:8000/get-all-users';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '890'
    };
    const response = await axios.get(apiUrl, {
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail, users: response.data.users });
    }
    else {
      res.status(500).json({ error: 'An error occurred during getting users' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during getting users' });
  }
}
);

app.post('/deleteUser', async (req, res) => {
  try {
    const { username } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/delete-user';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '901'
    };
    const response = await axios.delete(apiUrl, {
      params: {
        username: username
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail });
    }
    else {
      res.status(500).json({ error: 'An error occurred during deleting user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during deleting user' });
  }
}
);

app.get('/addNews', async (req, res) => {
  try {
    const { text } = req.query;
    const apiUrl = 'http://0.0.0.0:8000/add-news';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '678'
    };
    const response = await axios.get(apiUrl, {
      params: {
        text: text,
        timestamp: new Date()
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail });
    }
    else {
      res.status(500).json({ error: 'An error occurred during adding news' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during adding news' });
  }
}
);

app.get('/getNews', async (req, res) => {
  try {
    const apiUrl = 'http://0.0.0.0:8000/get-news';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '123'
    };
    const response = await axios.get(apiUrl, {
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail, news: response.data.news });
    }
    else {
      res.status(500).json({ error: 'An error occurred during getting news' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during getting news' });
  }
}
);

app.post('/deleteNews', async (req, res) => {
  try {
    const { id } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/delete-news';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '234'
    };
    const response = await axios.delete(apiUrl, {
      params: {
        id: id
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail });
    }
    else {
      res.status(500).json({ error: 'An error occurred during deleting news' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during deleting news' });
  }
}
);

app.post('/getAllChatIds', async (req, res) => {
  try {
    const user = req.body.user;
    const apiUrl = 'http://0.0.0.0:8000/get-all-chat-ids';
    const headers = {
      'ngrok-skip-browser-warning': '345'
    };
    const response = await axios.get(apiUrl, {
      params: {
        user: user
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail, chatIds: response.data.chat_ids });
    }
    else {
      res.status(500).json({ error: 'An error occurred during getting chat ids' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during getting chat ids' });
  }
});

app.post('/getChat', async (req, res) => {
  try {
    const { id } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/get-chat-by-id';
    const headers = {
      'ngrok-skip-browser-warning': '456'
    };
    const response = await axios.get(apiUrl, {
      params: {
        id: id
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail, chat: response.data.chat });
    }
    else {
      res.status(500).json({ error: 'An error occurred during getting chat' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during getting chat' });
  }
});

app.post('/createChat', async (req, res) => {
  try {
    const { user, timestamp } = req.body;
    const apiUrl = 'http://0.0.0.0:8000/create-chat';
    const headers = {
      'ngrok-skip-browser-warning': '567'
    };
    const response = await axios.get(apiUrl, {
      params: {
        user: user,
        timestamp: timestamp
      },
      headers: headers
    });
    // console.log(response.data);
    let { status_code, detail, id } = response.data;
    if (status_code == 200) {
      res.status(200).json({ message: detail, id: id });
    }
    else {
      res.status(500).json({ error: 'An error occurred during creating chat' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during creating chat' });
  }
});

app.post("/generateFloorPlan", async (req, res) => {
  try {
    const { featureVector } = req.body;
    const apiUrl = 'http://127.0.0.1:8000/generateFloorPlan';
    const headers = {
      'ngrok-skip-browser-warning': '567'
    };
    const response = await axios.post(apiUrl, {
        featureVector: featureVector
      }
    );
    // console.log(response.data);
    let { status_code, detail, floorPlan } = response.data;

    // console.log("Floor Plan: ", floorPlan);
    // console.log("details: ",detail)
    // console.log("status_code: ",status_code)

    if (status_code == 200) {
      res.status(200).json({ message: detail, floorPlan: floorPlan });
    }
    else {
      res.status(500).json({ error: 'An error occurred during generating floor plan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during generating floor plan' });
  }
});

dotenv.config();

// 1. Configuration
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", generationConfig });


// 3. Generate Content
async function generateContent(message, featureVector, lastMsg) {
  const str = `Input: {user_prompt}
      Last Message from AI: {lastMsg}
      OldFeatureVector: {featureVector}

      The user is giving information about the house whose floor plan is to be designed.
      Extract the information from the input for the feature vector and then output the updated vecture vector, along with response in the following json format and maintain the order of the keys as given below: 
      The feature vector should only have integers or floats in the value of key-value pairs of feature vector. If an information is not found replace it with -1. And do not ask anything outside of the feature vector.

      Response Guidleines:
      If any of the information is not available in the input write a counter response to ask about that information in this string. 
      Ask in a casual manner like converstion. Try to add minimum tecnical and mathamatical terms. Also ask for 1 missing feature at a time. 
      If user is unsure fill what suits according to the rest of information. Do not show feature vector to the user. Also dont use word 'Response' before generating a response.
      The user does not know that the information is going into feature vector, so the conversation should be casual. And do not return an empty response. If all information is filled just ask the user to "Click on the floor plan button in the top right corner to see the floor plan". 
      Again the output should be in json format as follows:
        "featureVector":{
            "NumberofLivingRooms": int, 
            "NumberofKitchens": int, 
            "NumberofBathrooms": int, 
            "NumberofDiningRooms": int, 
            "NumberofChildrenRooms": int, 
            "NumberofStudyRooms": int, 
            "NumberofBalconies": int, 
            "NumberofStorageRooms": int, 
            "WidthToLengthRatioofLandPlot": float, 
            "MaximumLengthofBedroom": float, 
            "MinimumLengthofBedroom": float, 
            "MaximumWidthofBedroom": float,
            "MinimumWidthofBedroom": float, 
            "FrontDoorLocationX_axis": float, 
            "FrontDoorLocationY_axis": float,
            "NumberofBedrooms": int
        },
        "response": "{Message for user here}"`;

  // replace {user_prompt} with message
  const str1 = str.replace('{user_prompt}', message);
  const str2 = str1.replace('{featureVector}', JSON.stringify(featureVector));
  const str3 = str2.replace('{lastMsg}', lastMsg);
  console.log("Sending messgae to AI: ",str3);

  try {
    const prompt = str3;
    const result = await model.generateContent(prompt);
    // console.log('Result:', result);
    const response = await result.response;
    // console.log('Result:', response.text());
    const text = response.text();
    return text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);

  } catch (error) {
    console.error('Error generating content:', error);
  }
}


app.post("/convertToPdf", async (req, res) => {
  try {
    const { svg } = req.body;
    console.log("SVG: ", svg);

    // Create a new PDF document
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
      res.send(pdfData);
    });

    // Convert SVG to PDF
    SVGtoPDF(doc, svg, 10, 10);

    // Finalize the PDF and end the stream
    doc.end();
    // res.status(200).json({ message: 'Pdf generated successfully' });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred during converting to pdf' });
  }
})

app.use(bodyParser.json());
app.post('/convertToPng', async (req, res) => {
  try {
    const { svg } = req.body;
    // console.log("SVG: ", svg);

    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toBuffer();

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=example.png');

    // Send the PNG buffer as the response
    res.send(pngBuffer);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred during converting to png' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

