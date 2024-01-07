import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LogoWhite from "../images/logo/Logo_white.png";

const News = (props) => {
  const [news, setNews] = useState([]);
  props.navbarChange(-1);
  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    try {
      axios.get("http://localhost:5000/getNews").then((response) => {
        response.data.news.map((item) => {
          item.timestamp = new Date(item.timestamp).toLocaleString();
        });
        setNews(response.data.news);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
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

      <h1 className="text-4xl lg:text-7xl font-black m-24 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">
        News & Notifications
      </h1>

      <div className="flex flex-col text-white w-5/6 md:w-1/2 items-center">
        {news.map((item) => {
          return (
            <div className="flex flex-col m-5 border-b-2 border-white">
              <p className="p-5 text-justify">{item.text}</p>
              <span className="text-xs self-end">{item.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
