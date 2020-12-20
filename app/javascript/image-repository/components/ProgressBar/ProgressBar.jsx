import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ mutationLoading, setFile }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  

  useEffect(() => {
    if (!mutationLoading) {
      setFile(null);
    }
  }, [mutationLoading, setFile]);

  return (
    <motion.div className="progress-bar"
    initial="hidden"
    animate="visible"
    variants={variants}
    ></motion.div>
  );
} 

export { ProgressBar };