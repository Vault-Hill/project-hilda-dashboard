import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../api';
import LayoutOne from '../components/LayoutOne';
import Loader from '../components/Loader';
import Report from '../components/Report';
import { MenuItem, NavItem } from '../types';

const menuItems: MenuItem[][] = [
  [
    {
      path: '/',
      title: 'Settings',
    },
  ],
  [
    {
      path: '/',
      title: 'Sign out',
    },
  ],
];

const navItems: NavItem[] = [
  {
    title: 'Profile',
    path: '/profile',
    icon: UserCircleIcon,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Cog8ToothIcon,
  },
  {
    title: 'Reports',
    path: '/reports',
    active: true,
    icon: ClipboardDocumentListIcon,
  },
];

const ReportPage = () => {
  const navigate = useNavigate();
  const { getReports } = useApi();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getReports(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;

  if (error) navigate('/login');

  return (
    <LayoutOne
      title='Reports'
      menuItems={menuItems}
      navItems={navItems}
      main={<Report data={data} />}
    />
  );
};

export default ReportPage;
