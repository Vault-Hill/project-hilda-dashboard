// components/LoginForm.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { handleSubmit, register } = useForm<LoginInputs>();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (formData: LoginInputs) => {
      console.log(formData);
      // Simulated API call, replace with actual API endpoint
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Login successful!');
        }, 1000);
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch data after successful login
        queryClient.invalidateQueries(['userData']); // Assuming you have a query named 'userData'
      },
    },
  );

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} />
      </div>

      <div>
        <label>Password</label>
        <input {...register('password', { required: true })} type='password' />
      </div>

      <button type='submit' disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
