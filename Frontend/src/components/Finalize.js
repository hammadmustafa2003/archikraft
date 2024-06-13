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

    // get uuid and price from query params
    const queryString = useLocation().search;
    const urlParams = new URLSearchParams(queryString);
    const uuid = urlParams.get('uuid');
    const price = urlParams.get('price');
    const title = urlParams.get('title');

    const email = ReactSession.get("email");

    const getUUID = async () => {
        axios.post("http://localhost:5000/getUUID", { email: email })
            .then((response) => {
                // get status_code from response
                const status_code = response.data.status_code;
                console.log(response.data.uuid);
                console.log(uuid);
                // match uuid from response and query params
                if (response.data.uuid === uuid) {
                    axios.post("http://localhost:5000/subscribe", {
                        email: email,
                        price: price,
                        subscription: title,
                        timestamp: new Date().toISOString(),
                    })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        }
                        );

                } else {
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

        setTimeout(() => {
            navigate('/chat');
        }, 3000);
        // TODO: Here save the subscription to the database
        // axios.post('http://localhost:5000/api/subscription', { email: email })

        getUUID();
    });
    return (
        <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center'>
            <h1 className='text-white text-3xl'>Finalizing your Payment</h1>
            <Loader />
        </div>
    );
};

export default Finalize;