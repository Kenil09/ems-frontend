import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Spinner from 'react-spinner-material';
import { useSelector } from 'react-redux';

const CircularLoader = () => {
    const isLoading = useSelector((state) => state.loader.isLoading);

    //   useEffect(() => {}, [isLoading]);
    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        background: '#00000080',
                        left: 0,
                        top: 0,
                        zIndex: 1500,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Spinner size={120} color={'#ffff'} visible={isLoading} />
                </div>
            )}
        </>
    );
};

const ClipLoading = ({ loading = false, color = '#ccc' }) => <ClipLoader loading={loading} color={color} height={'20%'} width={'20%'} />;

export { ClipLoading, CircularLoader };
