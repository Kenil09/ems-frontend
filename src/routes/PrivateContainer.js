import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Page404 from 'views/404Page/Page404';

const PrivateContainer = ({ children, roles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = jwtDecode(token);
            if (roles.includes(user?.role)) {
                setIsAuthenticated(true);
            }
            // check role here
            // set user to redux
        } else {
            navigate('/login');
        }
    };

    return isAuthenticated ? children : <Page404 />;
};

export default PrivateContainer;
