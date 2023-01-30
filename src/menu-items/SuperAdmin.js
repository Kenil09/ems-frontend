// assets
import { IconBrandChrome, IconHelp, IconBuildingSkyscraper } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconBuildingSkyscraper };

const SuperAdmin = {
    items: [
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                {
                    id: 'company',
                    title: 'Companies',
                    type: 'item',
                    url: '/company',
                    icon: icons.IconBuildingSkyscraper,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default SuperAdmin;
