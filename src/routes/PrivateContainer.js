import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setUser } from 'store/userSlice';
import { useDispatch } from 'react-redux';

const PrivateContainer = ({ children, roles }) => {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = jwtDecode(token);
            if (roles.includes(user?.role)) {
                navigate('/company');
            }
            // check role here
            // set user to redux
        } else {
            navigate('/login');
        }
    };

    return children;
};

export default PrivateContainer;
