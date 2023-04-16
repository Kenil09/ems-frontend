// assets
import {
    IconBrandChrome,
    IconHelp,
    IconBuildingSkyscraper,
    IconUsers,
    IconBuilding,
    IconUser,
    IconCalendarTime,
    IconCalendarEvent,
    IconListDetails
} from '@tabler/icons';
import { EventAvailable } from '@mui/icons-material';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconBuildingSkyscraper,
    IconUsers,
    IconBuilding,
    IconUser,
    IconCalendarTime,
    IconCalendarEvent,
    IconListDetails,
    IconEventAvaialble: EventAvailable
};

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
                    url: '/',
                    icon: icons.IconUsers,
                    breadcrumbs: false
                },
                {
                    id: 'department',
                    title: 'Departments',
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
                    id: 'shift',
                    title: 'Shift Schedule',
                    type: 'item',
                    url: '/shifts',
                    icon: icons.IconCalendarTime,
                    breadcrumbs: false
                },
                {
                    id: 'leave',
                    title: 'Leave tracker',
                    type: 'item',
                    url: '/leave',
                    icon: icons.IconCalendarEvent
                },
                {
                    id: 'tasks',
                    title: 'Tasks',
                    type: 'item',
                    url: '/tasks',
                    icon: icons.IconListDetails
                },
                {
                    id: 'attendence',
                    title: 'Attendence',
                    type: 'item',
                    url: '/attendences',
                    icon: icons.IconEventAvaialble
                }
            ]
        }
    ]
};

export default menuItems;
