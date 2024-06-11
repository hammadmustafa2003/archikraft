import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatHistory from "../components/ChatHistory";
import historyIcon from "../images/history.png";
import floorMapIcon from "../images/floor_plan_icon.png";
import SendIcon from "../images/send.png";
import MicIcon from "../images/mic.png";
import StopIcon from "../images/stop.png";
import Floorplan from "./Floorplan";
// import SearchIcon from "../images/search.png";
import LogoWhite from "../images/logo/Logo_white.png";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useEffect } from "react";
// import Pdf from "react-to-pdf";

import Loader from "./../utils/Loader";
import { ReactMic } from "react-mic";

const style_sent =
  "md:text-[1rem] text-sm font-normal bg-[rgb(0,0,255,0.05)] border-[1px] border-[#0000cc] filter backdrop-blur-xl text-white py-2 px-3 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl self-end max-w-[75%] text-right m-10";
const style_recv =
  "md:text-[1rem] text-sm font-light bg-[rgb(0,255,0,0.05)] border-[1px] border-[#00cc00] filter backdrop-blur-xl text-white py-2 px-3 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl self-start max-w-[75%] text-left m-10";

const Chat = (props) => {
  const [featureVector, setFeatureVector] = useState({
    NumberofLivingRooms: -1,
    NumberofKitchens: -1,
    NumberofBathrooms: -1,
    NumberofDiningRooms: -1,
    NumberofChildrenRooms: -1,
    NumberofStudyRooms: -1,
    NumberofBalconies: -1,
    NumberofStorageRooms: -1,
    WidthToLengthRatioofLandPlot: -1,
    MaximumLengthofBedroom: -1,
    MinimumLengthofBedroom: -1,
    MaximumWidthofBedroom: -1,
    MinimumWidthofBedroom: -1,
    FrontDoorLocationX_axis: -1,
    FrontDoorLocationY_axis: -1,
    NumberofBedrooms: -1,
  });
  // const [sent, setSent] = useState(style_sent);
  // const [recv, setRecv] = useState(style_recv);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [lastMsg, setLastMsg] = useState("");
  const [isChatHistoryVisible, setChatHistoryVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [recordingStarted, setRecordingStarted] = useState(false);
  const navigate = useNavigate();

  const chatID = useParams().id;

  const toggleChatHistory = () => {
    setChatHistoryVisible(!isChatHistoryVisible);
  };

  const [isChatOutputVisible, setChatOutputVisible] = useState(false);

  const toggleChatOutput = () => {
    setChatOutputVisible(!isChatOutputVisible);
  };

  props.navbarChange(-1);

  // get previous chats from backend
  const getChats = async () => {
    const chatbox = document.getElementById("chatbox");
    // clear chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
    axios
      .get("http://localhost:5000/getMessages", {
        params: {
          id: chatID,
        },
      })
      .then((res) => {
        console.log(res.data);
        setChats(res.data.messages.messages);
        setFeatureVector(res.data.messages.featureVector);
        // console.log(res.data.messages.featureVector);
        // console.log(featureVector);
        setTimeout(() => {
          chatbox.scrollTop = chatbox.scrollHeight;
        }, 100);
        // update chatbox
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(chatID);
    getChats();
  }, [chatID]);

  const sendMsg = () => {
    const temp = document.getElementById("msg");
    if (message === "") {
      // change placeholder to "Please enter a message" for 2 seconds
      temp.placeholder = "Please enter a message";
      temp.className = "w-full h-12 rounded-lg border-2 border-red-500 p-2";
      setTimeout(() => {
        temp.placeholder = "Type your message here";
        temp.className = "w-full h-12 rounded-lg border-2 border-gray-300 p-2";
      }, 3000);
      return;
    }

    const msgToSend = message;
    setLastMsg(message);
    temp.value = "";
    setMessage("");
    setLoadingMsg(true);
    // if session is not set, redirect to login page
    if (ReactSession.get("email") === null) {
      alert("Please login to continue.");
      // window.location.href = "/login";
      navigate("/login");
    }
    // send message to backend
    const payload = {
      message: msgToSend,
      sender: ReactSession.get("email"),
      featureVector: featureVector,
      lastMsg: chats.length === 0 ? "" : chats[chats.length - 1].message,
      id: chatID,
    };

    console.log(JSON.stringify(payload));
    axios
      .post("http://localhost:5000/saveMessage", payload)
      .then((res) => {
        // console.log(res.data);
        // const jsonResponse = JSON.parse(res.data.answer);
        setFeatureVector(res.data.featureVector);
        console.log(featureVector);
        setLoadingMsg(false);
        getChats();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMsgEventHandler = (e) => {
    e.preventDefault();
    sendMsg();
  };


  const parseAudio = (e) => {
    e.preventDefault();
    setRecordingStarted(!recordingStarted);
  };

  return (
    <div className="flex flex-row flex-nowrap justify-center align-middle h-screen md:h-screen relative">
      <div
        className={`transform transition-transform ease-out duration-300 absolute top-0 left-0 h-full w-full z-20 filter backdrop-blur-xl ${isChatHistoryVisible ? "translate-x-0" : "-translate-x-full"
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

          <div
            className="flex flex-col flex-grow space-y-5 mt-2 md:mt-5 mb-5 md:mb-10 overflow-y-auto webkit-scrollbar:none;	"
            id="chatbox"
            style={{ scrollBehavior: "smooth" }}
          >
            {
              chats.map((chat, index) => {
                return (
                  <div key={index} className={`${chat.sender === "gemini" ? style_recv : style_sent}`}>
                    {chat.message}
                  </div>
                );
              })
            }
            {loadingMsg && (
              <div key={-1} className={style_sent}>
                {" "}
                {lastMsg}{" "}
              </div>
            )}
            {loadingMsg && <Loader />}
          </div>
          <form
            className="flex flex-row justify-center items-center space-x-2"
            onSubmit={sendMsgEventHandler}
          >

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
              <img
                src={recordingStarted ? StopIcon : MicIcon}
                alt="send"
                className="w-10"
              />
            </button>
            <button
              type="submit"
              className="bg-[rgb(0,255,0,0.05)] hover:bg-green-500 hover:-translate-y-1 hover:scale-105 ease-in duration-100 border-[1.5px] border-[#00cc00] p-2 rounded-lg"
            >
              <img src={SendIcon} alt="send" className="w-10" />
            </button>
          </form>

          <ReactMic
            record={recordingStarted}
            // className="sound-wave"
            className="hidden"
            onStop={(recordedBlob) => {
              setRecordingStarted(false);
              console.log("chunk of real-time data is: ", recordedBlob);

              const soundData = new FormData();
              soundData.append("file", recordedBlob.blob);
              axios
                .post("http://127.0.0.1:8000/transcribe", soundData)
                .then((res) => {
                  console.log(res.data);
                  const transcript = res.data.text;
                  setMessage(transcript);
                  sendMsg();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            duration={15}
          />
          {/* </div> */}
        </div>
        {isChatOutputVisible && (
          <Floorplan toggleChatOutput={toggleChatOutput} featureVector={featureVector} />
        )}
      </div>
    </div>
  );
};

export default Chat;
