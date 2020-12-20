import React, { useEffect, useState } from 'react';
import { useCreateDirectUploadMutation } from '../../data/mutations';
import { useAttachImagePhotoMutation } from '../../data/mutations';
import { getFileMetadata } from '../../helpers/getFileMetadata';
import { directUpload } from '../../helpers/directUpload';

import { ProgressBar } from '../ProgressBar';
import "./uploadImage.css";

const UploadImage = ({refetch}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [createDirectUpload, { loading: directUploadMutationLoading }] = useCreateDirectUploadMutation();
  const [attachImagePhoto] = useAttachImagePhotoMutation();


  useEffect(()=>{
    metadata();
    console.log(refetch);
  }, [file]);

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

  const metadata = () => {
    if(file && !directUploadMutationLoading){
      const data = getFileMetadata(file).then((metadata) => {
        return  createDirectUpload({ 
          variables: {
            "input":{
              "input": metadata
            }
        }
        });
      }).then((result) => {
        const upload =  result.data.createDirectUpload.directUpload
        return directUpload(upload.url, JSON.parse(upload.headers), file).then(() =>{
          return attachImagePhoto({
            variables: {
              "input": {
                "blobId": upload.signedBlobId
              }
            }
          })
        })
      })
      console.log(data);
      return data;
    }
  }

  return (
    <form>
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