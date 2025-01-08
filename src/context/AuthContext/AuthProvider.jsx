import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.init';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reqFoodData, setReqFoodData] = useState(null);
    const [availableFoods, setAvailableFoods] = useState()


    const createANewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const logInAUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        Swal.fire({
            title: 'Logged Out, Please Login',
            icon: 'info',
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
        });
        setLoading(false)

        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("State Captured", currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post('https://food-sharing-server-phi.vercel.app/jwt', user, { withCredentials: true, })
                    .then(res => {
                        console.log("login", res.data)
                        setLoading(false);
                    })
            }
            else {
                axios.post('https://food-sharing-server-phi.vercel.app/logout', {}, { withCredentials: true, })
                    .then(res => {
                        console.log("logout", res.data);
                        setLoading(false);
                    })
            }



        });
        return () => {
            unsubscribe();
        };
    }, []);


    const authInfo = {
        user,
        setUser,
        createANewUser,
        googleLogIn,
        logInAUser,
        logOut,
        loading,
        setLoading,
        availableFoods,
        setAvailableFoods,
        reqFoodData,
        setReqFoodData,
        updateUserProfile,
    }


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;