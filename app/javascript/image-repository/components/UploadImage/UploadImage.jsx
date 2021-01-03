import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from './Modal';
import "./uploadImage.css";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    const types = ['image/png', 'image/jpeg'];
    
    if(selected && types.includes(selected.type)){
      setError(null);
      setFile(selected);
    } else {
      setFile(null);
      setError("Looks like the file type is incorrect");
    }
  }

  const reloadPage = () => {
    window.location.reload(false);
  }

  return (
    <>
      <form className="upload__image__form">
        <label className="upload__image__label">
          <input className="upload__image__input" type="file" onChange={changeHandler}/>
          <span>+</span>
        </label>
      </form>
      <div className='preview'>
        { error && <div className="error"> {error} </div> }  
        {file && 
            <Modal file={file} setFile={setFile}  /> 
        } 
      </div> 
    </>
  )
}

export { UploadImage };