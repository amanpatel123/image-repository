import React, { useEffect, useState } from 'react';
import { useCreateDirectUploadMutation } from '../../data/mutations';
import { useAttachImagePhotoMutation } from '../../data/mutations';
import { useMyImagesQuery , MY_IMAGES_QUERY } from '../../data/queries';
import { getFileMetadata } from '../../helpers/getFileMetadata';
import { directUpload } from '../../helpers/directUpload';

import { ProgressBar } from '../ProgressBar';
import "./uploadImage.css";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [createDirectUpload, { loading: directUploadMutationLoading }] = useCreateDirectUploadMutation();
  const [attachImagePhoto ] = useAttachImagePhotoMutation({
    update(cache, { data }) {
      const newImageDataFromResponse = data?.attachImagePhoto.image;
      const existingImages = cache.readQuery({
        query: MY_IMAGES_QUERY,
      });

      if(existingImages && newImageDataFromResponse) {
        console.log(existingImages);
        cache.writeQuery({
          query: MY_IMAGES_QUERY,
          data: {
            myImages: [
              ...existingImages?.myImages,
              newImageDataFromResponse,
            ],
          },
        });
      }
      const updatedImages = cache.readQuery({
        query: MY_IMAGES_QUERY,
      });
      console.log(updatedImages);
    }
  });


  useEffect(()=>{
    metadata();
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
        });
      })
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