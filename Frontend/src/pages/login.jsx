import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordStrength, setStrength] = useState(0);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        handlePasswordStrength(event);
    };

    const handleSubmit = (event) => {
        if (email === "" || password === "") {
            document.getElementById("error").innerHTML = "<p class='text-red-500 text-md italic'>Please fill out all the fields.</p>";
            setTimeout(() => {
                document.getElementById("error").innerHTML = "";
            }, 3000);
            return;
        }
        if (!validateEmail(email)) {
            document.getElementById("error").innerHTML = "<p class='text-red-400 text-md italic'>Please enter a valid email address.</p>";
            setTimeout(() => {
                document.getElementById("error").innerHTML = "";
            }, 3000);
            return;
        }
        // password strength should be 5
        if (passwordStrength < 5) {
            document.getElementById("error").innerHTML = "<p class='text-red-400 text-md italic'>Password does not meet the requirements.</p>";
            setTimeout(() => {
                document.getElementById("error").innerHTML = "";
            }, 3000);
            return;
        }
        // send email and password to backend and print response
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    // redirect to dashboard
                    window.location.href = "/dashboard";
                } else {
                    document.getElementById("error").innerHTML = "<p class='text-red-400 text-md italic'>Invalid email or password.</p>";
                    setTimeout(() => {
                        document.getElementById("error").innerHTML = "";
                    }, 3000);
                }
            })
        
    }

    // validate email format
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // when user start typing password, show password strength
    const handlePasswordStrength = (event) => {
        let password = event.target.value;
        let strength = 0;
        let minChar = false;
        let uppercase = false;
        let lowercase = false;
        let number = false;
        let specialChar = false;

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

        // update password strength badge
        let strengthBadge = document.getElementById("password-strength");
        let minCharBadge = document.getElementById("min-char");
        let uppercaseBadge = document.getElementById("uppercase");
        let lowercaseBadge = document.getElementById("lowercase");
        let numberBadge = document.getElementById("number");
        let specialCharBadge = document.getElementById("special-char");

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

    }
    



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
                        
                        <p className="text-white text-xs mt-5 italic" id="password-strength-badge">
                            Password Strength: <span id="password-strength">Weak</span><br />
                            Minimum 8 characters: <span id="min-char">No</span> <br />
                            At least one uppercase letter: <span id="uppercase">No</span> <br />
                            At least one lowercase letter: <span id="lowercase">No</span> <br />
                            At least one number: <span id="number">No</span> <br />
                            At least one special character: <span id="special-char">No</span> <br />
                        </p>
                    </div>
                    <div className="mb-6" id="error">
                        
                    </div>
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
}

export default Login;