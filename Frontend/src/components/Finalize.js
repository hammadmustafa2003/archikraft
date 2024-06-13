import React, { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const [error, setError] = React.useState("");

    // get uuid and price from query params
    const queryString = useLocation().search;
    const urlParams = new URLSearchParams(queryString);
    const uuid = urlParams.get('uuid');
    const price = urlParams.get('price');
    const title = urlParams.get('title');

    const email = ReactSession.get("email");

    const verifyPayment = async () => {
        axios.post("http://localhost:5000/getUUID", { email: email })
            .then((response) => {
                // get status_code from response
                const status_code = response.data.status_code;
                console.log(response.data.uuid);
                console.log(uuid);
                // match uuid from response and query params
                if (response.data.uuid === uuid) {
                    const payload = {
                        email: email,
                        price: price,
                        subscription: title,
                        timestamp: new Date().toISOString(),
                    }
                    console.log(payload);
                    axios.post("http://localhost:5000/subscribe", payload)
                        .then((response) => {
                            navigate('/chat');
                        })
                        .catch((error) => {
                            console.log(error);
                    });
                } else {
                    setError("Invalid subscription. Please try again.");
                    console.log("Not Matched");
                }
            })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    useEffect(() => {
        const email = ReactSession.get("email");
        if (email === undefined || email === null) {
            navigate('/login');
            return;
        }
        verifyPayment();
    });
    if (error === "") {
        return (
                <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center'>
                    <h1 className='text-white text-3xl'>Finalizing your Payment</h1>
                    <Loader />
                </div>
        )} else{
        return (
                <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center'>
                    <h1 className='text-white text-3xl'>{error}</h1>
                </div>        
        )}
};

export default Finalize;