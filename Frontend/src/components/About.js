import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import "../../node_modules/aos/dist/aos.css"
import plan1 from '../images_user/plan1.png';

import dev1 from '../images_user/hammad.jpg';
import dev2 from '../images_user/saad.jpg';
import dev3 from '../images_user/talal.jpg';

import githubIcon from '../images_user/github.png';
import linkedinIcon from '../images_user/linkedin.png';
import websiteIcon from '../images_user/web.png';

const teamBlock = (name, img, github, linkedin, website, description) => {
    return (
        <div className="flex flex-col flex-wrap md:flex-nowrap bg-[rgba(255,255,255,0.5)] p-10 rounded-md md:w-1/2 mb-10 md:h-[90vh] align-center gap-y-3 scale-100 md:hover:-translate-y-5 md:hover:scale-110 md:duration-300">
            <img src={img} alt="" className=" w-screen md:w-72 backdrop-blur-xl ease-in duration-300 rounded-xl" />
            <h1 className="text-lg lg:text-3xl font-black mb-3 text-blue-100 text-center">
                {name}
            </h1>
            <div className='flex flex-col m-auto items-center gap-y-3 text-white text-md'>
                <p>{description}</p>
                <div className="flex flex-row justify-between content-between w-3/4 lg:w-1/2 space-x-3">
                    <a href={github} target='blank'> <img className=" w-10" alt="" src={githubIcon} /> </a>
                    <a href={linkedin} target='blank'> <img className="w-10" alt="" src={linkedinIcon} /> </a>
                    <a href={website} target='blank'> <img className="w-10" alt="" src={websiteIcon} /> </a>
                </div>


            </div>
        </div>
    );
}

const About = (props) => {
    props.navbarChange(3);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted with data:', formData);
        // Clear the form fields
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };


    const comp1 = (
        <div data-aos="fade-up"
            data-aos-duration='1000'
            data-aos-easing="ease-in-quad">
            <div className="flex flex-col justify-between items-center flex-wrap py-5 md:py-36 mb-16 rounded-md md:mx-96">

                <h1 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text"> What we are doing? </h1>

                <div className="flex flex-row lg:space-x-14 items-center justify-center flex-wrap lg:flex-nowrap">
                    <p className="text-md md:text-xl w-11/12  text-white text-justify">
                        We at ArchiKraft AI are a team of highly motivated individuals who are passionate about the field of Artificial Intelligence and its applications in the field of Architecture. We want to implement the concepts of Artificial Intelligence to solve the real world problems and help our professionals in the field of architectures wth our products.
                    </p>


                    <img src={plan1} alt="" className=" max-w-xs rounded-3xl mt-10 scale-[80%] md:scale-100 md:hover:-translate-y-5 md:hover:scale-110 md:mb-10 md:ease-out md:duration-300" />
                </div>
            </div>
        </div>
    );

    const comp2 = (
        <div data-aos="zoom-in"
            data-aos-duration='1000'
            data-aos-easing="ease-in-quad">
            <div className="flex flex-col justify-between items-center flex-wrap py-10 md:py-24 mb-36 rounded-md">

                <h1 className="text-3xl lg:text-5xl font-black bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text mb-24"> Our Team </h1>

                <div className="flex flex-row lg:space-x-14 items-center max-w-3xl text-left justify-center flex-wrap lg:flex-nowrap">
                    {teamBlock("Muhammad Hammad Mustafa", dev1, "https://github.com/hammadmustafa2003", "https://linkedin.com/in/m-hammad-mustafa/", "https://hammadmustafa2003.github.io", "I am a 4th year BCS student at FAST NUCES. I am a full stack developer. I am also a competitive programmer and have participated in many competitions. I am also a Machine Learning enthusiast and have worked on many projects related to it.")}
                    {teamBlock("Muhammad Saad Waseem", dev2, "https://github.com/saad5353", "https://www.linkedin.com/in/muhammad-saad-waseem/", "http://saadwaseem.com/", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat nisl ac felis mollis, id euismod nulla accumsan. Ut eget turpis non leo fringilla lacinia nec nec justo. Etiam bibendum convallis ligula vel faucibus. Sed non nisi tempor, laoreet metus sit amet, tempus leo.")}
                    {teamBlock("Muhammad Talal Bin Nadeem", dev3, "https://github.com/TNZ-5", "https://www.linkedin.com/in/muhammad-talal-bin-nadeem-256064149/", "https://github.com/TNZ-5/portfolio", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat nisl ac felis mollis, id euismod nulla accumsan. Ut eget turpis non leo fringilla lacinia nec nec justo. Etiam bibendum convallis ligula vel faucibus. Sed non nisi tempor, laoreet metus sit amet, tempus leo.")}
                </div>
            </div>
        </div>
    )


    const comp3 = (
        <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-easing="ease-in-quad"
        >
            <div className="flex flex-col justify-between items-center flex-wrap py-10 md:py-24 mb-36 rounded-mdshadow-lg">
                <h1 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">
                    Contact Us
                </h1>

                <form className="max-w-3xl text-left justify-center flex-wrap lg:flex-nowrap w-screen" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-semibold text-white">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-semibold text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-lg font-semibold text-white">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 h-32"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 hover:scale-125 hover:-translate-y-5 ease-out duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    return (
        <div className='mx-5'>
            {comp1}
            {comp2}
            {comp3}
        </div>
    );
}

export default About;
