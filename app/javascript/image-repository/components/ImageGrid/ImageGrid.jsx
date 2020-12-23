import React from 'react';
import { motion } from 'framer-motion';
import './imageGrid.css';

const ImageGrid = ({ edges }) => { 
  console.log(edges)
  return (
    <div className="img-grid">
      { edges && edges.map(({node}) => (
        <div className="img-wrap" key={node.id}>
          <img src={node.url} alt="uploaded pic" />
        </div>
      ))}
    </div>
  )
}

export { ImageGrid };