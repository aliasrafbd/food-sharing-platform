import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import FoodDetailsModal from '../components/FoodDetailsModal';
import AuthContext from '../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const BlogDetails = () => {

    const { id } = useParams();

    // const navigate = useNavigate();

    const [blog, setBlog] = useState({});

    useEffect(() => {

        axios.get(`https://food-sharing-server-phi.vercel.app/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
            })

    }, [])

    console.log(blog);


    const { newsHeadline, newsAuthor, newsImage, newsContent, publishedDate } = blog


    return (
        <>
            <div className='max-w-7xl mx-auto md:mx-0'>
                <h2 className='text-2xl my-8 w-[90%] lg:w-[95%] mx-auto font-extrabold'>{newsHeadline}</h2>
                <div className='w-[90%] lg:w-[95%] mx-auto'>
                    <img 
                    className='w-[95%] h-[280px] lg:h-[480px]' src={newsImage} alt="" />
                    <div className='mt-8 mb-4 lg:mt-28 lg:mb-8'>
                        <p>Published Date: {publishedDate}</p>
                        <span>Written By: <span className='font-bold text-gray-400'>{newsAuthor}</span></span>
                    </div>
                </div>

                <p className='text-gray-600 text-justify w-[90%] lg:w-[95%] mx-auto'>
                    {newsContent}
                </p>

            </div>

        </>
    );
};

export default BlogDetails;