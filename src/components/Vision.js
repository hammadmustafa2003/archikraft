import React, { useEffect } from 'react';
import missionImg from "../images/mission.png";
import audienceImg from "../images/audience.png";
import goalImg from "../images/goals.png";
import AOS from 'aos';
import "../../node_modules/aos/dist/aos.css"


const blockMaker = (title, img_src, text) => {
    return (
        <div data-aos="zoom-in" data-aos-duration='1000' data-aos-easing="ease-out-quart">
            <div className="flex flex-col items-center justify-center text-justify lg:scale-75 hover:scale-100 ease-out duration-300" >
                <img src={img_src} alt={"component_image"} className="w-[20vw] lg:w-[10vw] rounded-md mb-5 " />
                <h1 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">{title}</h1>
                <p className="text-xl lg:text-lg text-white mb-10"> {text} </p>
            </div>
        </div>
    )
}


const Vision = (props) => {
    props.navbarChange(1);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-10 flex-wrap lg:flex-nowrap lg:space-x-28 lg:h-[90vh]">
                {blockMaker("Our Mission", missionImg, "Our mission is to democratize architectural design by harnessing the power of artificial intelligence. We aim to empower architects, construction designer firms and individuals with cutting-edge tools that streamline the process of creating 2D floor plans. Our commitment is to remove the barriers of time-consuming and labor-intensive tasks, allowing professionals to focus on innovation, creativity, and productivity. We envision a future where architectural planning is accessible, efficient, and inspiring, and our mission is to make that vision a reality.")}
                {blockMaker("Our Audience", audienceImg, "Our platform is tailor-made for a diverse range of professionals and enthusiasts within the architectural and engineering domains. Architects, the creative visionaries behind stunning designs, can leverage ArchiKraft AI to transform their ideas into tangible floor plans efficiently. Architectural firms looking to boost productivity and efficiency will benefit from our innovative solution. Moreover, individuals intending to build homes can get ideas using our platform. We cater to anyone who seeks to simplify and enhance the architectural planning process.")}
                {blockMaker("Our Goal", goalImg, "Our primary goal is to create a user-friendly web-application that translates natural language into detailed 2D floor plans using Natural Language Processing and Deep Learning, ensuring efficiency and accuracy. We aim to autonomously generate floor plans from text or speech inputs using Artificial Intelligence, catering to a diverse segment of user preferences. A user-friendly interface is vital for accessibility to architects, contruction firms and individuals. Regular user feedback-driven optimization keeps ArchiKraft AI innovative and user-focused.")}
            </div>
        </div>
    );
};

export default Vision;