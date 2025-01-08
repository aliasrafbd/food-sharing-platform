import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { easeOut } from 'motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import AwardsCounter from './AwardsCounter';

const AboutUs = ({ servedInTotal }) => {

    const [servedPeople, setServedPeople] = useState({})


    useEffect(() => {
        axios.post('https://food-sharing-server-phi.vercel.app/foods/servedintotal', servedInTotal)
            .then(res => {
                console.log(res.data);
            })

    }, [])

    useEffect(() => {
        axios.get(`https://food-sharing-server-phi.vercel.app/foods/servedintotal`)
            .then(res => {
                setServedPeople(res.data);
            })

    }, [])

    console.log(servedPeople);

    const { awardsWon, servedPeopleInTotal, servedFamily, totalDivision, totalDistrict, totalUnion, totalVillage } = servedPeople;

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="text-center mt-12">
                <motion.h2
                    animate={
                        { x: [0,20,0] }
                    }
                    transition={
                        { duration: 2, delay: 1, ease: easeOut, repeat: Infinity }
                    }

                    className="mb-4 text-3xl font-bold">Our <motion.span
                        animate={
                            { color: ['#33df33', '#33ff66', '#ff6133'], }
                        }
                        transition={
                            { duration: 1.5, delay: 1, repeat: Infinity }
                        }

                    >History</motion.span> </motion.h2>
                <h3 className='text-md mb-20'>We Serve nation to reduce Hunger</h3>
            </div>
            <div className='grid grid-cols-2 gap-12'>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className='text-red-600'>
                        <AwardsCounter awardsWon={awardsWon}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 text-red-600 font-bold'>
                        Awards Won
                    </div>
                </div>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className=''>
                        <AwardsCounter awardsWon={totalDivision}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 font-bold'>
                        Served Total Division
                    </div>
                </div>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className=''>
                        <AwardsCounter awardsWon={totalDistrict}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 font-bold'>
                        District In Total
                    </div>
                </div>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className='text-red-600'>
                        <AwardsCounter awardsWon={totalUnion}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 text-red-600 font-bold'>
                        Union
                    </div>
                </div>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className='text-red-600'>
                        <AwardsCounter awardsWon={totalVillage}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 text-red-600 font-bold'>
                        Total Village
                    </div>
                </div>
                <div className="w-full grid gap-6">
                    <div className='text-5xl flex font-bold items-center justify-center text-gray-800'>
                        <div className=''>
                        <AwardsCounter awardsWon={servedPeopleInTotal}></AwardsCounter>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg py-4 px-6 font-bold'>
                        Served People In Total
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;