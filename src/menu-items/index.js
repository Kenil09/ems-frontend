// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };
import dashboard from './dashboard';

import pages from './pages';
import utilities from './utilities';
import other from './other';
import SuperAdmin from './SuperAdmin';
import jwtDecode from 'jwt-decode';

// ==============================|| MENU ITEMS ||============================== //

// const currentUser = jwtDecode(localStorage.getItem('accessToken'));

const token = localStorage.getItem('accessToken1');

let menuItems = {
    items: [
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/company',
                    icon: icons.IconBrandChrome,
                    breadcrumbs: false
                }
            ]
        }
    ]
};
if (token) {
    const user = jwtDecode(token);
    if (user.role === 'SuperAdmin') {
        menuItems = SuperAdmin;
    }
}

export default menuItems;
