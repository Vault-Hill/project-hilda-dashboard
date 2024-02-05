import { useStorage } from '../hooks/useStorage';

const useApi = () => {
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  const getReports = async (options?: { id?: string; nextPageKey?: number }) => {
    const { id, nextPageKey } = options || {};

    const url = id
      ? `${import.meta.env.VITE_BASE_URL}/reports/${id}`
      : nextPageKey
      ? `${import.meta.env.VITE_BASE_URL}/reports?page=${nextPageKey}`
      : `${import.meta.env.VITE_BASE_URL}/reports`;

    return fetch(url, {
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    }).then((res) => res.json());
  };

  return { getReports };
};

export default useApi;
