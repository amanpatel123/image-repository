import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import './modal.css';

const Modal = ({ setSelectedImg, selectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop') || e.target.classList.contains('photo')) {
      setSelectedImg(null);
    }
  }

  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="photo__container" >
        <div className="photo__description">
          <div className="photo__info">
            <h1>{selectedImg.label}</h1>
            <p>
              {selectedImg.description}
            </p>
          </div>
          <a href={selectedImg.url} download>
            <Button variant="primary">
              Download
            </Button>
          </a>
          <p><b>Photo by: </b>{selectedImg.user.fullName}</p>
          <p><b>Tags: </b>{selectedImg.tags}</p>
        </div>

        <div className="photo__imageholder">
          <motion.img src={selectedImg.url} alt="enlarged pic" 
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            transition={"easeIn"}
          />
        </div>
      </div>
    </motion.div>
  )
}

export { Modal };