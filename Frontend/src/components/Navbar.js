import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom"
import LogoWhite from "../images/logo/Logo_white.png";
// import AccountImage from "../images/profile_white.png";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ReactSession } from "react-client-session";


const Navbar = (props) => {
    const menuOptions = [
        { name: "Home", url: "/" },
        { name: "Our Vision", url: "/our-vision" },
        { name: "Pricing", url: "/pricing" },
        { name: "About Us", url: "/about-us" },
    ];

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    let navigate = useNavigate();

    const toggleLogin = () => {
        navigate("/login");
    }

    const toggleSignUp = () => {
        navigate("/signup");
    }

    return (
        <div>
            <nav className="backdrop-blur-md p-4 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img src={LogoWhite} className="w-12 h-12" alt="Logo_white" />
                        <span className="text-white text-xl font-semibold">ArchiKraft AI</span>
                    </div>

                    {/* Navigation Menu */}
                    <div className="hidden md:flex space-x-4">
                        <ul className="flex space-x-4">
                            {menuOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className={`relative transition ease-in-out delay-50 duration-50 hover:-translate-y-1/3 hover:scale-125 ${index === props.activeIndex ? 'border-b-2 border-blue-500' : ''
                                        }`}
                                    onClick={() => props.onActiveIndexChange(index)} // Add onClick handler
                                >
                                    <Link
                                        to={option.url}
                                        className={`${index === props.activeIndex ? 'text-blue-400' : 'text-white hover:text-blue-300 transition-colors duration-50'}`}
                                    >
                                        {option.name}
                                        <div className="absolute w-0 bg-blue-500 h-1 left-0 bottom-0 transition-all origin-left"></div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="flex">
                        <Container>
                        <button
                            className="hidden md:flex transition ease-in-out delay-50 border-2 border-white bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-blue-500 duration-150 p-2 text-white rounded-md mr-5"
                            onClick={toggleLogin}>
                            Login
                            </button>
                        </Container>

                        <Container>
                            <button className="hidden md:flex transition ease-in-out delay-50 border-2 border-blue-400 bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 hover:text-white duration-150 p-2 text-blue-400 rounded-md"
                            onClick={toggleSignUp}>
                            Sign Up
                            </button>
                        </Container>
                    </div> */}
                    {
                        ReactSession.get("username") === null || ReactSession.get("username") === undefined ?
                            <div className="flex">
                                <Container>
                                    <button
                                        className="hidden md:flex transition ease-in-out delay-50 border-2 border-white bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-blue-500 duration-150 p-2 text-white rounded-md mr-5"
                                        onClick={toggleLogin}>
                                        Login
                                    </button>
                                </Container>

                                <Container>
                                    <button className="hidden md:flex transition ease-in-out delay-50 border-2 border-blue-400 bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 hover:text-white duration-150 p-2 text-blue-400 rounded-md"
                                        onClick={toggleSignUp}>
                                        Sign Up
                                    </button>
                                </Container>
                            </div>
                            :
                            <div className="flex">
                                <Container>
                                    <button
                                        className="hidden md:flex transition ease-in-out delay-50 border-2 border-blue-400 bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 hover:text-white duration-150 p-2 text-blue-400 rounded-md mr-5"
                                        onClick={() => {
                                            window.location.href = "/chat";
                                        }}>
                                        Chat
                                    </button>
                                </Container>

                                <Container>
                                    <button
                                        className="hidden md:flex transition ease-in-out delay-50 border-2 border-white bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-blue-500 duration-150 p-2 text-white rounded-md mr-5"
                                        onClick={() => {
                                            ReactSession.set("username", null);
                                            ReactSession.set("name", null);
                                            ReactSession.set("email", null);
                                            ReactSession.set("phone", null);
                                            ReactSession.set("country", null);
                                            ReactSession.set("role", null);
                                            window.location.href = "/";
                                        }
                                        }>
                                        Logout
                                    </button>
                                </Container>
                            </div>
                    }

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden">
                        <button className="text-white" onClick={toggleMenu}>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            {/* Mobile Menu */}
            <CSSTransition
                in={showMenu}
                timeout={300}
                classNames="menu"
                unmountOnExit>
                <MobileMenu
                    toggleMenu={toggleMenu}
                    toggleLogin={toggleLogin}
                    toggleSignUp={toggleSignUp}
                    activeIndex={props.activeIndex}
                    menuOptions={menuOptions}
                />

            </CSSTransition>
        </div>
    );
};

export default Navbar;
