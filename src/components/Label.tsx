import React from 'react';

type LabelProps = {
  name: string;
  required?: boolean;
  readOnly?: boolean;
} & React.ComponentProps<'label'>;

export const Label: React.FC<LabelProps> = ({ name, required, readOnly, children }) => {
  return (
    <div className='flex justify-between text-neutral-500 text-[12px]'>
      <label htmlFor={name} className='mb-2 flex font-medium'>
        {children}:{required && <span>*</span>}
      </label>
      {readOnly && <span className='text-sm dark:text-neutral-700 text-neutral-300'>[Read Only]</span>}
    </div>
  );
};

export default Label;
