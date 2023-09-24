import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPass = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    let navigate = useNavigate();
    const handleResetPassword = () => {
        // navigate to otp page and send email as props
        navigate("/login");
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
                            type="button"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPass;