import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PrivateContainer = ({ children, roles }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('got here');
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = jwtDecode(token);
            // check role here
            // set user to redux
        } else {
            navigate('/login');
        }
    };

    return children;
};

export default PrivateContainer;
