export type MenuItem = {
  title: string;
  path: string;
  active?: boolean;
  children?: MenuItem[];
};
