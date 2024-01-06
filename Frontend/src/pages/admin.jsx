import { React, useState } from "react";
import AdminSideMenu from "../components/AdminSideMenu";
import menuIcon from "../images/menu.png";



const Admin = (props) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuVisible(!isSideMenuVisible);
  };

  const sideMenuOptions = ["Profile", "Users", "Post News", "Logout"];
  const [selectedOption, setSelectedOption] = useState(sideMenuOptions[0]);

  props.navbarChange(-1);
  return (
    <div className="flex flex-row flex-nowrap justify-center align-middle h-screen relative">
      <div
        className={`transform transition-transform ease-out duration-300 absolute top-0 left-0 h-full w-full z-20 filter backdrop-blur-xl ${
          isSideMenuVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {<AdminSideMenu sideMenuItems={sideMenuOptions} toggleMenu={toggleSideMenu} selectOption={setSelectedOption} selectedOption={selectedOption} />}
      </div>

      <div key="conversation" className="md:w-2/3 w-[90%] h-full relative">
        <button
          className="absolute top-6 left-5 border-2 border-white rounded-md hover:border-0 hover:bg-green-500 hover:scale-125 ease-out duration-150 z-10"
          onClick={toggleSideMenu}
        >
          <img
            src={menuIcon}
            alt="close"
            className="md:w-10 w-8 md:h-10 h-8 p-1"
          />
        </button>

        {/* 
        <div className="flex flex-col m-2 p-4 h-full rounded-lg relative">
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
          </Link> */}


      </div>
    </div>
  );
};

export default Admin;
