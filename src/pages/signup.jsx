import { useState } from "react";
import SignUpComponent from "../components/signup";

const SignUp = () => {
    
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const [name, setName] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [role, setRole] = useState("architect");
        const [country, setCountry] = useState("PK");
        const [phoneNumber, setPhoneNumber] = useState("+923164117090");
    
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
    
        return (
            <SignUpComponent
                email={email}
                password={password}
                username={username}
                name={name}
                confirmPassword={confirmPassword}
                role={role}
                country={country}
                phoneNumber={phoneNumber}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleUsernameChange={handleUsernameChange}
                handleNameChange={handleNameChange}
                handleConfirmPasswordChange={handleConfirmPasswordChange}
                handleRoleChange={handleRoleChange}

            />
        );
}
    
export default SignUp;