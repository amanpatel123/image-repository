import React, { useState } from 'react';
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

  return (
    <form className='tbd'>
      <label>
        <input type="file" onChange={changeHandler}/>
        <span>+</span>
      </label>
      <div className='preview'>
        { error && <div className="error"> {error} </div> }  
        { file && <div> {file.name} </div> }  
      </div>
    </form>
  )
}

export { UploadImage };