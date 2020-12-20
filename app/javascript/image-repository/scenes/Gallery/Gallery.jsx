import React, { useState } from 'react';
import { ImageGrid } from '../../components/';
import { useGetImages } from '../../hooks/useGetImages';

const Gallery = () => {
  const data  = useGetImages();

  return (
    <div>
      <ImageGrid data={data} />
    </div>
 )
}

export { Gallery };