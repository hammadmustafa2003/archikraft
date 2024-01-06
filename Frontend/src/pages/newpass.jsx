import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
import axios from "axios";

const NewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const { email } = location.state;
  const [passwordStrength, setStrength] = useState(0);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    confirmPasswordStrength(event.target.value);
  };

  let navigate = useNavigate();
  const handleResetPassword = () => {
    if (password === "" || confirmPassword === "") {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please fill out all the fields.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    if (passwordStrength < 5) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please choose a stronger password.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    if (password !== confirmPassword) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Passwords do not match.</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    document.getElementById("resetPassword").disabled = true;
    document.getElementById("resetPassword").innerHTML =
      "Resetting Password...";
    const hashedPassword = sha256(password);
    const payload = {
      email: email,
      password: hashedPassword,
    };
    axios
      .post("http://localhost:5000/reset-password", payload)
      .then((response) => {
        if (response.status === 200) {
          // show success message for 3 seconds then redirect to login page
          document.getElementById("error").innerHTML =
            "<p class='text-green-400 text-md italic'>Password reset successful.</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
            navigate("/login");
          }, 3000);
        } else if (response.status === 400) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-400 text-md italic'>" +
            response.data.error +
            "</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
          document.getElementById("resetPassword").disabled = false;
          document.getElementById("resetPassword").innerHTML = "Reset Password";
        } else if (response.status === 500) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-400 text-md italic'>Server error.</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
          document.getElementById("resetPassword").disabled = false;
          document.getElementById("resetPassword").innerHTML = "Reset Password";
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        document.getElementById("error").innerHTML =
          "<p class='text-red-400 text-md italic'>" + errorMessage + "</p>";
        setTimeout(() => {
          document.getElementById("error").innerHTML = "";
        }, 3000);
        document.getElementById("resetPassword").disabled = false;
        document.getElementById("resetPassword").innerHTML = "Reset Password";
      });
  };

  // validate password strength
  const validatePassword = (password) => {
    var strength = 0;
    var minChar = 0;
    var uppercase = 0;
    var lowercase = 0;
    var number = 0;
    var specialChar = 0;
    var match = false;

    // update password strength badge
    let strengthBadge = document.getElementById("password-strength");
    let minCharBadge = document.getElementById("min-char");
    let uppercaseBadge = document.getElementById("uppercase");
    let lowercaseBadge = document.getElementById("lowercase");
    let numberBadge = document.getElementById("number");
    let specialCharBadge = document.getElementById("special-char");
    let matchBadge = document.getElementById("match");

    // set default value for password strength badge
    strengthBadge.innerText = "Weak";
    strengthBadge.style.color = "red";
    strengthBadge.style.textDecoration = "bold";
    // set default value for password strength badge
    minCharBadge.style.color = "red";
    minCharBadge.innerText = "No";
    // set default value for password strength badge
    uppercaseBadge.style.color = "red";
    uppercaseBadge.innerText = "No";
    // set default value for password strength badge
    lowercaseBadge.style.color = "red";
    lowercaseBadge.innerText = "No";
    // set default value for password strength badge
    numberBadge.style.color = "red";
    numberBadge.innerText = "No";
    // set default value for password strength badge
    specialCharBadge.style.color = "red";
    specialCharBadge.innerText = "No";
    // set default value for password strength badge
    matchBadge.style.color = "red";
    matchBadge.innerText = "No";

    // check if password is at least 8 characters
    if (password.length >= 8) {
      strength += 1;
      minChar = true;
    }

    // check if password has at least one uppercase letter
    if (password.match(/[A-Z]/)) {
      strength += 1;
      uppercase = true;
    }

    // check if password has at least one lowercase letter
    if (password.match(/[a-z]/)) {
      strength += 1;
      lowercase = true;
    }

    // check if password has at least one number
    if (password.match(/[0-9]/)) {
      strength += 1;
      number = true;
    }

    // check if password has at least one special character
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      strength += 1;
      specialChar = true;
    }

    // check if password and confirm password match
    if (password === confirmPassword && password !== "") {
      match = true;
    }

    switch (strength) {
      case 0:
        strengthBadge.innerText = "Weak";
        strengthBadge.style.color = "red";
        strengthBadge.style.textDecoration = "bold";
        setStrength(0);
        break;
      case 1:
        strengthBadge.innerText = "Weak";
        strengthBadge.style.textDecoration = "bold";
        strengthBadge.style.color = "red";
        setStrength(1);
        break;
      case 2:
        strengthBadge.innerText = "Fair";
        strengthBadge.style.color = "orange";
        strengthBadge.style.textDecoration = "bold";
        setStrength(2);
        break;
      case 3:
        strengthBadge.innerText = "Good";
        strengthBadge.style.color = "yellow";
        strengthBadge.style.textDecoration = "bold";
        setStrength(3);
        break;
      case 4:
        strengthBadge.innerText = "Strong";
        strengthBadge.style.color = "green";
        strengthBadge.style.textDecoration = "bold";
        setStrength(4);
        break;
      case 5:
        strengthBadge.innerText = "Very Strong";
        strengthBadge.style.color = "darkgreen";
        strengthBadge.style.textDecoration = "bold";
        setStrength(5);
        break;
    }

    // update password strength badge
    switch (minChar) {
      case true:
        minCharBadge.style.color = "green";
        minCharBadge.innerText = "Yes";
        break;
      case false:
        minCharBadge.style.color = "red";
        minCharBadge.innerText = "No";
        break;
    }

    // update password strength badge
    switch (uppercase) {
      case true:
        uppercaseBadge.style.color = "green";
        uppercaseBadge.innerText = "Yes";
        break;
      case false:
        uppercaseBadge.style.color = "red";
        uppercaseBadge.innerText = "No";
        break;
    }

    // update password strength badge
    switch (lowercase) {
      case true:
        lowercaseBadge.style.color = "green";
        lowercaseBadge.innerText = "Yes";
        break;
      case false:
        lowercaseBadge.style.color = "red";
        lowercaseBadge.innerText = "No";
        break;
    }

    // update password strength badge
    switch (number) {
      case true:
        numberBadge.style.color = "green";
        numberBadge.innerText = "Yes";
        break;
      case false:
        numberBadge.style.color = "red";
        numberBadge.innerText = "No";
        break;
    }

    // update password strength badge
    switch (specialChar) {
      case true:
        specialCharBadge.style.color = "green";
        specialCharBadge.innerText = "Yes";
        break;
      case false:
        specialCharBadge.style.color = "red";
        specialCharBadge.innerText = "No";
        break;
    }

    // update password strength badge
    switch (match) {
      case true:
        matchBadge.style.color = "green";
        matchBadge.innerText = "Yes";
        break;
      case false:
        matchBadge.style.color = "red";
        matchBadge.innerText = "No";
        break;
    }
  };

  // confirm password validation
  const confirmPasswordStrength = (confirmPassword) => {
    var match = false;

    // check if password and confirm password match
    if (password === confirmPassword && password !== "") {
      match = true;
    }
    // update password strength badge
    let matchBadge = document.getElementById("match");

    // update password strength badge
    switch (match) {
      case true:
        matchBadge.style.color = "green";
        matchBadge.innerText = "Yes";
        break;
      case false:
        matchBadge.style.color = "red";
        matchBadge.innerText = "No";
        break;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs text-left">
        <form className="bg-white/10   shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="mb-6">
            <p
              className="text-white text-xs mt-5 italic"
              id="password-strength-badge"
            >
              Password Strength: <span id="password-strength">Weak</span>
              <br />
              Minimum 8 characters: <span id="min-char">No</span> <br />
              At least one uppercase letter: <span id="uppercase">No</span>{" "}
              <br />
              At least one lowercase letter: <span id="lowercase">No</span>{" "}
              <br />
              At least one number: <span id="number">No</span> <br />
              At least one special character: <span id="special-char">
                No
              </span>{" "}
              <br />
              Both passwords match: <span id="match">No</span> <br />
            </p>
          </div>
          <div className="mb-6" id="error"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
              type="button"
              onClick={handleResetPassword}
              id="resetPassword"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPass;
