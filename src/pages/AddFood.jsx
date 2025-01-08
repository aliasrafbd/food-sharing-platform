import React, { useContext } from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from '../context/AuthContext/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';

const AddFood = () => {

    const { user } = useContext(AuthContext);

    const { isPending, mutateAsync, isError } = useMutation({
        mutationFn: async allJobsAvailable => {
            await axios.post("https://food-sharing-server-phi.vercel.app/availablefoods", allJobsAvailable, {withCredentials: true,})
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Added a new food, saved to database',
                icon: 'success',
                confirmButtonText: 'Close'
            })
        }
        
    })


    const [selectedDate, setSelectedDate] = useState(null);

    const handleAddFood = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

        initialData.expiredDate = formattedDate;
        initialData.donatorImage = user?.photoURL;
        initialData.foodDonatorName = user?.displayName;
        initialData.foodDonatorEmail = user?.email;
        initialData.foodStatus = "Available";
        e.target.reset();


        await mutateAsync(initialData)
        

    }

    return (
        <>
            <h2 className='font-extrabold text-3xl text-center max-w-7xl mx-auto'>Add Food</h2>
            <form onSubmit={handleAddFood} className="card-body grid grid-cols-1  md:grid-cols-2 gap-6 max-w-7xl mx-auto">

                {/* Food Name  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Food Name</span>
                    </label>
                    <input type="text" name='foodName' placeholder="Food Name" className="input input-bordered" required />
                </div>

                {/* Food Image  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Food Image</span>
                    </label>
                    <input type="url" name='foodImage' placeholder="Food Image" className="input input-bordered" required />
                </div>

                {/* Food Quantity  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Food Quantity</span>
                    </label>
                    <input type="number" name='foodQuantity' placeholder="Food Quantity" className="input input-bordered" required />
                </div>

                {/* Pickup Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Pickup Location</span>
                    </label>
                    <input type="text" name='pickupLocation' placeholder="Pickup Location" className="input input-bordered" required />
                </div>

                {/* Expired Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Expired Date</span>
                    </label>
                    <DatePicker
                        className='w-full h-12 pl-1 input input-bordered'
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd" // Custom format
                        placeholderText="Expired Date" // Placeholder text
                    />
                </div>

                {/* Additional Notes */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Additional Notes</span>
                    </label>
                    <input type="text" name='additionalNotes' placeholder="Additional Notes" className="input input-bordered" required />
                </div>

                {/*  Donator Image, Name, Email (from Logged In User)  */}
                {/* Food status write to db by manual */}
                <input type="submit" className='btn col-span-1 md:col-span-2 my-4 mx-auto w-28 justify-center items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg focus:outline-none' value={isPending ? "Adding Food" : "Add Food"} />
            </form>
        </>
    );
};

export default AddFood;