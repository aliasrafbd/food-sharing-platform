import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ManageMyFoods = () => {

    const [availFoods, setAvailFoods] = useState([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`https://food-sharing-server-phi.vercel.app/availablefoods?currEmail=${user?.email}`, { withCredentials: true, })
            .then(res => {
                setAvailFoods(res.data)
            })

    }, [])



    const handleDeleteFood = (id) => {
        console.log("Delete a food");

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://food-sharing-server-phi.vercel.app/availablefoods/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "A food item is deleted.",
                                icon: "success"
                            });
                            const remaining = availFoods?.filter(food => food._id !== id);
                            setAvailFoods(remaining);
                        }
                    })
            }
        });
    }

    

    return (
        <>

            <h2 className='text-center md:w-[100%] max-w-7xl mx-auto text-3xl mb-8 font-extrabold'>
                My Foods
            </h2>
            <div className="max-w-7xl mx-auto px-8 flex flex-col justify-center overflow-x-auto lg:overflow-x-hidden bg-red-200 ">
                <table className="table text-center">
                    
                    <thead className='font-extrabold hover:text-red-400'>
                        <tr>
                            <th></th>
                            <th>Food Image</th>
                            <th>Food Name</th>
                            <th>Food Donator Name</th>
                            <th>Food Donator Email</th>
                            <th>Food Quantity</th>
                            <th>Expired Date</th>
                            <th>Food Status </th>
                            <th>Pickup Location </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        

                        {

                            availFoods?.map((food, idx) => <>
                                <tr className="hover"></tr>
                                <th>{idx + 1}</th>
                                <td className='flex justify-center items-center'><img className='h-16 w-16 rounded-full' src={food.foodImage} alt="not valid" /></td>
                                
                                <td>{food.foodName}</td>
                                <td>{food.foodDonatorName}</td>
                                <td>{food.foodDonatorEmail}</td>
                                <td>{food.foodQuantity}</td>
                                <td>{food.expiredDate}</td>
                                <td>{food.foodStatus}</td>
                                <td>{food.pickupLocation}</td>
                                <td className='flex gap-4'>
                                    <Link className='btn my-2 btn-secondary' to={`/updateFood/${food._id}`}>Update</Link>
                                    <button className='btn my-2 btn-error' onClick={() => handleDeleteFood(food._id)}>X</button>
                                </td>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageMyFoods;