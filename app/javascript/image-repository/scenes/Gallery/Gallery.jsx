import React, { useState } from 'react';
import { ImageGrid } from '../../components/';
import { useGetImages } from '../../hooks/useGetImages';

const Gallery = () => {
  const { images }  = useGetImages();

  return (
    <div>
      <ImageGrid images={ images } />
    </div>
 )
}

export { Gallery };