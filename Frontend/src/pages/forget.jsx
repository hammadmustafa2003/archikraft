import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Forget = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  let navigate = useNavigate();
  const handleSendOTP = () => {
    if (email === "") {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please fill out all the fields.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    const payload = {
      email: email,
    };

    axios
      .post("http://localhost:5000/forgot-password", payload)
      .then((response) => {
        if (response.status === 200) {
          navigate("/otp", {
            state: {
              email: email,
              otp: response.data.otp,
            },
          });
        } else if (response.status === 400) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-400 text-md italic'>Invalid email.</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
        } else if (response.status === 500) {
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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs text-left">
        <form className="bg-white/10   shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Enter Email to Reset Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6" id="error"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
              type="button"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-500 hover:underline"
              href="/login"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;
