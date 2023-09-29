import { FormProvider, useForm } from 'react-hook-form';
import Avatar from './Avatar';
import Input from './Input';
import TextArea from './TextArea';

const Profile = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      orgName: '',
      email: '',
      websiteUrl: '',
    },
  });
  return (
    <div className='text-[#757575] max-w-3xl'>
      <Avatar />

      <FormProvider {...methods}>
        <form className='space-y-7 border-t border-neutral-700 pt-7'>
          <fieldset className='space-y-7'>
            <Input
              name='orgName'
              label='Company Name'
              type='text'
              placeholder='Alpha Company'
              readOnly
            />
            <Input
              name='Email'
              label='Email'
              type='text'
              placeholder='example@gmail.com'
              readOnly
            />
            <Input name='agentName' label='Agent Name' type='text' placeholder='James Bond' />
            <TextArea name='description' label='Knowledge Base' />
          </fieldset>

          <button className='bg-sky-500 px-10 py-2 rounded-md text-black' type='submit'>
            Update
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;
