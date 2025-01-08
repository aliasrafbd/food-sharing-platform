import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext/AuthContext';
import Lottie from 'lottie-react';
import LottieDataLogin from '../../src/assets/lottie/login-lottie.json';

const Login = () => {

    const { loading, setLoading, user, setUser, logInAUser, googleLogIn } = useContext(AuthContext);

    const emailRef = useRef();

    const [error, setError] = useState({})

    const location = useLocation();

    const navigate = useNavigate();


    const [localEmail, setLocalEmail] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");


        logInAUser(email, password)
            .then((result) => {
                setUser(result.user);

                Swal.fire({
                    title: 'Logging in...',
                    text: 'Please wait while we process your request.',
                    icon: 'info',
                    timer: 1000, 
                    showConfirmButton: false, 
                    timerProgressBar: true, 
                });
                setLoading(false)
                
                navigate("/");

                const user = { email: email }

            })
            .catch((err) => {
                setError({ ...error, login: err.code });
                Swal.fire({
                    title: 'Logging error',
                    text: 'Please put correct Email and Password.',
                    icon: 'info',
                    timer: 1000, 
                    showConfirmButton: false, 
                    timerProgressBar: true, 
                });
                setLoading(false)
                e.target.reset();
                
            });
    }

    const handleLoginGoogle = () => {

        googleLogIn()
            .then(res => {
                
                Swal.fire({
                    title: 'Logging in',
                    text: 'Please wait while we process your request.',
                    icon: 'info',
                    timer: 1000, 
                    showConfirmButton: false, 
                    timerProgressBar: true, 
                });
                setLoading(false)
                
                navigate("/");
            })
    }


    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className="font-extrabold text-center text-3xl">Login Account</h2>
            <div className="bg-updateProfile bg-no-repeat bg-cover bg-center mb-4 flex justify-center items-center">
                <div className=" flex-1 opacity-1 md:w-[85%] w-full card bg-transparent px-0 md:px-6 py-12 max-w-lg shrink-0">
                    <div className=''>
                        <form onSubmit={handleSubmit} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    // value={localEmail}
                                    // onChange={handleEmailChange}
                                    name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <Link to="/forgetpassword"><button className='text-blue-500 hover:text-blue-800' >Forgot Password?</button></Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition duration-300">Login</button>

                            </div>
                            <p>
                                {error.login ? <p className="text-red-600">{error.login}</p> : ""}
                            </p>
                            <p>Do not have a account? Please <Link className='text-blue-800 hover:font-bold' to="/register">Register</Link> </p>
                        </form>

                    </div>
                    <button onClick={handleLoginGoogle} className="btn bg-gray-400 hover:bg-yellow-300 w-3/6 mx-auto">Continue with Google</button>

                </div>
                <div
                    className='w-1/3'>
                    <Lottie animationData={LottieDataLogin}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Login;