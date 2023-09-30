import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LayoutOne from '../components/LayoutOne';
import Profile from '../components/Profile';
import { useStorage } from '../hooks/useStorage';
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
      path: '/login',
      title: 'Sign out',
    },
  ],
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  const { isLoading, error, data } = useQuery({
    queryKey: ['orgData'],
    queryFn: () =>
      fetch(`https://qj7oe1t9ek.execute-api.us-east-1.amazonaws.com/profile`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }).then((res) => res.json()),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) navigate('/login');

  return (
    <>
      <LayoutOne menuItems={menuItems} main={<Profile data={data.organization} />} />
    </>
  );
};

export default ProfilePage;
