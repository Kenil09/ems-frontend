import { Routes, Route } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import PrivateContainer from './PrivateContainer';
import PublicContainer from './PublicContainer';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return (
        <Routes>
            <Route path={MainRoutes.path} element={MainRoutes.element}>
                {MainRoutes.children.map(({ path, element, role }) => (
                    <Route path={path} element={<PrivateContainer roles={role}>{element}</PrivateContainer>} key={path} />
                ))}
            </Route>
            <Route path={PublicRoutes.path} element={PublicRoutes.element}>
                {PublicRoutes.children.map(({ path, element }) => (
                    <Route path={path} element={<PublicContainer>{element}</PublicContainer>} key={path} />
                ))}
            </Route>
        </Routes>
    );

    // return useRoutes([MainRoutes, PublicRoutes]);
}
