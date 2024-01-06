import { useState } from "react";
import { sha256 } from "js-sha256";
import axios from "axios";
import { ReactSession } from "react-client-session";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (email === "" || password === "") {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please fill out all the fields.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    if (!validateEmail(email)) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-400 text-md italic'>Please enter a valid email address.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    const hashedPassword = sha256(password);
    const payload = {
      email: email,
      password: hashedPassword,
    };
    axios
      .post("http://localhost:5000/login", payload)
      .then((response) => {
        if (response.status === 200) {
          const { message } = response.data;
          const { user } = response.data;
          //   document.getElementById("error").innerHTML =
          //     "<p class='text-green-400 text-md italic'>" + message + "</p>";
          // session
          ReactSession.set("username", user.username);
          ReactSession.set("email", user.email);
          window.location.href = "/chat";
        } else if (response.status == 400) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-400 text-md italic'>Invalid email or password.</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
        } else if (response.status == 500) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-400 text-md italic'>Server error.</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        document.getElementById("error").innerHTML =
          "<p class='text-red-500 text-md italic'>" + errorMessage + "</p>";
        setTimeout(() => {
          document.getElementById("error").innerHTML = "";
        }, 3000);
      });
  };

  // validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs text-left">
        <form className="bg-white/10   shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="***********"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6" id="error"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-500 hover:underline"
              href="/forget"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-200 text-xs">
          &copy;2023 ArchiKraft AI All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
