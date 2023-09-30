// components/LoginForm.tsx

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from 'react-router-dom'

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
          resolve("Login successful!");
        }, 1000);
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch data after successful login
        queryClient.invalidateQueries(["userData"]); // Assuming you have a query named 'userData'
      },
    }
  );

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[70%]">
      <div className="mb-8">
        <p className="text-3xl font-bold">Welcome Back!</p>
        <p className="text-[13px] text-[#7D7878]">Enter your credentials to login to your account.</p>
      </div>
      <div className="flex flex-col gap-1 mb-4 w-[70%]">
        <label className="text-[12px] text-[#7D7878]">Email</label>
        <input {...register("email", { required: true })}  className="px-5 py-2 rounded-lg"/>
      </div>

      <div className="flex flex-col gap-1 mb-4 w-[70%]">
        <label className="text-[12px] text-[#7D7878]">Password</label>
        <input {...register("password", { required: true })} type="password" className="px-5 py-2 rounded-lg"/>
      </div>
      <div className="flex gap-2 text-[14px] font-semibold">
        <input type="checkbox" name="" id="" className="new-check" />
        <div className="checkmark"></div>
        <p>Remember Information.</p>
      </div>
      <button type="submit" disabled={mutation.isLoading} className="w-[70%] bg-[#FFDA4C] font-bold py-2 my-4 rounded-lg">
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>
      <p>Dont have an account? <Link to='/' className="underline"> Sign Up</Link></p>
    </form>
  );
};

export default Login;
