import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "CreateDirectUploadMutation";

const CREATE_DIRECT_UPLOAD_MUTATION = gql`
  mutation ${name}($input: CreateDirectUploadInput!) {
    createDirectUpload(input: $input) {
      directUpload {
      url
      signedBlobId
      blobId
      headers
      }
    }
  }
`

const useCreateDirectUploadMutation = () => useMutation(CREATE_DIRECT_UPLOAD_MUTATION);

export {useCreateDirectUploadMutation, CREATE_DIRECT_UPLOAD_MUTATION };