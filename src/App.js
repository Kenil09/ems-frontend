import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastBar, Toaster, toast } from 'react-hot-toast';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { CircularLoader } from 'ui-component/Loader/CircularLoader';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
                <Toaster position="top-center" toastOptions={{ duration: 5000, className: 'toast-alert' }}>
                    {(t) => (
                        <ToastBar
                            toast={t}
                            style={{
                                ...t.style,
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                                animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease'
                            }}
                        />
                    )}
                </Toaster>
                <CircularLoader />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
