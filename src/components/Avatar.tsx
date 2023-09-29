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
    <div className='relative flex gap-x-5 items-end mb-5'>
      <div className='relative rounded-full overflow-hidden group'>
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
      <div className='h-14 space-x-4'>
        <label
          htmlFor='fileInput'
          className='bg-yellow-400 px-8 py-2 rounded-lg text-black cursor-pointer'
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
          className={cx('bg-green-300 px-8 py-1 rounded-lg text-black', {
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
