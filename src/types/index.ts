/* eslint-disable @typescript-eslint/no-explicit-any */
export type MenuItem = {
  title: string;
  path: string;
  active?: boolean;
  children?: MenuItem[];
};

export type NavItem = {
  title: string;
  path: string;
  icon: any;
  active?: boolean;
};
