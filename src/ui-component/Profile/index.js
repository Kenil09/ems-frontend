import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import getProfilePicture from 'utils/getProfilePicture';

const Profile = ({ src, alt, sx, ...props }) => {
    const [url, setUrl] = useState('');
    console.log(src);
    useEffect(() => {
        const path = src ? src : 'default.png';
        const getPhoto = async () => {
            const photo = await getProfilePicture(process.env.REACT_APP_BUCKET, `profile/${path}`);
            setUrl(photo);
        };
        getPhoto();
        return () => {
            URL.revokeObjectURL(url);
        };
    }, []);
    return <Avatar alt={alt} src={url} sx={{ width: 45, height: 45, ...sx }} {...props} />;
};

export default Profile;
