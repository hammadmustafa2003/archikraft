import {Link} from 'react-router-dom';

const MobileMenu = (props) => {

    return (
        <div className="md:hidden h-[90vh] backdrop-blur-md border-cyan-900 rounded-xl fixed top-24 right-0 left-0 bottom-24 p-2 transition-opacity duration-300 ease-out z-10 flex flex-col justify-center space-y-40 z-9">
                    <center className="text-center items-center">
                        <ul className="flex flex-col pr-5 pl-5 space-y-5">
                            {props.menuOptions.map((option, index) => (
                                <li key={index} onClick={() => {props.toggleMenu();}}>
                                    <Link to={option.url} className={`text-2xl ${index === props.activeIndex ? 'text-blue-500' : 'text-white'}`}>
                                        {option.name}
                                    </Link>
                                </li>                                
                            ))}

                            {props.login &&(
                                <li key='Account' onClick={() => {props.toggleLogin();}}>
                                    <Link to={'/account'} className="text-2xl text-white">
                                        My Account
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </center>

                    {!props.login && (
                        <div className="flex items-center justify-center">
                                    <button 
                                        className="flex md:hidden text-xl bg-blue-500 hover:scale-110 p-3 text-white rounded-md mr-5"
                                        onClick={props.toggleLogin}>
                                        Sign In
                                    </button>

                                    <button className="flex md:hidden text-xl bg-white hover:-translate-y-1 p-3 text-blue-500 rounded-md">
                                        Register
                                    </button>
                        </div>
                    )}
                </div>
    )
}

export default MobileMenu;