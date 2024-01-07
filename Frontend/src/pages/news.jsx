import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from "../images/logo/Logo_white.png";


const newsTemp = [
    { id: 0, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl.", postDate : "June 1, 2022"},
    { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl.", postDate : "January 12, 2023" },
    { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl.", postDate : "November 2, 2024" },
    { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl.", postDate : "July 8, 2025" },
    { id: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl.", postDate : "October 3, 2026" }
];

const News = (props) => {
    const [news, setNews] = useState([]);
    props.navbarChange(-1);
    useEffect(() => {
        setNews(newsTemp);
    }, []);


    return (
        <div className='flex flex-col justify-center items-center'>
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

            <div className='flex flex-col text-white w-5/6 md:w-1/2 items-center'>
                {
                    news.map((item) => {
                        return (
                            <div className="flex flex-col m-5 border-b-2 border-white">
                                <p className='p-5 text-justify'>{item.text}</p>
                                <span className="text-xs self-end">{item.postDate}</span>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
};

export default News;
