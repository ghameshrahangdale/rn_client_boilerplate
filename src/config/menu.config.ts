export interface MenuItemConfig {
  icon: string;
  label: string;
  subtitle?: string;
  route?: string;
  action?: 'share';
}

export const MENU_ITEMS: MenuItemConfig[] = [
  {
    icon: 'user',
    label: 'My Profile',
    subtitle: 'View and edit your personal details',
    route: 'MyProfile',
  },
  {
    icon: 'info',
    label: 'App Info',
    subtitle: 'Version, build and application details',
    route: 'AppInfo',
  },
  {
    icon: 'share-2',
    label: 'Share App',
    subtitle: 'Invite friends to try this app',
    action: 'share',
  },
  {
    icon: 'help-circle',
    label: 'Help & Support',
    subtitle: 'Get help or contact support',
    // route: 'Support',
  },
];
