
import { Link } from "react-router-dom";
import { motion } from 'motion/react';
import { easeOut } from "framer-motion";
import FoodCard from "./FoodCard";
import { useContext, useEffect } from "react";
import AOS from "aos";
import AuthContext from "../context/AuthContext/AuthContext";
import BlogsCard from "./BlogsCard";

const OurBlogs = ({ ourAllBlogs }) => {

    const {user} = useContext(AuthContext);

    console.log(ourAllBlogs); 

    useEffect(() => {
            AOS.init({
                duration: 1000, 
                once: true,     
            });
        }, []);


    return (
        <>
            <div className="mx-auto max-w-7xl">
                <div className="text-center my-16">
                    <motion.h2
                        animate={
                            { x: [0,20,0] }
                        }
                        transition={
                            { duration: 2, delay: 1, ease: easeOut, repeat: Infinity }
                        }

                        className="mb-12 text-3xl font-bold">Our <motion.span
                            animate={
                                { color: ['#33df33', '#33ff66', '#ff6133'], }
                            }
                            transition={
                                { duration: 1.5, delay: 1, repeat: Infinity }
                            }

                        >Recent Blogs</motion.span> </motion.h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12 mx-auto max-w-7xl px-4 md:px-8 lg:px-0'>
                    {
                        ourAllBlogs?.map((blog, idx) => <BlogsCard key={idx} blog={blog}></BlogsCard>)
                    }
                </div>
            </div>
        </>

    );
};

export default OurBlogs;