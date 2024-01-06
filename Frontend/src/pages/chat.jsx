import { React, useState } from "react";
import { Link } from "react-router-dom";
import ChatHistory from "../components/ChatHistory";
import plan1 from "../images/plan1.png";
import historyIcon from "../images/history.png";
import closeIcon from "../images/close.png";
import floorMapIcon from "../images/floor_plan_icon.png";
import SendIcon from "../images/send.png";
import MicIcon from "../images/mic.png";
import LogoWhite from "../images/logo/Logo_white.png";
import axios from "axios";

// Mock conversation data
var conversation = [
  {
    source: "User",
    message: "Hello! I want a house map for a plot in east of San Fracisco",
  },
  { source: "Bot", message: "Can you please tell how many rooms you want?" },
  {
    source: "User",
    message:
      "I need total of 5 rooms from which 2 should be bedroom, a living room and a storage room. I need total of 5 rooms from which 2 should be bedroom, a living room and a storage room. I need total of 5 rooms from which 2 should be bedroom, a living room and a storage room",
  },
  { source: "Bot", message: "Please explain further..." },
];

const Chat = (props) => {
  const [isChatHistoryVisible, setChatHistoryVisible] = useState(false);

  const toggleChatHistory = () => {
    setChatHistoryVisible(!isChatHistoryVisible);
  };

  const [isChatOutputVisible, setChatOutputVisible] = useState(false);

  const toggleChatOutput = () => {
    setChatOutputVisible(!isChatOutputVisible);
  };

  //   props.handleShowFooter(false);

  const [chats, setChats] = useState(conversation);
  const [message, setMessage] = useState("");

  const sendMsg = (e) => {
    e.preventDefault();
    if (message === "") {
      // change placeholder to "Please enter a message" for 2 seconds
      const temp = document.getElementById("msg");
      temp.placeholder = "Please enter a message";
      temp.className = "w-full h-12 rounded-lg border-2 border-red-500 p-2";
      setTimeout(() => {
        temp.placeholder = "Type your message here";
        temp.className = "w-full h-12 rounded-lg border-2 border-gray-300 p-2";
      }, 3000);
      return;
    }
    const newChats = [...chats, { source: "User", message: message }];
    setChats(newChats);
    setMessage("");
  };

  const parseAudio = (e) => {
    e.preventDefault();
    console.log("audio");
  };

  const style_sent =
    "md:text-[1rem] text-sm font-normal bg-[rgb(0,0,255,0.05)] border-[1px] border-[#0000cc] filter backdrop-blur-xl text-white py-2 px-3 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl self-end max-w-[75%] text-right m-10";
  const style_recv =
    "md:text-[1rem] text-sm font-light bg-[rgb(0,255,0,0.05)] border-[1px] border-[#00cc00] filter backdrop-blur-xl text-white py-2 px-3 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl self-start max-w-[75%] text-left m-10";

  return (
    <div className="flex flex-row flex-nowrap justify-center align-middle h-screen relative">
      <div
        className={`transform transition-transform ease-out duration-300 absolute top-0 left-0 h-full w-full z-20 filter backdrop-blur-xl ${
          isChatHistoryVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {<ChatHistory toggleHistory={toggleChatHistory} />}
      </div>

      <div key="conversation" className="md:w-2/3 w-[90%] h-full relative">
        <button
          className="absolute top-6 left-5 border-2 border-white rounded-md hover:border-0 hover:bg-green-500 hover:scale-125 ease-out duration-150 z-10"
          onClick={toggleChatHistory}
        >
          <img
            src={historyIcon}
            alt="close"
            className="md:w-10 w-8 md:h-10 h-8 p-1"
          />
        </button>

        <button
          className="absolute top-6 right-5 border-2 border-white rounded-md hover:border-0 hover:bg-green-500 hover:scale-125 ease-out duration-150 z-10"
          onClick={toggleChatOutput}
        >
          <img
            src={floorMapIcon}
            alt="close"
            className="md:w-10 w-8 md:h-10 h-8 p-1"
          />
        </button>

        <div className="flex flex-col m-2 p-4 h-full rounded-lg relative">
          <Link to="/">
            <div className="flex items-center space-x-2 justify-center mt-10 xs:mt-0">
              <img
                src={LogoWhite}
                className="w-9 h-9 md:w-12 md:h-12"
                alt="Logo_white"
              />
              <span className="text-white text-xl font-semibold">
                ArchiKraft AI
              </span>
            </div>
          </Link>

          <div className="flex flex-col flex-grow space-y-5 mt-2 md:mt-5 mb-5 md:mb-10 overflow-y-auto scrollbar-hide">
            {chats.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.source === "User" ? style_sent : style_recv
                }`}
              >
                {item.message}
              </div>
            ))}
          </div>
          <form
            className="flex flex-row justify-center items-center space-x-2"
            onSubmit={sendMsg}
          >
            {/* < > */}
            <input
              id="msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message here"
              className="w-full h-12 rounded-lg border-2 border-gray-300 p-2"
            />
            <button
              type="button"
              className="bg-[rgb(0,0,255,0.05)] hover:bg-blue-500 hover:-translate-y-1 hover:scale-105 ease-in duration-100 border-[1.5px] border-[#0000cc] p-2 rounded-lg"
              onClick={(e) => {
                parseAudio(e);
              }}
            >
              <img src={MicIcon} alt="send" className="w-10" />
            </button>
            <button
              type="submit"
              className="bg-[rgb(0,255,0,0.05)] hover:bg-green-500 hover:-translate-y-1 hover:scale-105 ease-in duration-100 border-[1.5px] border-[#00cc00] p-2 rounded-lg"
              onClick={(e) => {
                sendMsg(e);
              }}
            >
              <img src={SendIcon} alt="send" className="w-10" />
            </button>
          </form>
          {/* </div> */}
        </div>
        {isChatOutputVisible && (
          <div
            key="image"
            className="h-screen w-screen fixed top-0 left-0 backdrop-blur-xl z-20"
          >
            <button
              className="fixed top-5 right-5 border-0"
              onClick={toggleChatOutput}
            >
              <img src={closeIcon} alt="close" className="w-12 h-12" />
            </button>
            <img
              src={plan1}
              className="fixed w-[75vmin] md:top-[12.5%] md:left-1/3 top-1/3 left-[12.5%]"
              alt="generated_floor_plan"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
