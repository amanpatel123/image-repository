import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';

import { useCreateDirectUploadMutation } from '../../../data/mutations';
import { useAttachImagePhotoMutation } from '../../../data/mutations';
import { getFileMetadata } from '../../../helpers/getFileMetadata';
import { directUpload } from '../../../helpers/directUpload';
import './modal.css';

const Modal = ({file, setFile, setNeedRefresh}) => {
  const [label, setLabel] = useState(file.name.replaceAll("-", " ").split(".").slice(0, -1).join('.'));
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  

  const [createDirectUpload, { loading: directUploadMutationLoading }] = useCreateDirectUploadMutation();
  const [attachImagePhoto, { error }] = useAttachImagePhotoMutation();

  console.log(error);
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop_uploadImage')) {
      setFile(null);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    metadata();
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
        console.log(upload);
        return directUpload(upload.url, JSON.parse(upload.headers), file).then(() =>{
          return attachImagePhoto({
            variables: {
              "input": {
                "input": {
                  "blobId": upload.signedBlobId,
                  "label": label,
                  "tags": tags, 
                  "description": description
                }
              }
            }
          })
        }).then(() => {
          setNeedRefresh(true);
          setFile(null);
        })
      })
      return data;
    }
  }

  return (
    <motion.div className="backdrop_uploadImage" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="form__container" >
        <form className="modal_form" onSubmit={handleSubmit}>
          <h1>
            {file.name}
          </h1>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Label</span>
            </div>
            <input type="text" className="form-control" value={label} aria-label="label" aria-describedby="basic-addon1"
              onChange={(e)=>{setLabel(e.target.value)}}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Tags(eg, Holiday, Christmas, ..)</span>
            </div>
            <input type="text" className="form-control" value={tags} aria-label="Tags" aria-describedby="basic-addon1"
              onChange={(e)=>{setTags(e.target.value)}}
            />
          </div>


          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Description</span>
            </div>
            <textarea className="form-control text-box-height" value={description} aria-label="With textarea"
               onChange={(e)=>{setDescription(e.target.value)}}
            >
            </textarea>
          </div>

          <div className="upload_button">
            <Button type="submit">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export { Modal };