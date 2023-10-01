import { QueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateProfile } from '../fetchers/updateProfile';
import { useStorage } from '../hooks/useStorage';
import Avatar from './Avatar';
import Input from './Input';
import TextArea from './TextArea';

type Props = {
  data: {
    orgName: string;
    agentName: string;
    email: string;
    knowledgeBase: string;
  };
};

const Profile: React.FC<Props> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      orgName: data?.orgName,
      agentName: data?.agentName,
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
    setIsSubmitting(true);
    mutation.mutate({ knowledgeBase: data.knowledgeBase, token: auth?.accessToken });
    setIsSubmitting(false);
  });

  const canSave = data?.knowledgeBase !== methods.getValues('knowledgeBase');
  return (
    <div className='text-[#757575] max-w-3xl'>
      <Avatar />

      <FormProvider {...methods}>
        <form className='space-y-7 border-t border-neutral-700 pt-7'>
          <fieldset className='space-y-7' disabled={isSubmitting}>
            <Input
              name='orgName'
              label='Company Name'
              type='text'
              placeholder='Alpha Company'
              readOnly
            />
            <Input
              name='email'
              label='Email'
              type='text'
              placeholder='example@gmail.com'
              readOnly
            />
            <Input
              name='agentName'
              label='Agent Name'
              type='text'
              placeholder='James Bond'
              readOnly
            />
            <TextArea name='knowledgeBase' label='Knowledge Base' spellCheck='false' />
          </fieldset>

          <button
            className='bg-sky-500 px-10 py-2 rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed'
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
