// assets
import { IconBrandChrome, IconHelp, IconBuildingSkyscraper, IconUsers, IconBuilding, IconUser } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconBuildingSkyscraper, IconUsers, IconBuilding, IconUser };

// ==============================|| MENU ITEMS ||============================== //

let menuItems = {
    items: [
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'company',
                    title: 'Company',
                    type: 'item',
                    url: '/company',
                    icon: icons.IconBuildingSkyscraper,
                    breadcrumbs: false
                },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    icon: icons.IconUsers,
                    breadcrumbs: false
                },
                {
                    id: 'department',
                    title: 'Departmens',
                    type: 'item',
                    url: '/departments',
                    icon: icons.IconBuilding,
                    breadcrumbs: false
                },
                {
                    id: 'designations',
                    title: 'Designations',
                    type: 'item',
                    url: '/designations',
                    icon: icons.IconUser,
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
