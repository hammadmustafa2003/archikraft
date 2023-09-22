import React, { useEffect } from 'react';
import AOS from 'aos';
import "../../node_modules/aos/dist/aos.css"

const blockMaker = (title, monthlyPrice, annualPrice, features) => {
    const featureList = features.map((feature, index) => (
        <li key={index} className="text-md lg:text-lg text-white mb-2">{feature}</li>
    ));

    return (
        <div data-aos="zoom-in" data-aos-duration='1000' data-aos-easing="ease-out-quart">
            <div className="flex flex-col items-center justify-center text-left lg:scale-[85%] hover:scale-100 ease-out duration-300 lg:w-[30vw] bg-[#ececec3b] rounded-xl lg:rounded-3xl p-12 lg:h-[85vh] lg:m-auto m-5" >
                <h1 className="text-2xl lg:text-3xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">${monthlyPrice}</h1>
                <span className=" text-xs lg:text-xs font-light mb-3 text-white">Annually charged ${annualPrice}</span>
                <h1 className="text-3xl lg:text-5xl font-black mb-3 bg-gradient-to-tr from-teal-300 via-blue-600 to-purple-400 inline-block text-transparent bg-clip-text">{title}</h1>
                <ul className="list-disc">{featureList}</ul>
                <button className="bg-indigo-500 text-white px-4 py-3 rounded-md hover:bg-indigo-600 w-fit self-center mt-5 scale-125 hover:scale-150 hover:-translate-y-5 ease-out duration-300">Buy Now</button>
            </div>
        </div>
    )
}


const Pricing = (props) => {
    props.navbarChange(2);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    return (
        <div>
        <div className="flex flex-row items-center justify-between p-10 flex-wrap lg:flex-nowrap lg:space-x-16 lg:h-[90vh]">
            {blockMaker("Basic", '9.99', '100', ["Access to the basic generation functionality.","Create up to 5 floor plans per month.","Export floor plans in standard image formats.","Limited customer support through email.","Suitable for individual users and small-scale projects."])}
            {blockMaker("Pro", '29.99', '300', ["Comprehensive 2D floor plan generation capabilities.", "Create up to 20 floor plans per month.", "Export floor plans in multiple formats", "Priority customer support with faster response times.", "Ideal for professional architects, engineers, and designers."])}
            {blockMaker("Enterprise", '49.99', '500', ["Unlimited access to advanced generation tools.", "Create unlimited number of floor plans.", "Export floor plans in multiple formats",  "Dedicated 24/7 customer support", "Tailored training and onboarding for your team.", "Perfect for large architectural firms."])}
        </div>
    </div>
    );
}

export default Pricing;