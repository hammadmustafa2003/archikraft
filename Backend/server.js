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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/add-user';
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
    let {status_code, detail} = response.data;
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/login-user';
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
    let {status_code, detail} = response.data;
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/get-user-by-email';
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
      const apiUrl = 'https://moose-glad-squid.ngrok-free.app/send-email';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/update-password';
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
    const answer = await generateContent(message);
    console.log("Answer: ", answer);
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/save-message';
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
      const apiUrl = 'https://moose-glad-squid.ngrok-free.app/save-message';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/get-messages';
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
      res.status(200).json({ message: detail, messages: response.data.messages });
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/get-all-users';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/delete-user';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/add-news';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/get-news';
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
    const apiUrl = 'https://moose-glad-squid.ngrok-free.app/delete-news';
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
async function generateContent(message) {  
  try {
    const prompt = message;
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

