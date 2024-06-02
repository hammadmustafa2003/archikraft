import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./../utils/Loader.css"

const Loader = (props) => {
    return (
        <div className="bouncing-loader md:text-[3rem] text-lg text-white pb-2 pt-6 px-3 text-center m-10">
          <div className='!bg-white'></div>
          <div className='!bg-white'></div>
          <div className='!bg-white'></div>
        </div>
    );
};


const Finalize = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const email = ReactSession.get("email");
        if (email === undefined || email === null) {
            navigate('/login');
            return;
        }

        setTimeout(() => {
            navigate('/chat');
        }, 3000);
        // TODO: Here save the subscription to the database
        // axios.post('http://localhost:5000/api/subscription', { email: email })
        
    });
    return (
        <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center'>
            <h1 className='text-white text-3xl'>Finalizing your Payment</h1>
            <Loader />
        </div>
    );
};

export default Finalize;