import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Vision from './components/Vision';
import Pricing from './components/Pricing';
import About from "./components/About";
import Footer from "./components/Footer";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        <Route path = "/" element = {<Home navbarChange = {handleActiveIndexChange}/>} /> 
        <Route path = "/our-vision" element = {<Vision navbarChange = {handleActiveIndexChange}/>} /> 
        <Route path = "/pricing" element = {<Pricing navbarChange = {handleActiveIndexChange} />} /> 
        <Route path = "/about-us" element = {<About navbarChange = {handleActiveIndexChange}/>} /> 
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
