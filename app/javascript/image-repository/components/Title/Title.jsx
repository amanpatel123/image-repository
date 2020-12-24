import React from 'react';
import "./title.css";

const Title = ({text}) => {
  return (
    <div className='title'>
      <h1>{text}</h1>
    </div>
  )
}

export { Title };