import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LayoutOne from '../components/LayoutOne';
import Loader from '../components/Loader';
import Report from '../components/Report';
import { useStorage } from '../hooks/useStorage';
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
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  const { isLoading, error, data } = useQuery({
    queryKey: ['reports'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/reports`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
    enabled: true,
  });

  console.log(data);

  if (isLoading) return <Loader />;

  if (error) navigate('/login');

  return (
    <LayoutOne
      menuItems={menuItems}
      navItems={navItems}
      title='Reports'
      main={<Report data={data} />}
    />
  );
};

export default ReportPage;
