import React from 'react'

import { Repository } from '../../components'
import { useImagesQuery } from '../../data/queries';

const ImageGallery = ({ scope }) => {
  if(scope == "Mine"){
    return (
      <div>
        <Repository useQuery={useUserQuery} />
      </div>
    )
  }else{
    return (
      <div>
        <Repository useQuery={useImagesQuery} />
      </div>
    )
  }
}

export { ImageGallery };