import PropTypes from 'prop-types';
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';


const PrivateRoute = ({ children }) => {
    
    const { user, loading } = useContext(AuthContext);

        if (loading) {
            return <div className='h-screen p-10'>
                <progress className='progress w-56 '></progress>
            </div>
        }
    
        if (user?.email) {
            return children;
        }
        return <Navigate to="/login"></Navigate>
  
    
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}