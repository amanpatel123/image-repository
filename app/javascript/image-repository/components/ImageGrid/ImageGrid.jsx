import React from 'react';
import { motion } from 'framer-motion';
import './imageGrid.css';

const ImageGrid = ({ images }) => { 
  return (
    <div className="img-grid">
      { images && images.map(image => (
        <div className="img-wrap" key={image.id}>
          <img src={image.url} alt="uploaded pic" />
        </div>
      ))}
      
    </div>
  )
}

export { ImageGrid };