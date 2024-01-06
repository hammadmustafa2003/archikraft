import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './pages/login';
import Vision from './components/Vision';
import Pricing from './components/Pricing';
import About from "./components/About";
import Footer from "./components/Footer";
import SignUp from "./pages/signup";
import Forget from "./pages/forget";
import OTP from "./pages/otp";
import NewPass from "./pages/newpass";
import Chat from "./pages/chat";

import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useState(0); // Initialize activeIndex as state
  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };


  return (
    <div className="App">
      <Navbar
        activeIndex={activeIndex} // Pass activeIndex as props
        onActiveIndexChange={handleActiveIndexChange} // Pass handleActiveIndexChange as props
      />


      <Routes>
        {/* <Route path = "/" element = {<Home />} />  */}
        <Route path = "/" element = {<Home navbarChange = {handleActiveIndexChange}/>} />
        <Route path = "/our-vision" element = {<Vision navbarChange = {handleActiveIndexChange}/>} />
        <Route path = "/pricing" element = {<Pricing navbarChange = {handleActiveIndexChange} />} />
        <Route path = "/about-us" element = {<About navbarChange = {handleActiveIndexChange}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/newpass" element={<NewPass />} />
        {/* <Route path = "/our-vision" element = {<Vision />} />  */}
        {/* <Route path = "/pricing" element = {<Pricing />} />  */}
        {/* <Route path = "/about-us" element = {<AboutUs />} />  */}
        {/* <Route path = "/profile" element = {<Profile />} />  */}
        {/* <Route path = "/admin" element = {<Admin />} /> */}
        {/* <Route path = "/admin-profile" element = {<AdminProfile />} />    */}
        {/* <Route path = "/admin-dashboard" element = {<AdminDashboard />} /> */}

      </Routes>

      <Footer />
    </div>


  );
}

export default App;
