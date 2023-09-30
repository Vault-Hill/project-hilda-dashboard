import React from 'react';
import LayoutOne from '../components/LayoutOne';
import Settings from '../components/Settings';
import { MenuItem } from '../types';

const menuItems: MenuItem[][] = [
  [
    {
      path: '/',
      title: 'Home',
      active: true,
    },
  ],
  [
    {
      path: '/',
      title: 'Sign out',
    },
  ],
];

const SettingsPage = () => {
  
  return (
      <LayoutOne menuItems={menuItems} main={<Settings />} />
  );
};

export default SettingsPage;
