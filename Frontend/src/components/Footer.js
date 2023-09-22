// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
const Footer = () => {

    return(
        <footer className=' bg-[rgba(0,0,0,0.8)]'>
            <div className="flex flex-col w-[90vw] p-24 flex-nowrap">
                <div className="flex flex-row flex-wrap w-full content-between items-center justify-center gap-10">
                    <div className="flex flex-col">
                        <h4 className='text-white text-md mb-5'>Company</h4>
                        <ul className="flex flex-col text-blue-500 text-sm underline gap-2">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/our-vision">Our Vision</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/about-us">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-white text-md mb-5">Get help</h4>
                        <ul className="flex flex-col text-blue-500 text-sm underline gap-2">
                            <li><Link href="/">FAQs</Link></li>
                            <li><Link href="/our-vision">Privacy Policy</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/about-us">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h4 className='text-white text-md mb-5'>Follow Us</h4>
                        <ul className="flex flex-col text-blue-500 text-sm underline gap-2">
                            <li><Link href="/">Facebook</Link></li>
                            <li><Link href="/our-vision">Twitter</Link></li>
                            <li><Link href="/pricing">Instagram</Link></li>
                            <li><Link href="/about-us">Linkedin</Link></li>
                        </ul>
                    </div>
                </div>

                
            </div>
            <span className="self-end text-white text-sm pb-3">Copyrights © 2023 Archikraft. Built using react</span>
        </footer>
    );
}

export default Footer