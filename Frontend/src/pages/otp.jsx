import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OTP = () => {
  const [otp, setOTP] = useState(["-", "-", "-", "-", "-", "-"]);
  const location = useLocation();
  const { email } = location.state;
  const otpSent = location.state.otp;

  let navigate = useNavigate();
  const handleOTPChange1 = (event) => {
    const temp = [...otp];
    temp[0] = event.target.value;
    setOTP(temp);
  };

  const handleOTPChange2 = (event) => {
    const temp = [...otp];
    temp[1] = event.target.value;
    setOTP(temp);
  };

  const handleOTPChange3 = (event) => {
    const temp = [...otp];
    temp[2] = event.target.value;
    setOTP(temp);
  };

  const handleOTPChange4 = (event) => {
    const temp = [...otp];
    temp[3] = event.target.value;
    setOTP(temp);
  };

  const handleOTPChange5 = (event) => {
    const temp = [...otp];
    temp[4] = event.target.value;
    setOTP(temp);
  };

  const handleOTPChange6 = (event) => {
    const temp = [...otp];
    temp[5] = event.target.value;
    setOTP(temp);
  };

  const handleVerify = () => {
    // verify OTP
    let userOTP = "";
    for (let i = 0; i < 6; i++) {
      userOTP += otp[i];
    }
    if (userOTP === otpSent) {
      navigate("/newpass", {
        state: {
          email: email,
        },
      });
    } else {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Invalid OTP.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
    }
  };

  return (
    // show in center that 'OTP has been sent to'
    // then in the lower row print email within a rectangle
    // OTP is a 6 digit number
    // print 6 boxes for OTP
    // then a button for verify
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs text-left">
        <form className="bg-white/10   shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 text-center">
            <h1 className="text-white text-2xl font-bold mb-2">
              OTP has been sent to
            </h1>
            <h1 className="text-gray-400 text-md font-bold mb-2">{email}</h1>
          </div>
          <div className="mb-4 flex justify-center">
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp1"
              type="text"
              placeholder="-"
              value={otp[0]}
              onChange={handleOTPChange1}
            />
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp2"
              type="text"
              placeholder="-"
              value={otp[1]}
              onChange={handleOTPChange2}
            />
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp3"
              type="text"
              placeholder="-"
              value={otp[2]}
              onChange={handleOTPChange3}
            />
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp4"
              type="text"
              placeholder="-"
              value={otp[3]}
              onChange={handleOTPChange4}
            />
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp5"
              type="text"
              placeholder="-"
              value={otp[4]}
              onChange={handleOTPChange5}
            />
            <input
              className="shadow appearance-none border rounded w-1/6 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp6"
              type="text"
              placeholder="-"
              value={otp[5]}
              onChange={handleOTPChange6}
            />
          </div>
          <div className="mb-6" id="error"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
              type="button"
              onClick={handleVerify}
            >
              Verify
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

export default OTP;
