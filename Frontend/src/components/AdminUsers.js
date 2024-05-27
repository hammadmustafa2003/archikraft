import React, { useState, useEffect, useRef } from 'react';
import { useCountries } from "use-react-countries";
import PhoneInput from 'react-phone-number-input';
import axios from "axios";
// import { ReactSession } from "react-client-session";
import { sha256 } from "js-sha256";



const AdminUsers = () => {


    const [visibleCreateUser, setVisibleCreateUser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
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
    

    // get all users from backend
    useEffect(() => {
        try {
            // get users from backend
            axios
                .get("http://localhost:5000/getUsers")
                .then((response) => {
                    // console.log(response.data);
                    // remove admins
                    const filteredUsers = response.data.users.filter(user => user.role !== 'admin');
                    setUsers(filteredUsers);
                    setFilteredUsers(filteredUsers);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

        


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

        // Filter users based on search term
        const filteredUsers = users.filter(user => {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filteredUsers);
        if (searchTerm === '') {
            setFilteredUsers(users);
        }

        // display users in table
        const table = document.getElementById('users');
        const rows = table.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const td = rows[i].getElementsByTagName('td')[0];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }
        }



    };

    const handleCreateUser = () => {
        // check all fields are filled
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      name === "" ||
      confirmPassword === ""
    ) {
      document.getElementById("error").innerHTML =
        "<p class='text-red-500 text-md italic'>Please fill all fields</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
      return;
    }

    // encrypt password
    const pass = sha256(password);
    const confpass = sha256(confirmPassword);

    const payload = {
      email,
      password: pass,
      username,
      name,
      confirmPassword: confpass,
      role,
      country,
      phoneNumber,
    };

    axios
      .post("http://localhost:5000/signup", payload)
      .then((response) => {
        // if response is 200, print 'message' in error div and clear form
        // if response is 400, print 'error' in error div
        // if response is 500, print 'error' in error div

        if (response.status === 200) {
          
          setEmail("");
          setPassword("");
          setUsername("");
          setName("");
          setConfirmPassword("");
          setRole("architect");
          setCountry("Pakistan");
          setPhoneNumber("+923164117090");
          
          // redirect to login page
          window.location.href = "/login";
        } else if (response.status === 400) {
          console.log(response.data.error);
        } else if (response.status === 500) {
          console.log(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const handleDeleteUser = async username => {
        console.log(username);
        // delete user from backend
        try {
            const payload = {
                username
            };
            await axios.post("http://localhost:5000/deleteUser", payload);
            // refresh page
            window.location.reload();
            
        }
        catch (error) {
            console.log(error);
        }
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

                <table id="users">
                    <thead>
                        <tr className="border-b-2 border-blue-600 text-blue-500 text-xl font-black m-3">
                            <th className='p-3 font-black'>Username</th>
                            <th className='p-3 font-black'>Name</th>
                            <th className='p-3 font-black'>Country</th>
                            <th className='p-3 font-black'>Phone</th>
                            <th className='p-3 font-black'>Role</th>
                            <th className='p-3 font-black'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={user.id} className=" text-white text-lg m-3">
                                <td className='p-3'>{user.username}</td>
                                <td className='p-3'>{user.name}</td>
                                <td className='p-3'>{user.country}</td>
                                <td className='p-3'>{user.phone}</td>
                                <td className='p-3'>{user.role}</td>
                                <td>
                                    <button
                                        className="rounded-md bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                                        onClick={() => handleDeleteUser(user.username)}
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
