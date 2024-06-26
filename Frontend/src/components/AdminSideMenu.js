import AccountImage from "../images/profile_white.png";
import menuIcon from "../images/menu.png";
import closeIcon from "../images/close.png";
import { ReactSession } from "react-client-session";
// import { useEffect, useState } from "react";

const AdminSideMenu = (props) => {

    //props
    //props.sideMenuItems: array of strings
    //props.toggleMenu: function
    //props.selectOption: function

    return (
        <div key="sideMenu" className=" w-max h-full bg-slate-950 shadow-xl shadow-black relative">

            <div className="flex flex-col py-6 px-6 h-full" >
                <div className="flex flex-row justify-between self-stretch border-b-[1px] pb-4 mb-4">
                    <span className="text-3xl flex items-center font-semibold bg-gradient-to-t from-teal-300 via-blue-600 to-purple-400 text-transparent bg-clip-text">Select Option</span>
                    <button className="border-0" onClick={props.toggleMenu}>
                        <img src={closeIcon} alt="close" className="w-12 h-12" />
                    </button>
                </div>
                <ul className="mb-10 scrollbar-hide overflow-y-auto h-full">
                    {props.sideMenuItems.map((item, index) => {
                        if (item !== props.selectedOption) {
                            return (
                                <li key={index} className="flex items-center font-semibold text-white hover:text-black m-2 p-2 hover:bg-[rgb(255,255,255,0.3)] h-12 rounded-md" onClick={() => props.selectOption(item)}>
                                    {item}
                                </li>
                            )
                        } else {
                            return (
                                <li key={index} className="flex items-center font-semibold text-black m-2 p-2 bg-[rgb(255,255,255,0.7)] h-12 rounded-md" onClick={() => props.selectOption(item)}>
                                    {item}
                                </li>
                            )
                        }

                    })}
                </ul>
                <button className="flex items-center justify-center font-bold text-white mx-2 p-2 mt-auto mb-6 hover:bg-green-500 h-12 rounded-md border hover:border-0 scale-90 hover:scale-105 hover:-translate-y-3 ease-out duration-150"
                    onClick={() => {
                        ReactSession.set("username", null);
                        ReactSession.set("name", null);
                        ReactSession.set("email", null);
                        ReactSession.set("phone", null);
                        ReactSession.set("country", null);
                        ReactSession.set("role", null);
                        window.location.href = "/";
                    }
                    }
                > Log out </button>

                <div className="flex flex-row flex-nowrap">
                    <img src={AccountImage} alt="Profile" className="w-7 h-7 mr-4" />
                    <span className="text-white text-xl overflow-clip line-clamp-1 max-w-[150px]">{ ReactSession.get("name") }</span>
                    <button><img src={menuIcon} alt="Profile" className="w-7 h-7 mx-4" /></button>
                </div>
            </div>
        </div>
    );
}

export default AdminSideMenu;