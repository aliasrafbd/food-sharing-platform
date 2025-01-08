// import React, { useContext, useState } from 'react';
// import { Link, useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../providers/AuthProvider';
// import MovieCard from './MovieCard';

import { Link } from "react-router-dom";
import { motion } from 'motion/react';
import { easeOut } from "framer-motion";
import FoodCard from "./FoodCard";
import { useContext, useEffect } from "react";
import AOS from "aos";
import AuthContext from "../context/AuthContext/AuthContext";

const FeaturedFoods = ({ featuredFoods }) => {

    const {user} = useContext(AuthContext);

    console.log(featuredFoods);

    useEffect(() => {
            AOS.init({
                duration: 1000, 
                once: true,     
            });
        }, []);


    return (
        <>
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                <motion.h2
                    animate={
                        { x: [0,20,0] }
                    }
                    transition={
                        { duration: 2, delay: 1, ease: easeOut, repeat: Infinity }
                    }

                    className="mb-4 text-3xl font-bold">Featured <motion.span
                        animate={
                            { color: ['#33df33', '#99ff66', '#f61f99'], }
                        }
                        transition={
                            { duration: 1.5, delay: 1, repeat: Infinity }
                        }

                    >Foods</motion.span> </motion.h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 my-12 mx-auto max-w-7xl'>
                    {
                        featuredFoods?.map((food, idx) => <FoodCard key={idx} food={food}></FoodCard>)
                    }
                </div>
                <div>
                    <Link className='btn my-2 mx-auto flex justify-center max-w-[200px] items-center btn-warning' to={user ? "/availablefoods" : "/login" }>Show All</Link>
                </div>
            </div>
        </>

    );
};

export default FeaturedFoods;