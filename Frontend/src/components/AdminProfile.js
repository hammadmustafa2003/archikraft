import React from 'react';
import AccountImage from "../images/profile_white.png";


const AdminProfile = () => {
    const user_details = {
        profile_image: AccountImage,
        username: 'admin',
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone_number: '1234567890',
        role: 'Admin',
        country: 'United States',
    };

    return (
        <div className="flex flex-col">
            
            <div className="mt-4">
                <div className='flex w-full items-center justify-center align-middle pb-10'>
                    <div className="rounded-full w-48 h-48 overflow-hidden border-white border-2">
                        <img src={user_details.profile_image} style={{ transform: 'scale(1.1) translate(0,10px)' }} alt="Profile" />
                    </div>
                </div>
                
                <div className='w-full flex flex-col items-center justify-center align-middle'>
                    <div className='flex flex-row text-white items-center'>
                        <h1 className='text-xl m-5 w-44 text-end'>Name </h1>
                        <input class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username"  value={user_details.name}/>
                    </div>

                    <div className='flex flex-row text-white items-center'>
                        <h1 className='text-xl m-5 w-44 text-end'>Email </h1>
                        <input class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username"  value={user_details.email}/>
                    </div>

                    <div className='flex flex-row text-white items-center'>
                        <h1 className='text-xl m-5 w-44 text-end'>Phone Number </h1>
                        <input class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username"  value={user_details.phone_number}/>
                    </div>

                    <div className='flex flex-row text-white items-center'>
                        <h1 className='text-xl m-5 w-44 text-end'>Role </h1>
                        <input class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username"  value={user_details.role}/>
                    </div>

                    <div className='flex flex-row text-white items-center'>
                        <h1 className='text-xl m-5 w-44 text-end'>Country </h1>
                        <input class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username"  value={user_details.country}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
