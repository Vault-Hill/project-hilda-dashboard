import { useQuery } from '@tanstack/react-query';
import { useStorage } from '../hooks/useStorage';
import TextArea from './TextArea';

const Settings = () => {
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['accKey'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/access-key`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
      <div className='flex flex-col gap-5'>
        {/* <p className='text-4xl dark:text-white text-black mb-5 pt-16 font-bold'>Access Key</p> */}
        <TextArea
          name='accessKey'
          label='Access Key'
          defaultValue=''
          value={data?.accessKey}
          detached
          readOnly
          className='max-w-3xl'
        />
        <button
          className='px-3 py-2 bg-[#FF7E7E] rounded-md w-fit text-[14px] font-semibold text-black'
          onClick={() => refetch()}
        >
          {isFetching ? 'Generating...' : 'Generate Access Key'}
        </button>
      </div>
  );
};

export default Settings;
