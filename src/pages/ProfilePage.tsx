import LayoutOne from '../components/LayoutOne';
import Profile from '../components/Profile';
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

const ProfilePage = () => {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['orgData'],
  //   queryFn: () => fetch(`${import.meta.env.VITE_BASE_URL}/profile`).then((res) => res.json()),
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`).then((res) =>
  //         res.json(),
  //       );
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
      <LayoutOne menuItems={menuItems} main={<Profile />} />
    </>
  );
};

export default ProfilePage;
