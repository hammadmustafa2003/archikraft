import { useState } from "react";
import { useCountries } from "use-react-countries";
import React from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axiosInstance from "../axiosInstance";
import axios from 'axios';

const SignUp = () => {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const [name, setName] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [role, setRole] = useState("architect");
        const [country, setCountry] = useState("Pakistan");
        const [phoneNumber, setPhoneNumber] = useState("+923164117090");

        const { countries } = useCountries();
        countries.sort((a, b) => a.name.localeCompare(b.name));

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };

        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        }

        const handleNameChange = (event) => {
            setName(event.target.value);
        }

        const handleConfirmPasswordChange = (event) => {
            setConfirmPassword(event.target.value);
        };

        const handleRoleChange = (event) => {
            setRole(event.target.value);
        }

        const handleCountryChange = (event) => {
            setCountry(event.target.value);
        }

        const handlePhoneNumberChange = (event) => {
            setPhoneNumber(event.target.value);
        }


        const handleSignUp = () => {

            const payload = {
              email,
              password,
              username,
              name,
              confirmPassword,
              role,
              country,
              phoneNumber,
            };

            console.log(payload);

            axios.post('http://localhost:5000/signup', payload)
            .then(response => {
              console.log('Sign-up successful:', response.data);
            })
            .catch(error => {
              console.error('Sign-up error:', error);
            });
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
                            type="button" onClick={handleSignUp}
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
}

export default SignUp;
