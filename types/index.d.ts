export interface INavItem {
  title: string;
  href: string;
  tag?: string;
  children?: INavItem[];
}

export interface INavItemWithChildren {
  title: string;
  children: INavItem[];
}

export interface INavigationConfig {
  topNavItems: INavItem[];
  sideNavItems: INavItemWithChildren[];
}
