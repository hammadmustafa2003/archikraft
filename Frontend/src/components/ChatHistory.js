import AccountImage from "../images/profile_white.png";
import menuIcon from "../images/menu.png";
import closeIcon from "../images/close.png";
import { ReactSession } from "react-client-session";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const ChatHistory = (props) => {

    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const payload = {
            user: ReactSession.get("email"),
        };
        axios.post("http://localhost:5000/getAllChatIds", payload).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setChatHistory(response.data.chatIds);
            }
        }
        );
    }, []);


    return (
        <div key="chat-history" className=" w-max h-full bg-slate-950 shadow-xl shadow-black relative">

            <div className="flex flex-col py-6 px-6 h-full" >
                <div className="flex flex-row justify-between self-stretch border-b-[1px] pb-4 mb-4">
                    <span className="text-3xl flex items-center font-semibold bg-gradient-to-t from-teal-300 via-blue-600 to-purple-400 text-transparent bg-clip-text">Chat History</span>
                    <button className="border-0" onClick={props.toggleHistory}>
                        <img src={closeIcon} alt="close" className="w-12 h-12" />
                    </button>
                </div>
                <ul className="mb-10 scrollbar-hide overflow-y-auto h-full">
                    {chatHistory.map((c, index) => (
                        <Link to={`/chat/${c}`}>
                            <li key={index} className="flex items-center font-semibold text-white hover:text-black m-2 p-2 hover:bg-[rgb(255,255,255,0.7)] h-12 rounded-md">
                                {c}
                            </li>
                        </Link>
                    ))}
                </ul>
                <button className="flex items-center justify-center font-bold text-white mx-2 p-2 mt-auto mb-6 hover:bg-green-500 h-12 rounded-md border hover:border-0 scale-90 hover:scale-105 hover:-translate-y-3 ease-out duration-150"> Create new plan </button>
                <button className="flex items-center justify-center font-bold text-white mx-2 p-2 mt-auto mb-6 hover:bg-green-500 h-12 rounded-md border hover:border-0 scale-90 hover:scale-105 hover:-translate-y-3 ease-out duration-150"
                    onClick={() => {
                        window.location.href = "/news";
                    }}
                > News </button>

                <div className="flex flex-row flex-nowrap">
                    <a href="/profile">
                        <img src={AccountImage} alt="Profile" className="w-7 h-7 mr-4" />
                    </a>

                    <a href="/profile">
                        <span className="text-white text-xl overflow-clip line-clamp-1 max-w-[150px]">{ReactSession.get("name")}</span>
                    </a>
                    <button
                        onClick={() => {
                            window.location.href = "/profile";
                        }}
                    ><img src={menuIcon} alt="Profile" className="w-7 h-7 mx-4" /></button>
                </div>
            </div>
        </div>
    );
}

export default ChatHistory;