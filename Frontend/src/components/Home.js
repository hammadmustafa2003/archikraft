import React, { useEffect } from 'react';
import Typist from 'react-typist-component';
import AOS from 'aos';
import {Link} from "react-router-dom"
import LogoWhite from "../images/logo/Logo_white.png";
import videoSpeech from "../assets/videos/SpeechToText.mp4";
import videoFormats from "../assets/videos/formats.mp4";
import "../../node_modules/aos/dist/aos.css"

function Home(props) {
    props.navbarChange(0);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const feature1 = (
        <div className='flex flex-row justify-around flex-wrap lg:flex-nowrap mb-36 rounded-md elevation py-10 lg:py-52 '
            data-aos="fade-up" 
            data-aos-duration='1000' 
            data-aos-easing="ease-in-quad">
            <div className="flex flex-col justify-center max-w-3xl text-left px-5">
                <h2 className="text-xl lg:text-3xl mb-10 font-bold text-white"> No need to learn intricate controls anymore! </h2>
                <p className="text-lg lg:text-xl text-white text-justify">
                    Simply describe your ideal floorplan in natural language. Forget complex software - with ArchiKraft AI you can depict specifications, dimensions, and features using simple phrases and words. Want an open kitchen flowing into a living room? A master suite with walk-in closet? Our advanced NLP analyzes your description and automatically generates the floorplan. No technical expertise needed
                </p>
            </div>

            <div className="w-[35vb] text-white text-md flex flex-col justify-center max-w-3xl text-left px-5 mt-10">
                <Typist typingDelay={40} loop={true} cursor={' | '}>
                    I want two bedrooms with attached toilets, a dining room and a TV Lounge.
                    <Typist.Delay ms={2000} />
                    <Typist.Backspace count={75} typingDelay={25} />
                    The house should have a kitchen, a large dining room of atleast 25 feet, and atleast 1 bedroom.
                    <Typist.Delay ms={2000} />
                    <Typist.Backspace count={100} typingDelay={25} />
                </Typist>

                <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 hover:scale-125 hover:-translate-y-3 ease-out duration-200">
                    <Link to="/login">Try Now</Link>
                </button>
            </div>
        </div>
    );


    const feature2 = (
        <div className='flex flex-row lg:h-[90vh] justify-around flex-wrap lg:flex-nowrap mb-36 rounded-md elevation py-10 lg:py-52'
            data-aos="fade-up"
            data-aos-duration='1000'
            data-aos-easing="ease-in-quad">
            <div className=" w-[35vb] lg:w-auto text-white text-md flex flex-col justify-center max-w-3xl text-left px-5 mt-10">
                <Typist typingDelay={30} loop={true} cursor={' | '} className="m-10">
                    <Typist.Delay ms={1000} />
                    A corridor should lead from the main door of the house to the bedroom on the left to the kitchen on the right.
                    <Typist.Delay ms={500} />
                    <Typist.Backspace count={100} typingDelay={10} />
                </Typist>
                <video src={videoSpeech} className="w-full rounded-full mt-10 lg:hover:scale-90 hover:translate-y-10 ease-out duration-300 scale-50" autoPlay loop muted />
                <div className=" static top-0 -left-4 w-80 h-14 rounded-full bg-slate-900 self-center mix-blend-multiply filter blur-2xl mt-5"></div>

            </div>
            <div className=" flex flex-col justify-center max-w-3xl text-left px-5">
                <h2 className="text-xl lg:text-3xl mb-10 font-bold text-white"> Tired of Typing? Just speak! </h2>
                <p className="text-lg lg:text-xl text-white mb-16 text-justify">
                    Simply speak your floorplan description into your microphone - no typing needed. Our speech recognition accurately transcribes your words into text. Describe room dimensions, features, and layouts naturally through voice commands. Our AI analyzes your spoken description to generate the floorplan.
                </p>
                <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 hover:scale-125 hover:-translate-y-5 ease-out duration-300">
                    <Link to="/login">Try Now</Link>
                </button>

            </div>
        </div>
    );

    const feature3 = (
        <div className='flex flex-row justify-around flex-wrap lg:flex-nowrap mb-36 lg:h-[90vh] rounded-md elevation py-10 lg:py-52'
            data-aos="fade-up"
            data-aos-duration='1000'
            data-aos-easing="ease-in-quad">
            <div className="flex flex-col justify-center max-w-3xl text-left px-5">
                <h2 className="text-xl lg:text-3xl mb-10 font-bold text-white"> Customizable Outputs </h2>
                <p className="text-lg lg:text-xl text-white text-justify">
                    Export your generated floorplans in your desired file formats with one click. Get high resolution JPGs, crisp PDFs, editable PNGs, and more. Tailor file types to your workflow - our app supports versatile image, document, and CAD outputs. Customize resolution and dimensions. Export in multiple formats simultaneously. With flexible output options, easily save floorplans for printing, sharing, or additional editing!
                </p>
            </div>

            <div className="w-[35vb] text-white text-md flex flex-col justify-center max-w-3xl text-left px-5 mt-10">
                <video src={videoFormats} className="w-full rounded-full mt-10 hover:scale-125 hover:-translate-y-10 ease-out duration-300 mb-3" autoPlay loop muted />
                <div className=" static top-0 -left-4 w-40 h-14 rounded-full bg-slate-900 self-center mix-blend-multiply filter blur-2xl mt-5 mb-10"></div>
                <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 hover:scale-125 hover:-translate-y-5 ease-out duration-300">
                    <Link to="/login">Try Now</Link>
                </button>
            </div>
        </div>
    );

    const feature4 = (
        <div className='flex flex-row justify-around flex-wrap lg:flex-nowrap mb-36 lg:h-[90vh] rounded-md elevation py-10 lg:py-52'
            data-aos="fade-up"
            data-aos-duration='1000'
            data-aos-easing="ease-in-quad">
            <div className="flex flex-col justify-center max-w-3xl text-left px-5">
                <h2 className="text-xl lg:text-3xl mb-10 font-bold text-white"> Affordable Subscription Plans </h2>
                <p className="text-lg lg:text-xl text-white text-justify">
                    Unlock ArchiKraft AI's full capabilities with flexible subscription plans. Choose the right tier for your needs and budget. More extensive features and higher output limits with upgraded subscriptions. Visit our Pricing page to view affordable monthly and yearly pricing options. Subscribe to harness the power of AI for your architectural designs!
                </p>
            </div>

            <div className="w-[35vb] text-white text-md flex flex-col justify-center max-w-3xl text-left px-5 mt-10">
                <img  alt='' className="w-md rounded-3xl mt-10 lg:scale-120 hover:-translate-y-10 hover:scale-125 lg:mb-10 ease-out duration-300" />

                <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 hover:scale-125 hover:-translate-y-5 ease-out duration-300">
                    <Link to="/login">Try Now</Link>
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-transparent mx-5">
            <div className='flex flex-row justify-around mb-36 mt-12 lg:h-[90vh]'
                data-aos="fade-up"
                data-aos-duration='1000'
                data-aos-easing="ease-in-quad">
                <div className=" flex flex-col justify-center max-w-3xl text-center lg:text-left px-5 items-center lg:items-baseline">
                    <img src={LogoWhite} alt="" className="w-[30vb] h-[30vh]" />
                    <h2 className="text-3xl lg:text-5xl text-white bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text"> Welcome to  </h2>
                    <h1 className="text-5xl lg:text-7xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">ArchiKraft AI </h1>
                    <h2 className="text-xl lg:text-3xl mb-16 text-white"> Where Architecture Finds Essence </h2>

                    <p className="text-xl lg:text-lg text-white mb-10">
                        Instantly generate detailed 2D floorplans just by providing a natural language description - no more tedious drafting by hand!
                    </p>

                    <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit lg:self-end hover:scale-125 hover:-translate-y-5 ease-out duration-300">
                        <Link to="/login">Get Started</Link>
                    </button>
                </div>
            </div>

            {feature1}

            {feature2}

            {feature3}

            {feature4}

        </div>
    );
}

export default Home;