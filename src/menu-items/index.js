// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };
import dashboard from './dashboard';

import pages from './pages';
import utilities from './utilities';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.IconBrandChrome,
                    breadcrumbs: false
                },
                {
                    id: 'dept-list',
                    title: 'Department List',
                    type: 'item',
                    icon: icons.IconBrandChrome,
                    url: '/department-list'
                }
            ]
        }
    ]
};

export default menuItems;
