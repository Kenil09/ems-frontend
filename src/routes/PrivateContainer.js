import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Page404 from 'views/404Page/Page404';
import { setUser } from 'store/userSlice';
import apiClient from 'service/service';

const PrivateContainer = ({ children, roles }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const getUserData = async (id) => {
        try {
            const { data } = await apiClient().get(`/user/${id}`);
            dispatch(setUser(data?.user));
        } catch (error) {
            console.log(error);
        }
    };

    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = jwtDecode(token);
            if (roles.includes(user?.role)) {
                setIsAuthenticated(true);
            }
            getUserData(user?._id);
            // check role here
            // set user to redux
        } else {
            navigate('/login');
        }
    };

    return isAuthenticated ? children : <Page404 />;
};

export default PrivateContainer;
