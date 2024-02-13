import { cx } from 'class-variance-authority';
import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import Label from './Label';

type TextAreaProps = {
  name: string;
  label?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  validation?: RegisterOptions;
  detached?: boolean;
  override?: boolean;
} & React.ComponentProps<'textarea'>;

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  required,
  readOnly,
  validation,
  className,
  detached,
  ...props
}) => {
  const { register, formState } = useFormContext() ?? {};
  const { errors, touchedFields } = formState ?? {};
  const isTouched = touchedFields?.[name];

  const hasError = !!errors?.[name] && isTouched;

  const wrapperClasses = cx([
    'relative',
    'w-full',
    'flex',
    'flex-col',
    'gap-y-2',
    'text-[#757575]',
  ]);

  const textareaClasses = cx(
    className,
    [
      'rounded',
      'p-3',
      'focus:outline-0',
      'focus:ring-0',
      'disabled:opacity-50',
      'dark:bg-[#FFFF] bg-white border-[0.5px] border-[#00000030]',
      'h-40 w-full',

    ],
    {
      'border-red-300 focus:border-skin-error': hasError,
      'focus:border-skin-focus': !hasError,
    },
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <Label name={name} required={required} readOnly={readOnly}>
          {label}
        </Label>
      )}
      <textarea
        {...(detached ? {} : register(name, validation))}
        name={name}
        {...props}
        className={textareaClasses}
      />
      {hasError && (
        <div className='mb-1 text-sm text-skin-error'>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default TextArea;
