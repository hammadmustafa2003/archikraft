const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 5000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { response } = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// http://0.0.0.0:8000

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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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
    const { message, sender } = req.body;
    const answer = await generateContent(message, sender);
    console.log("Answer: ", answer);
    const apiUrl = 'http://0.0.0.0:8000/save-message';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '678'
    };
    const response = await axios.get(apiUrl, {
      params: {
        sender: sender,
        receiver: 'gemini',
        message: message,
        timestamp: new Date()
      },
      headers: headers
    });
    console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      // save gemini's answer
      const apiUrl = 'http://0.0.0.0:8000/save-message';
      // add ngrok-skip-browser-warning in header
      const headers = {
        'ngrok-skip-browser-warning': '678'
      };
      const response = await axios.get(apiUrl, {
        params: {
          sender: 'gemini',
          receiver: sender,
          message: answer,
          timestamp: new Date()
        },
        headers: headers
      });
      console.log(response.data);
      let { status_code, detail } = response.data;
      if (status_code == 400) {
        res.status(400).json({ error: detail });
      }
      else if (status_code == 200) {
        res.status(200).json({ message: detail, answer: answer });
      }
      else {
        res.status(500).json({ error: 'An error occurred during saving message' });
      }
    }
    else {
      res.status(500).json({ error: 'An error occurred during saving message' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during saving message' });
  }
});


app.get('/getMessages', async (req, res) => {
  try {
    const { user } = req.query;
    const apiUrl = 'http://0.0.0.0:8000/get-messages';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '789'
    };
    const response = await axios.get(apiUrl, {
      params: {
        user: user
      },
      headers: headers
    });
    console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 400) {
      res.status(400).json({ error: detail });
    }
    else if (status_code == 200) {
      res.status(200).json({ message: detail, messages: response.data.messages.messages });
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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
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


dotenv.config();

// 1. Configuration
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });


// 3. Generate Content
async function generateContent(message, user) {
  // call getMessages API
  let history = []
  try {
    const apiUrl = 'http://0.0.0.0:8000/get-messages';
    // add ngrok-skip-browser-warning in header
    const headers = {
      'ngrok-skip-browser-warning': '789'
    };
    const response = await axios.get(apiUrl, {
      params:
      {
        user
      },
      headers: headers
    });
    console.log(response.data);
    let { status_code, detail } = response.data;
    if (status_code == 200) {
      history = response.data.messages.messages;
    }
  }
  catch (error) {
    console.log(error);
  }

  // append history to message

  const str = `Input: ` + message + `
      Extract the information for the feature vector from the input then output in the following format. The feature vector should only have integers or floats in the value of key-value pairs of feature vector. If an information is not found replace it with -1. By default values are -1. Populate the feature vector based on previous chat history. Then give response. If a value is found in history, then populate it in the vector otherwise keep it -1.

      Feature vector:{
            'Number of Living Rooms', 
                  'Number of Kitchens', 
                  'Number of Bathrooms', 
                  'Number of Dining Rooms', 
                  'Nmumber of Children Rooms', 
                  'Number of Study Rooms', 
                  'Number of Balconies', 
                  'Number of Storage Rooms', 
                  'Width to Length Ratio of Land Plot', 
                  'Maximum Length of Bedroom', 
                  'Minimum Length of Bedroom', 
                  'Maximum Width of Bedroom',
                  'Minimum Width of Bedroom', 
                  'Front Door Location X-axis', 
                  'Front Door Location Y-axis',
                  'Number of Bedrooms'
      }`
    +
    `
    \n\nPrevious Conversation:\n
    `
    + history.map((msg) => {
      return `${msg.sender}: ${msg.message}\n`;
    }).join('\n')

    + `
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      Response: "If any of the information is not available in the input write a counter response to ask about that information in this string. Ask in a casual manner like converstion. Try to add minimum tecnical and mathamatical terms. Also ask for 1 missing feature at a time. If user is unsure fill what suits according to the rest of information. Show feature vector to the user. Also dont use word 'Response' before generating a response.       If user has provided the previous conversation, then chat with the user in a casual manner and ask for the missing information in the feature vector but display and update feature vector along the way. If user has provided all the information, then respond with 'Thank you for providing the information. I will now generate the architectural design for you.' and then display the final feature vector fully."
      Note: "If the user has not provided any information about the feature vector, ask for the number of living rooms first... etc"
      Important: "If user asks for something else or greets, respond with 'I am here to help you with your architectural design. Please provide the information for the feature vector and also display the feature vector in the following format. If you are unsure about any information, please let me know. Feature vector:{...}'"
`;



  // replace {user_prompt} with message
  const str1 = str.replace('{user_prompt}', message);
  console.log(str1);

  try {
    const prompt = str1;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
  }
}


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

