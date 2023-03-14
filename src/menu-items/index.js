// assets
import {
    IconBrandChrome,
    IconHelp,
    IconBuildingSkyscraper,
    IconUsers,
    IconBuilding,
    IconUser,
    IconCalendarTime,
    IconCalendarEvent
} from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconBuildingSkyscraper, IconUsers, IconBuilding, IconUser, IconCalendarTime, IconCalendarEvent };

// ==============================|| MENU ITEMS ||============================== //

let menuItems = {
    items: [
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'users',
                    title: 'Employee',
                    type: 'item',
                    url: '/employees',
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
                    id: 'attendance',
                    title: 'Attendance',
                    type: 'item',
                    url: '/attendance',
                    icon: icons.IconCalendarTime,
                    breadcrumbs: false
                },
                {
                    id: 'shift',
                    title: 'Shift Schedule',
                    type: 'item',
                    url: '/shift',
                    icon: icons.IconCalendarTime,
                    breadcrumbs: false
                },
                {
                    id: 'leave',
                    title: 'Leave tracker',
                    type: 'item',
                    url: '/leave',
                    icon: icons.IconCalendarEvent
                }
            ]
        }
    ]
};

export default menuItems;
