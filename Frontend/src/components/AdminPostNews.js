import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useEffect } from 'react';
import axios from "axios";



const AdminPostNews = () => {
    const [newsText, setNewsText] = useState('');
    const [newses, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);


    const getNews = () => {
        try {
            axios.get("http://localhost:5000/getNews")
                .then((response) => {
                    setNews(response.data.news);
                });
        } catch (error) {
            console.log(error);
        }
    };




    const handlePost = () => {
        const text = newsText;
        console.log(text);
        try {
            axios.get("http://localhost:5000/addNews", {
                params: {
                    text: text,
                }
            })
                .then((response) => {
                    console.log(response);
                    setNewsText('');
                    getNews();
                });
            
            
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleDeleteNews = (id) => {
        setNews(prevNews => {
            const updatedNews = prevNews.filter((news) => news.id !== id);
            setNews(updatedNews);
            // TODO: Logic to delete news to database
            return updatedNews;
        });
    };

    return (
        <div className='flex flex-col md:w-2/3 self-center'>
            <textarea
                rows={10}
                cols={50}
                value={newsText}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-[rgb(255,255,255,0.3)] text-white leading-tight focus:outline-none focus:shadow-outline m-5"
                onChange={(e) => setNewsText(e.target.value)}
            />
            <button className="rounded-md bg-blue-500 text-white px-4 py-2 mb-4 self-center"
                onClick={handlePost}>Post</button>

            <table>
                <thead>
                        <tr className="border-b-2 border-blue-600 text-blue-500 text-xl font-black m-3">
                            <th className='p-3 font-black'>Id</th>
                            <th className='p-3 font-black'>Text</th>
                        </tr>
                </thead>
                <tbody>
                    
                    {newses.map((news, index) => (
                        
                        <tr key={news.id} className=" text-white text-lg m-3">
                            <td className='p-3'>{index+1}</td>
                            <td className='p-3'>{news.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPostNews;
