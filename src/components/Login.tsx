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

  const mutation = useMutation(loginUser, {
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
      <form className='max-w-xl mx-auto mt-20'>
        <div className='mb-8'>
          <p className='text-3xl font-bold'>Welcome Back!</p>
          <p className='text-[13px] text-[#7D7878]'>Login to manage your account</p>
        </div>

        <fieldset disabled={methods.formState.isSubmitting}>
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
            placeholder='********'
            className='text-black'
          />
        </fieldset>

        <button
          type='submit'
          onClick={onSubmit}
          disabled={mutation.isLoading}
          className='w-full bg-[#FFDA4C] font-bold py-2 my-4 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed'
        >
          {mutation.isLoading ? 'Logging in...' : 'Login'}
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
