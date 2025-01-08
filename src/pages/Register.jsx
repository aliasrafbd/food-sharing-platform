import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import LottieDataRegister from '../../src/assets/lottie/register-lottie.json';

const Register = () => {

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const { logOut } = useContext(AuthContext);

    const { user, setUser, createANewUser, updateUserProfile, googleLogIn } = useContext(AuthContext)

    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");

        const form = new FormData(e.target);

        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        const regexL = /[a-z]/;
        const regexU = /[A-Z]/;

        if (!regexL.test(password)) {
            setError({ ...error, name: "Password should have at least one lowercase letter" });
            return;
        }

        if (!regexU.test(password)) {
            setError({ ...error, name: "Password should have at least one uppercase letter" });
            return;
        }

        if (password.length <= 6) {
            setError({ ...error, name: "Password must be 6  character long" });
            return;
        }

        createANewUser(email, password)
            .then((result) => {
                console.log(result);
                setUser(result.user);
                Swal.fire({
                    title: 'New User Registered...',
                    text: 'Please wait, we are navigating to home page',
                    icon: 'info',
                    timer: 1000, 
                    showConfirmButton: false, 
                    timerProgressBar: true, 
                });

                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {

                    })
                    .catch((error) => {
                    })
                logOut();
                navigate("/login");

            })
            .catch((error) => {
                console.log(error);
                alert("User Registration error", error);
            });

    }

    const handleLoginGoogle = () => {
        googleLogIn()
            .then(res => {
                
                navigate("/");
            })
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="bg-updateProfile object-contain bg-no-repeat bg-cover bg-center flex justify-center -mt-8 items-center">
                <div className="opacity-1 w-full card bg-transparent px-0 md:px-6 py-12">
                    <h2 className="font-extrabold text-center mb-6 text-3xl">Register Account</h2>
                    <div className='flex gap-6 justify-center items-center'>
                        <form onSubmit={handleSignUp} className="card-body max-w-md">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url" name="photo" placeholder="photo-url" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>

                            <div>
                                {
                                    error?.name && (
                                        <p className="text-red-600">{error.name}</p>
                                    )
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register Now</button>
                            </div>
                            <p>Already have an account? Please <Link className='text-blue-600' to="/login">Login</Link> </p>
                        </form>
                        <div className='w-1/3'>
                            <Lottie animationData={LottieDataRegister}></Lottie>
                        </div>
                    </div>
                    <button onClick={handleLoginGoogle} className="btn bg-gray-200 hover:bg-yellow-300 w-3/6 mx-auto">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;