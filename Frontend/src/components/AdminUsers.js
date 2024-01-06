import React, { useState, useEffect, useRef } from 'react';
import { useCountries } from "use-react-countries";
import PhoneInput from 'react-phone-number-input'



var user_temp = [
    {
        id: 1,
        username: 'abc',
        country: 'Pakistan',
        isAdmin: true,
    },
    {
        id: 2,
        username: 'def',
        country: 'Pakistan',
        isAdmin: false, 
    },
    {
        id: 3,
        username: 'ghi',
        country: 'Pakistan',
        isAdmin: false,
    },
    {
        id: 4,
        username: 'ghijkl',
        country: 'Pakistan',
        isAdmin: false,
    }
];

const AdminUsers = () => {


    const [visibleCreateUser, setVisibleCreateUser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState(user_temp);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const createFormRef = useRef(null);


    //--------------------------------------Form--------------------------------------//
    const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const [name, setName] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [role, setRole] = useState("architect");
        const [country, setCountry] = useState("Pakistan");
        const [phoneNumber, setPhoneNumber] = useState("+92012345678");
    
        const { countries } = useCountries();
        countries.sort((a, b) => a.name.localeCompare(b.name));
    
        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };
    
        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };
    
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        }
    
        const handleNameChange = (event) => {
            setName(event.target.value);
        }
    
        const handleConfirmPasswordChange = (event) => {
            setConfirmPassword(event.target.value);
        };
    
        const handleRoleChange = (event) => {
            setRole(event.target.value);
        };


    //--------------------------------------Form--------------------------------------//

    const handleOutsideClick = (event) => {
        if (createFormRef.current && !createFormRef.current.contains(event.target)) {
            setVisibleCreateUser(false);
        }
    };

    // Function to handle ESC key press
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setVisibleCreateUser(false);
        }
    };

    useEffect(() => {
        const filteredUsers_temp = user_temp.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredUsers_temp);
    }, [searchTerm]);

    useEffect(() => {
        if (visibleCreateUser) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleKeyPress);
        }

        // Clean up event listeners when the form is not visible
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [visibleCreateUser]);
    
    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    const handleCreateUser = () => {
        setUsers(prevUsers => {
            const updatedUserslen = prevUsers.push({
                    id: -1,
                    username: username,
                    country: country,
                    isAdmin: false,
                }
            );
            setFilteredUsers(prevUsers);
    
            // TODO: Logic to delete a user in the database
            return prevUsers;
        });
    };

    const handleDeleteUser = async userId => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => user.id !== userId);
            setFilteredUsers(updatedUsers);
    
            // TODO: Logic to delete a user in the database
            return updatedUsers;
        });
    };

    const handleToggleAdmin = userId => {

        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.id === userId) {
                    user.isAdmin = !user.isAdmin;
                }
                return user;
            });
            setFilteredUsers(updatedUsers);
    
            // TODO: Logic to toggle the admin status of a user in database
            return updatedUsers;
        });

    };

    return (
        <div className="flex flex-col p-4">
            <button
                className="rounded-md bg-blue-500 text-white px-4 py-2 mb-4 self-start"
                onClick={() => setVisibleCreateUser(!visibleCreateUser)}
            >
                Create User
            </button>

            
            <div className='flex flex-col justify-center'>
                <input
                    type="text"
                    placeholder="Search using username"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md px-4 py-2 mb-4"
                />

                <table>
                    <thead>
                        <tr className="border-b-2 border-blue-600 text-blue-500 text-xl font-black m-3">
                            <th className='p-3 font-black'>Username</th>
                            <th className='p-3 font-black'>Country</th>
                            <th className='p-3 font-black'>Admin</th>
                            <th className='p-3 font-black'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user,index) => (
                            <tr key={user.id} className=" text-white text-lg m-3">
                                <td className='p-3'>{user.username}</td>
                                <td>{user.country}</td>
                                <td>
                                    <input type='checkbox' 
                                    checked={user.isAdmin}
                                    onChange={() => handleToggleAdmin(user.id)}
                                    /></td>
                                <td>
                                    <button
                                        className="rounded-md bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        {visibleCreateUser && (
            <form className="fixed top-10 left-10 backdrop-blur-3xl bg-white/10 shadow-md rounded px-8 pt-6 pb-8 mb-4 z-50"
             key="Add user"
             ref={createFormRef}
            >
            <div className="flex items-center justify-between">
                <div className="mb-6 mr-2">
                    <label className="block text-white text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}    
                />
            </div>
            <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                    Phone Number
                </label>
                <PhoneInput
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="mb-6 mr-2">
                    <label className="block text-white text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="***********"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="***********"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                    What is your role?
                </label>
                <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="role"
                    name="role"
                    onChange={handleRoleChange}
                    value={role}
                    size="md"
                >
                    <option value="architect">Architect</option>
                    <option value="researcher">Researcher</option>
                    <option value="client">Client</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>

                </select>
            </div>
            <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                    Select your country
                </label>
                <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="country"
                    name="country"
                    size="md"
                    onChange={(event) => setCountry(event.target.value)}
                    value={country}
                >
                    {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                        </option>

                    ))}
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-transparent border border-blue-400 hover:bg-blue-400 text-blue-400 font-bold py-2 px-4 rounded focus:shadow-outline hover:text-white hover:border-transparent"
                    type="button"
                    onClick={handleCreateUser}
                >
                    Add User
                </button>
            </div>
        </form>
        )}
            
        </div>
    );
};

export default AdminUsers;
