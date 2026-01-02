export interface MenuItemConfig {
  icon: string;
  label: string;
  route?: string;
  action?: 'share';
}

export const MENU_ITEMS: MenuItemConfig[] = [
  {
    icon: 'user',
    label: 'My Profile',
    route: 'MyProfile',
  },
  {
    icon: 'info',
    label: 'App Info',
    route: 'AppInfo',
  },
  {
    icon: 'share-2',
    label: 'Share App',
    action: 'share',
  },
  {
    icon: 'help-circle',
    label: 'Help & Support',
    route: 'Support',
  },
];
