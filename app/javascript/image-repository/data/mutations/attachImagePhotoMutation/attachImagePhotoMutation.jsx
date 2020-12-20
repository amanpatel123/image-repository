import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "AttachImagePhotoMutation";

const ATTACH_IMAGE_PHOTO_MUTATION = gql`
  mutation ${name}($input: AttachImagePhotoInput!){
    attachImagePhoto(input: $input){
      user{
        id
      }
    }
  }
`

const useAttachImagePhotoMutation = () => useMutation(ATTACH_IMAGE_PHOTO_MUTATION);

export {useAttachImagePhotoMutation, ATTACH_IMAGE_PHOTO_MUTATION };