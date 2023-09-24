import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Forget = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    let navigate = useNavigate();
    const handleSendOTP = () => {
        // navigate to otp page and send email as props
        navigate("/otp", { state: { email: email } });
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
}

export default Forget;