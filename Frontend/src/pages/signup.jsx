import { useState } from "react";
import { useCountries } from "use-react-countries";
import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import { sha256 } from "js-sha256";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("architect");
  const [country, setCountry] = useState("Pakistan");
  const [phoneNumber, setPhoneNumber] = useState("+923164117090");
  const [passwordStrength, setStrength] = useState(0);

  const { countries } = useCountries();
  countries.sort((a, b) => a.name.localeCompare(b.name));

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    confirmPasswordStrength(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = () => {
    // check all fields are filled
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      name === "" ||
      confirmPassword === ""
    ) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please fill all fields</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    // check email format
    if (!validateEmail(email)) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please enter a valid email address</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    // check phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please enter a valid phone number</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }
    // check password strength
    if (passwordStrength < 5) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please enter a strong password</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }

    // encrypt password
    const pass = sha256(password);
    const confpass = sha256(confirmPassword);

    const payload = {
      email,
      password: pass,
      username,
      name,
      confirmPassword: confpass,
      role,
      country,
      phoneNumber,
    };

    axios
      .post("http://localhost:5000/signup", payload)
      .then((response) => {
        // if response is 200, print 'message' in error div and clear form
        // if response is 400, print 'error' in error div
        // if response is 500, print 'error' in error div

        if (response.status === 200) {
          document.getElementById("error").innerHTML =
            "<p class='text-green-500 text-md italic'>" +
            response.data.message +
            "</p>";
          // clear form
          setEmail("");
          setPassword("");
          setUsername("");
          setName("");
          setConfirmPassword("");
          setRole("architect");
          setCountry("Pakistan");
          setPhoneNumber("+923164117090");
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
          // redirect to login page
          window.location.href = "/login";
        } else if (response.status === 400) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-500 text-md italic'>" +
            response.data.error +
            "</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
        } else if (response.status === 500) {
          document.getElementById("error").innerHTML =
            "<p class='text-red-500 text-md italic'>" +
            response.data.error +
            "</p>";
          setTimeout(() => {
            document.getElementById("error").innerHTML = "";
          }, 3000);
        }
      })
      .catch((error) => {
        // get error message
        const errorMessage = error.response.data.error;
        document.getElementById("error").innerHTML =
          "<p class='text-red-500 text-md italic'>" + errorMessage + "</p>";
        setTimeout(() => {
          document.getElementById("error").innerHTML = "";
        }, 3000);
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

  // validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+[1-9]\d{1,14}$/;
    return re.test(phoneNumber);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-sm text-left">
        <form className="bg-white/10   shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="mb-6 mr-2">
              <label className="block text-white text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="name"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="mb-6">
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
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Phone Number
            </label>
            <PhoneInput
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              placeholder="Enter phone number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="mb-6 mr-2">
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
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="***********"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
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
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              What is your role?
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              onChange={handleRoleChange}
              value={role}
              size="md"
            >
              <option value="architect">Architect</option>
              <option value="researcher">Researcher</option>
              <option value="client">Client</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
              Select your country
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              name="country"
              size="md"
              onChange={(event) => setCountry(event.target.value)}
              value={country}
            >
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6" id="error"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-500 hover:underline"
              href="/login"
            >
              Existing User? Sign In
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

export default SignUp;
