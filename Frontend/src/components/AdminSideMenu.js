import AccountImage from "../images/profile_white.png";
import menuIcon from "../images/menu.png";
import closeIcon from "../images/close.png";

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
                <div className="flex flex-row flex-nowrap">
                    <img src={AccountImage} alt="Profile" className="w-7 h-7 mr-4" />
                    <span className="text-white text-xl overflow-clip line-clamp-1 max-w-[150px]"> John wick carter gale hale </span>
                    <button><img src={menuIcon} alt="Profile" className="w-7 h-7 mx-4" /></button>
                </div>
            </div>
        </div>
    );
}

export default AdminSideMenu;