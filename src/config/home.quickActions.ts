export interface QuickActionConfig {
  icon: string;
  title: string;
  subtitle: string;
  route?: string;
}

export const QUICK_ACTIONS: QuickActionConfig[] = [
  {
    icon: 'edit',
    title: 'Complete Profile',
    subtitle: 'Finish setting up your account',
    route: 'MyProfile',
  },
  {
    icon: 'shield',
    title: 'Enable Protection',
    subtitle: 'Add extra security to your login',
  },
  {
    icon: 'bell',
    title: 'Notifications',
    subtitle: 'Control alerts and updates',
  },
];
