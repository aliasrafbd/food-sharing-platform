import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    

    const pathname = useLocation();

    if(loading) {
        return <Loading></Loading>
        
    }

    if(user && user?.email) {
        return children;
    }

    return <Navigate to = {"/login"}></Navigate>

};

export default PrivateRoute;