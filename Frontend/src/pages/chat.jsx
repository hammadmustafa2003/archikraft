import { React, useState } from "react";
import { Link } from "react-router-dom";
import ChatHistory from "../components/ChatHistory";
import plan1 from "../images/plan1.png";
import historyIcon from "../images/history.png";
import closeIcon from "../images/close.png";
import floorMapIcon from "../images/floor_plan_icon.png";
import SendIcon from "../images/send.png";
import MicIcon from "../images/mic.png";
import StopIcon from "../images/stop.png";
import SearchIcon from "../images/search.png";
import LogoWhite from "../images/logo/Logo_white.png";
import download from "../images/download_white.png";
import pdf from "../images/pdf.svg";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useEffect } from "react";
// import Pdf from "react-to-pdf";
import { jsPDF } from "jspdf";
import { createRef } from "react";
import Loader from "./../utils/Loader";
import { ReactMic } from "react-mic";

const ChatPage = (props) => {
  const [isChatHistoryVisible, setChatHistoryVisible] = useState(false);

  const toggleChatHistory = () => {
    setChatHistoryVisible(!isChatHistoryVisible);
  };

  const [isChatOutputVisible, setChatOutputVisible] = useState(false);

  const toggleChatOutput = () => {
    setChatOutputVisible(!isChatOutputVisible);
  };

  props.navbarChange(-1);

  const createChat = (e) => {
    const payload = {
      user: ReactSession.get("email"),
      timestamp: new Date().toISOString(),
    };
    axios
      .post("http://localhost:5000/createChat", payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // get id from response
          const chatId = response.data.id;
          console.log(chatId);
          window.location.href = `/chat/${chatId}`;
        } else {
          alert("Error in creating chat");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-row flex-nowrap justify-center align-middle h-screen md:h-screen relative">
      <div
        className={`transform transition-transform ease-out duration-300 absolute top-0 left-0 h-full w-full z-20 filter backdrop-blur-xl ${
          isChatHistoryVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {<ChatHistory toggleHistory={toggleChatHistory} />}
      </div>

      <div key="conversation" className="md:w-2/3 w-full h-full relative">
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

        <div className="flex flex-col m-2 p-4 h-full rounded-lg relative">
          <Link to="/">
            <div className="flex items-center space-x-2 justify-center mt-10 xs:mt-0">
              <img
                src={LogoWhite}
                className="w-2/6 h-2/6 md:w-30 md:h-30"
                alt="Logo_white"
              />
            </div>
            <div className="flex items-center space-x-2 justify-center mt-10 xs:mt-0">
              <span className="text-white text-xl font-semibold">
                ArchiKraft AI
              </span>
            </div>
          </Link>
          <button
            onClick={createChat}
            className="font-bold text-white mx-2 p-2 mt-auto mb-6 hover:bg-green-500 h-12 rounded-md border hover:border-0 scale-90 hover:scale-105 hover:-translate-y-1 ease-out duration-150"
          >
            {" "}
            Create new plan{" "}
          </button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
