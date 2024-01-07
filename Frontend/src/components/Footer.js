// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
const Footer = () => {

    return(
        <footer className=' bg-[rgba(0,0,0,0.8)]'>
            <div className="flex flex-col p-24 flex-nowrap">
                <div className="flex flex-row flex-wrap w-full content-between items-center justify-center gap-10">
                    <div className="flex flex-col">
                        <h4 className='text-white text-md mb-5'>Company</h4>
                        <ul className="flex flex-col text-blue-500 text-sm underline gap-2">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/our-vision">Our Vision</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-white text-md mb-5">Get help</h4>
                        <ul className="flex flex-col text-blue-500 text-sm underline gap-2">
                            <li><Link to="https://docs.google.com/document/d/1gXNSG-kXP4VLjkGacph_YXSREvOVa8z-Alt1J50t0i0/edit?usp=sharing">FAQs</Link></li>
                            <li><Link to="https://docs.google.com/document/d/1QeLo600xPTFKcGaODAugBVEKmncPVoddRFsDtLZtORY/edit?usp=sharing">Privacy Policy</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h4 className='text-white text-md mb-5'>Follow Us</h4>
                        <ul className="flex flex-row text-blue-500 text-sm underline gap-2">
                            {/* <li><Link to="https://www.facebook.com/">Facebook</Link></li>
                            <li><Link to="https://twitter.com/">Twitter</Link></li>
                            <li><Link to="https://www.instagram.com/">Instagram</Link></li>
                            <li><Link to="https://www.linkedin.com/">Linkedin</Link></li> */}
                            {/* Add Icons of social media */}
                            <li>
                                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                    <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                    <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="twitter" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                    <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                    <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="linkedin" />
                                </a>
                            </li>

                            
                        </ul>
                    </div>
                </div>

                
            </div>
            <span className="self-end text-white text-sm pb-3">Copyrights © 2023 Archikraft. Built using react</span>
        </footer>
    );
}

export default Footer