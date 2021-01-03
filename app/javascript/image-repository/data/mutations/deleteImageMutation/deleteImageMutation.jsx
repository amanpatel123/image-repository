import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "DeleteImageMutation";

const DELETE_IMAGE_MUTATION = gql`
  mutation ${name}($input: DeleteInput!){
    deleteImage(input: $input) {
      error
      message
    }
  }
`

const useDeleteImageMutation = (options) => useMutation(DELETE_IMAGE_MUTATION, options);

export {useDeleteImageMutation, DELETE_IMAGE_MUTATION };