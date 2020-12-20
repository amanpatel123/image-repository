import React, { useState } from 'react';
import { UploadImage, ImageGrid } from '../../components/';
import { useGetMyUploads } from '../../hooks/useGetMyUploads';

const MyUploads = () => {
  const {images, refetch} = useGetMyUploads();

  return (
    <div>
      <UploadImage refetch={refetch} />
      <ImageGrid images={images}/>
    </div>
 )
}

export { MyUploads };