import React, { useContext, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from '../context/AuthContext/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

const AddBlog = () => {

    const { user } = useContext(AuthContext);


    const [selectedDate, setSelectedDate] = useState(null);
   

    const { isPending, mutateAsync, isError } = useMutation({
        mutationFn: async allBlogs => {
            await axios.post("https://food-sharing-server-phi.vercel.app/blogs", allBlogs, {withCredentials: true,})
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Added a new blog, saved to database',
                icon: 'success',
                confirmButtonText: 'Close'
            })
        }
        
    })

    const handleAddBlog = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

        initialData.publishedDate = formattedDate;

        await mutateAsync(initialData)

        console.log(initialData);
        e.target.reset();

    }

    return (
        <>
            <h2 className='font-extrabold text-3xl text-center max-w-7xl mx-auto'>Add Blog</h2>
            <form onSubmit={handleAddBlog} className="card-body grid grid-cols-1  md:grid-cols-2 gap-6 max-w-7xl mx-auto">

                {/* News Headline  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">News Headline</span>
                    </label>
                    <input type="text" name='newsHeadline' placeholder="News Headline" className="input input-bordered" required />
                </div>

                {/* News Author  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">News Author</span>
                    </label>
                    <input type="text" name='newsAuthor' placeholder="News Author" className="input input-bordered" required />
                </div>

                {/* Published Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Published Date</span>
                    </label>
                    <DatePicker
                        className='w-full h-12 pl-1 input input-bordered'
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd" 
                        placeholderText="Published Date" 
                    />
                </div>

                {/* News Image  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">News Image</span>
                    </label>
                    <input type="url" name='newsImage' placeholder="News Image" className="input input-bordered" required />
                </div>

                {/* News Content */}
                <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                        <span className="label-text">News Content</span>
                    </label>
                    <textarea rows="5" name='newsContent' className="textarea textarea-bordered" placeholder="News Content"></textarea>
                </div>

                <input type="submit" className='btn col-span-1 md:col-span-2 my-4 mx-auto w-28 justify-center items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium shadow-md hover:shadow-lg focus:outline-none' value={isPending ? "Adding Blog" : "Add Blog"} />
            </form>
        </>
    );
};

export default AddBlog;