import React from "react";
import "./Loader.css";

const Loader = (props) => {
  return (
      <div className="bouncing-loader md:text-[1rem] text-sm font-light bg-[rgb(0,255,0,0.05)] border-[1px] border-[#00cc00] filter backdrop-blur-xl text-white pb-2 pt-6 px-3 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl self-start max-w-[75%] text-left m-10">
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default Loader;