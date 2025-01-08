import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import AuthContext from '../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const FoodDetailsModal = ({ foodDetails, text, setText, userEmail, isOpen, onClose }) => {

    const currentDate = new Date().toLocaleString();

    const { _id, foodName, foodImage, foodQuantity, pickupLocation, additionalNotes, expiredDate, donatorImage, foodDonatorName, foodDonatorEmail, foodStatus } = foodDetails;


    const { user, reqFoodData, setReqFoodData } = useContext(AuthContext);

    console.log(user);

    const handleUpdateFood = e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());

        formData.foodStatus = "requested";
        

        fetch('https://food-sharing-server-phi.vercel.app/requestedfoods', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "A food item is removed from available foods and send to requested Foods",
                        icon: "success"
                    });
                }
            })

        onClose();
    }

    return (
        <>
            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <form onSubmit={handleUpdateFood} className="card-body">

                            {/* Food Name  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Name</span>
                                </label>
                                <input type="text" readOnly defaultValue={foodDetails.foodName} name='foodName' placeholder="Food Name" className="input input-bordered" required />
                            </div>

                            {/* Food Image  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Image</span>
                                </label>
                                <input type="url" readOnly defaultValue={foodDetails.foodImage} name='foodImage' placeholder="Food Image" className="input input-bordered" required />
                            </div>

                            {/* Food ID  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food ID</span>
                                </label>
                                <input type="text" readOnly defaultValue={foodDetails._id} name='foodId' placeholder="Food ID" className="input input-bordered" required />
                            </div>

                            {/* User Email  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Email</span>
                                </label>
                                <input type="text" readOnly defaultValue={user?.email} name='userEmail' className="input input-bordered" required />
                            </div>

                              {/* Food Donator Name  */}
                              <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Donator Name</span>
                                </label>
                                <input type="text" readOnly defaultValue={foodDetails.foodDonatorName} name='foodDonatorName' placeholder="Food Donator Name" className="input input-bordered" required />
                            </div>

                             {/* Food Donator Email  */}
                             <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Donator Email</span>
                                </label>
                                <input type="text" readOnly defaultValue={foodDonatorEmail} name='foodDonatorEmail' className="input input-bordered" required />
                            </div>

                            {/* Reqeusted Date  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Requested Date</span>
                                </label>
                                <input type="text" defaultValue={currentDate} readOnly name='requestedDate' className="input input-bordered" required />
                            </div>


                            {/* Pickup Location */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Pickup Location</span>
                                </label>
                                <input type="text" defaultValue={foodDetails.pickupLocation} name='pickupLocation' readOnly placeholder="Pickup Location" className="input input-bordered" required />
                            </div>

                            {/* Expired Date */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Expired Date</span>
                                </label>
                                <input type="date" defaultValue={foodDetails.expiredDate} name='expiredDate' placeholder="Expired Date" readOnly className="input input-bordered" required />
                            </div>

                            {/* Additional Notes */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <input type="text"
                                    defaultValue={foodDetails.additionalNotes}
                                    name='additionalNotes' placeholder="Additional Notes" className="input input-bordered" required />
                            </div>
                            <input type="submit" className='btn bg-gradient-to-r from-blue-500 to-purple-500 mt-8 md:mt-4 text-white font-semibold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300' value="Request" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FoodDetailsModal;