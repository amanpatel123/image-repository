import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import { useDeleteImageMutation } from '../../data/mutations';
import { MY_IMAGES_QUERY } from '../../data/queries';
import './imageGrid.css';

const ImageGrid = ({ edges, setSelectedImg, setDeletePayLoad}) => {
  const [deleteImage, { error: GQLerror }] = useDeleteImageMutation();

  const handleTrash = (e, image_id) => {
    e.stopPropagation()

    deleteImage({
      variables: {
        "input": { 
          "imageId": image_id
        }
      },
      refetchQueries: [
        {
          query: MY_IMAGES_QUERY,
        },
      ],
    }).then((response) => {
      const newPayload = response.data.deleteImage;
      setDeletePayLoad(newPayload);
    })
  } 
  return (
    <div className="img-grid">
        { edges && edges.map(({node}) => (
          <div className="img-wrap" key={node.id}
            onClick={() => {setSelectedImg(node)}}>
            <img src={node.url} alt="uploaded pic" />
            <div className="img-overlay">
              <div className="img-title">{node.label}</div>
              
              {setDeletePayLoad && <div className="img-trash-icon">
                <TrashFill onClick={(e) => handleTrash(e, node.id)}/>
              </div>}
            </div>
          </div>
        ))}
    </div>
  )
}

export { ImageGrid };