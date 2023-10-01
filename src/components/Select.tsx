import { cx } from 'class-variance-authority';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import Label from './Label';

export type SelectOption = {
  label: string;
  value?: string | number;
};

type SelectProps = {
  name: string;
  label?: string;
  options?: SelectOption[];
  required?: boolean;
  placeholder?: string;
  validation?: RegisterOptions;
  detached?: boolean;
  error?: string;
} & React.ComponentProps<'select'>;

const Select: React.FC<SelectProps> = ({
  name,
  label,
  placeholder,
  required,
  options = [],
  validation,
  className,
  detached,
  error = '',
  ...props
}) => {
  const { register, formState } = useFormContext() ?? {};
  const { errors, touchedFields } = formState ?? {};
  const isTouched = touchedFields?.[name];

  const hasError = (!!errors?.[name] && isTouched) || !!error;

  const wrapperClasses = cx(['relative', 'w-full', 'flex', 'flex-col', 'text-skin-base']);
  const inputClasses = cx(
    className,
    ['rounded', 'p-3', 'shadow-sm', 'focus:outline-0', 'focus:ring-0', 'disabled:opacity-50'],
    {
      'border-red-300 focus:border-red-500': hasError,
    },
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <Label name={name} required={required}>
          {label}
        </Label>
      )}
      <select
        {...(detached ? {} : register(name, validation))}
        name={name}
        {...props}
        className={inputClasses}
      >
        <option value='' disabled className='text-gray-400'>
          {placeholder ?? `Select ${label?.toLowerCase()}`}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value ?? option.label}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className='mb-1 text-sm text-red-400'>
          {(errors?.[name]?.message as string) ?? error}
        </div>
      )}
    </div>
  );
};

export default Select;
