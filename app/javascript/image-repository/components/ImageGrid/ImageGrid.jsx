import React from 'react';
import { motion } from 'framer-motion';
import './imageGrid.css';

const ImageGrid = ({ edges, setSelectedImg}) => { 
  console.log(edges)
  return (
    <div className="img-grid">
        { edges && edges.map(({node}) => (
          <div className="img-wrap" key={node.id}
            onClick={() => {setSelectedImg(node.url)}}>
            <img src={node.url} alt="uploaded pic" />
            <div className="img-overlay">
              <div className="img-title">{node.label}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export { ImageGrid };