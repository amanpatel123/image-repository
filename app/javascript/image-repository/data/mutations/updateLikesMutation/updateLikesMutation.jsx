import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "UpdateLikesMutation";

const UPDATE_LIKES_MUTATION = gql`
  mutation ${name}($input: UpdateLikesInput!) {
    updateLikes(input: $input) {
      success
    }
  }
`

const useUpdateLikesMutation = (options) => useMutation(UPDATE_LIKES_MUTATION, options);

export { useUpdateLikesMutation, UPDATE_LIKES_MUTATION };