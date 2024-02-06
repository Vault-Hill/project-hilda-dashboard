import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { loginUser } from '../fetchers/loginUser';
import { useStorage } from '../hooks/useStorage';
import Input from './Input';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setItem: setAuth } = useStorage('session');
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.accessToken) {
        setAuth({ auth: data });
        navigate('/profile', { replace: true });
      }
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <form className='max-w-xl w-full mx-auto my-20 flex flex-col gap-5 text-gray-500'>
        <div className='mb-10'>
          <p className='gradient-text text-4xl font-bold w-fit prototype'>Sign In</p>
          <p className='text-[12px]'>
            already have an account?{' '}
            <Link to='/onboarding' className='underline'>
              Sign Up
            </Link>
          </p>
        </div>

        <fieldset disabled={methods.formState.isSubmitting} className='flex flex-col gap-5'>
          <Input
            required
            name='email'
            label='Email'
            type='text'
            placeholder='example@gmail.com'
            className='text-black'
          />
          <Input
            required
            name='password'
            label='Password'
            type='password'
            placeholder='• • • • • • • • •'
            className='text-black'
          />
        </fieldset>

        <button
          type='submit'
          onClick={onSubmit}
          disabled={mutation.isPending}
          className='w-full bg-[#47E2BD] font-bold py-4 mt-7 rounded-full disabled:opacity-40 disabled:cursor-not-allowed'
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
        <p className='text-center'>
          Don't have an account?{' '}
          <Link to='/onboarding' className='underline'>
            {' '}
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default Login;
