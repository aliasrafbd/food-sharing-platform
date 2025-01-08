import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';

const MyFoodRequest = () => {

    const [requestedFoods, setRequestedFoods] = useState([]);

    const { user } = useContext(AuthContext);
    console.log(user?.email);

    useEffect(() => {
        

        axios.get(`https://food-sharing-server-phi.vercel.app/requestedfoods?currEmail=${user?.email}`, {withCredentials: true,})
            .then(res => {
                setRequestedFoods(res.data);
            })

    }, [])


    return (
        <>
            <h2 className='text-center md:w-[100%] max-w-7xl mx-auto text-3xl mb-8 font-extrabold'>
                My Food Request
            </h2>
            <div className="max-w-7xl mx-auto px-8 flex flex-col justify-center overflow-x-auto lg:overflow-x-hidden bg-red-200">
                <table className="table text-center">
                    <thead className='font-extrabold'>
                        <tr>
                            <th></th>
                            <th>Food Image</th>
                            <th>Food Name</th>
                            <th>Food Donator Name</th>
                            <th>User Email</th>
                            <th>Expired Date</th>
                            <th>Food Status </th>
                            <th>Pickup Location </th>
                            <th>Requested Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            requestedFoods?.map((food, idx) => <>
                                <tr className="hover"></tr>
                                <th>{idx + 1}</th>
                                <td className='flex justify-center items-center'><img className='h-16 w-16 rounded-full' src={food.foodImage} alt="not valid" /></td>
                                <td>{food.foodName}</td>
                                <td>{food.foodDonatorName}</td>
                                <td>{food.userEmail}</td>
                                <td>{food.expiredDate}</td>
                                <td>{food.foodStatus}</td>
                                <td>{food.pickupLocation}</td>
                                <td>{food.requestedDate}</td>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyFoodRequest;