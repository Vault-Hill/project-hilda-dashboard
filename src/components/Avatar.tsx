import { cx } from 'class-variance-authority';
import React, { useState } from 'react';
import avatar from '../assets/avatar.png';

const Avatar = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as Blob;
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveClick = () => {
    setImage(null);
  };

  const handleUploadClick = () => {
    // Logic to upload the image (you can implement this based on your requirements)
  };

  return (
    <div className='relative flex gap-x-5 items-center justify-between md:justify-normal mb-5'>
      <div className='relative  rounded-full overflow-hidden group'>
        <img
          src={(image as string) || avatar}
          alt='Avatar'
          className='w-28 h-28 rounded-full object-cover'
        />
        {image && (
          <button
            className='absolute bg-rose-400 bg-opacity-5 text-red-600 h-full w-full inset-0 invisible group-hover:visible'
            onClick={handleRemoveClick}
          >
            Remove
          </button>
        )}
      </div>
      <div className='h-14 relative flex flex-wrap items-center '>
        <label
          htmlFor='fileInput'
          className='dark:bg-[#0D0D0D] h-fit w-full md:px-8 md:w-fit  text-center py-2 rounded-lg dark:text-white border-[0.5px] dark:border-[#262626] border-[#26262640] cursor-pointer'
        >
          Edit
          <input
            id='fileInput'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </label>
        <button
          onClick={handleUploadClick}
          className={cx('bg-red-500  py-2 w-full md:px-8 md:w-fit rounded-lg dark:text-white', {
            'bg-opacity-0 cursor-not-allowed': !image,
          })}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Avatar;
