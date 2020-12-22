import React, { useState } from 'react';
import { UploadImage, ImageGrid } from '../../components/';
import { useGetMyUploads } from '../../hooks/useGetMyUploads';

const MyUploads = () => {
  const { images } = useGetMyUploads();
  console.log(images);

  return (
    <div>
      <UploadImage />
      <ImageGrid images={images} />
    </div>
 );
}

export { MyUploads };