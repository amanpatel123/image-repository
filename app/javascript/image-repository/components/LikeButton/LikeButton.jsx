import React, { useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useUpdateLikesMutation, UPDATE_LIKES_MUTATION } from '../../data/mutations';
import { useImagesQuery, IMAGES_QUERY } from '../../data/queries';



const LikeButton = ({likedByCurrentUser, node}) => {
  const [color, setColor] = useState(likedByCurrentUser ? "blue" : "grey")
  const [ updateLikes ] = useUpdateLikesMutation();
  
  const handleThumbsUp = (e, image_id) => {
    e.stopPropagation()
    if(color === "blue") {
      updateLikes({
        variables: {
          "input": { 
            "imageId": image_id,
            "like": false
          }
        }
      }).then((response) => {
        if(response.data.updateLikes.success) {
          setColor("grey");
        }
      })
    } else {
      updateLikes({
        variables: {
          "input": { 
            "imageId": image_id,
            "like": true
          }
        }
      }).then((response) => {
        if(response.data.updateLikes.success) {
          setColor("blue");
        }
      })
    }
  } 

  return (
    <div className="img-thumbs-up">
      <FontAwesomeIcon icon={faThumbsUp} color={color} onClick={(e) => handleThumbsUp(e, node.id)}/>
    </div>
  )
}

export { LikeButton };