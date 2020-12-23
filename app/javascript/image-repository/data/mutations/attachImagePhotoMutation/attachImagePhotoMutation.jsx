import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "AttachImagePhotoMutation";

const ATTACH_IMAGE_PHOTO_MUTATION = gql`
  mutation ${name}($input: AttachImagePhotoInput!){
    attachImagePhoto(input: $input){
      image {
        id
        label
        url
        user {
          id
        }
      }
    }
  }
`

const useAttachImagePhotoMutation = (options) => useMutation(ATTACH_IMAGE_PHOTO_MUTATION, options);

export {useAttachImagePhotoMutation, ATTACH_IMAGE_PHOTO_MUTATION };