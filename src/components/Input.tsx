import { cx } from 'class-variance-authority';
import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import Label from './Label';

type InputProps = {
  name: string;
  label?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'number' | 'time' | 'email' | 'hidden';
  validation?: RegisterOptions;
  detached?: boolean;
} & React.ComponentProps<'input'>;

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  required,
  validation,
  readOnly,
  className,
  detached,
  ...props
}) => {
  const { register, formState } = useFormContext() ?? {};
  const { errors, touchedFields } = formState ?? {};
  const isTouched = touchedFields?.[name];

  const hasError = !!errors?.[name] && isTouched;

  const wrapperClasses = cx(['relative', 'w-full', 'flex', 'flex-col', 'text-neutral-300']);
  const inputClasses = cx(
    className,
    [
      'rounded',
      'px-3 py-5',
      'outline-0',
      'focus:ring-0',
      'disabled:opacity-50',
      'bg-[#0D0D0D]',
      'border-[0.5px] border-[#262626]',
      'text-white',
    ],
    {
      'border-red-300 focus:border-red-500': hasError,
    },
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <Label name={name} required={required} readOnly={readOnly}>
          {label}
        </Label>
      )}
      <input
        {...(detached ? {} : register(name, validation))}
        name={name}
        type={type}
        readOnly={readOnly}
        {...props}
        className={inputClasses}
      />
      {hasError && (
        <div className='mb-1 text-sm text-red-400'>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default Input;
