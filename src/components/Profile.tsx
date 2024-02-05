import { QueryClient, useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { updateProfile } from '../fetchers/updateProfile';
import { useStorage } from '../hooks/useStorage';
import Avatar from './Avatar';
import Input from './Input';
import TextArea from './TextArea';

type Props = {
  data: {
    name: string;
    botName: string;
    email: string;
    knowledgeBase: string;
  };
};

const Profile: React.FC<Props> = ({data}) => {
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: data?.name,
      botName: data?.botName,
      email: data?.email,
      knowledgeBase: data?.knowledgeBase,
    },
  });

  const queryClient = new QueryClient();

  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['orgData']);
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate({ knowledgeBase: data.knowledgeBase, token: auth?.accessToken });
  });

  const canSave = data?.knowledgeBase !== methods.getValues('knowledgeBase');

  return (
    <div className='text-[#757575] max-w-3xl'>
     
      <Avatar />

      <FormProvider {...methods}>
        <form className='space-y-7 border-t dark:border-neutral-700 border-neutral-200 pt-7'>
          <fieldset className='space-y-7' disabled={methods.formState.isSubmitting}>
            <Input
              name='name'
              label='Company Name'
              type='text'
              placeholder='Alpha Company'
              readOnly
              className='bg-[#0F0F0F]'
            />
            
            <Input
              name='email'
              label='Email'
              type='text'
              placeholder='example@gmail.com'
              readOnly
              className='bg-[#0F0F0F]'
            />

            <Input
              name='botName'
              label='Agent Name'
              type='text'
              placeholder='James Bond'
              readOnly
              className='bg-[#0F0F0F]'
            />
            <TextArea name='knowledgeBase' label='Knowledge Base' spellCheck='false' />
          </fieldset>

          <button
            className='bg-[#47E2BD] px-10 py-2 rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            onClick={onSubmit}
            disabled={!canSave}
          >
            {mutation.isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;
