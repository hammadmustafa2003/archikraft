import React, { useState } from 'react';
const news_temp = [
    {id:0, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl."},
    {id:1, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl."},
    {id:2, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl."},
    {id:3, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl."},
    {id:4, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl nunc eu nisl."}
];
const AdminPostNews = () => {
    const [newsText, setNewsText] = useState('');
    const [newses, setNews] = useState(news_temp);


    const handlePost = () => {
        setNews(prevNews => {
            // debugger;
            const updatedNewslen = prevNews.push({id:-1, text:newsText});
            setNews(prevNews);
            setNewsText('');
            // TODO: Logic to add news to database
            return prevNews;
        });
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
                            <th className='p-3 font-black'></th>
                        </tr>
                </thead>
                <tbody>
                    
                    {newses.map((news, index) => (
                        
                        <tr key={news.id} className=" text-white text-lg m-3">
                            <td className='p-3'>{news.id}</td>
                            <td className='p-3'>{news.text}</td>
                            <td>
                                <button
                                    className="rounded-md bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                                    onClick={() => handleDeleteNews(news.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPostNews;
