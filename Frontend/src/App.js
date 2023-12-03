import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/login";
import Vision from "./components/Vision";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Footer from "./components/Footer";
import SignUp from "./pages/signup";
import Forget from "./pages/forget";
import OTP from "./pages/otp";
import NewPass from "./pages/newpass";

import "./App.css";

import { Component, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Admin_Login = React.lazy(() => import("./views/pages/login/Login"));

//import Admin_Login from './views/pages/login/Login';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
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
        <Route
          path="/"
          element={<Home navbarChange={handleActiveIndexChange} />}
        />
        <Route
          path="/our-vision"
          element={<Vision navbarChange={handleActiveIndexChange} />}
        />
        <Route
          path="/pricing"
          element={<Pricing navbarChange={handleActiveIndexChange} />}
        />
        <Route
          path="/about-us"
          element={<About navbarChange={handleActiveIndexChange} />}
        />
        <Route path="/login" element={<Login />} />

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

        {/* Admin Routes */}
        <Route exact path="/login_admin" name="Login Page" element={<Admin_Login />} />
        {/* <Route
          exact
          path="/register"
          name="Register Page"
          element={<Register />}
        />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route path="*" name="Home" element={<DefaultLayout />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
