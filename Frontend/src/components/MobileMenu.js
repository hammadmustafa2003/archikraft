import { Link } from 'react-router-dom';
import { ReactSession } from "react-client-session";


const MobileMenu = (props) => {

    return (
        <div className="md:hidden h-[90vh] backdrop-blur-md border-cyan-900 rounded-xl fixed top-24 right-0 left-0 bottom-24 p-2 transition-opacity duration-300 ease-out z-10 flex flex-col justify-center space-y-40 z-9">
                    <center className="text-center items-center">
                        <ul className="flex flex-col pr-5 pl-5 space-y-5">
                            {props.menuOptions.map((option, index) => (
                                <li key={index} onClick={() => {props.toggleMenu();}}>
                                    <Link to={option.url} className={`text-2xl ${index === props.activeIndex ? 'text-blue-500' : 'text-white'}`}>
                                        {option.name}
                                    </Link>
                                </li>
                            ))}

                            {props.login &&(
                                <li key='Account' onClick={() => {props.toggleLogin();}}>
                                    <Link to={'/account'} className="text-2xl text-white">
                                        My Account
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </center>

                    <div className="flex items-center justify-center">
                                {
                                    ReactSession.get("username") === null ?
                                        <div className="flex">
                                            <button
                                                className="flex md:hidden transition ease-in-out delay-50 border-2 border-white bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-blue-500 duration-150 p-2 text-white rounded-md mr-5"
                                                onClick={props.toggleLogin}>
                                                Login
                                            </button>

                                            <button className="flex md:hidden transition ease-in-out delay-50 border-2 border-blue-400 bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 hover:text-white duration-150 p-2 text-blue-400 rounded-md"
                                                onClick={props.toggleSignUp}>
                                                Sign Up
                                            </button>
                                        </div>
                                        :
                                        <div className="flex">
                                            <button
                                                className="flex md:hidden transition ease-in-out delay-50 border-2 border-white bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-white  hover:text-blue-500 duration-150 p-2 text-white rounded-md mr-5"
                                                onClick={() => {
                                                    window.location.href = "/chat";
                                                }}
                                            >
                                                Chat
                                            </button>

                                            <button className="flex md:hidden transition ease-in-out delay-50 border-2 border-blue-400 bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-blue-400 hover:text-white duration-150 p-2 text-blue-400 rounded-md"
                                                onClick={() => {
                                                    ReactSession.set("username", null);
                                                    ReactSession.set("name", null);
                                                    ReactSession.set("email", null);
                                                    ReactSession.set("phone", null);
                                                    ReactSession.set("country", null);
                                                    ReactSession.set("role", null);
                                                    window.location.href = "/";
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                }
                    </div>
                </div>
    )
}

export default MobileMenu;
