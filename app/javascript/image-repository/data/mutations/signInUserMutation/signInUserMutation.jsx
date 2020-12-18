import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "SignInUserMutation";

const SIGN_IN_USER_MUTATION = gql`
  mutation ${name}($input: SignInUserInput!){
    userSignIn(input: $input) {
      token
      message
      user{
        id
        fullName
        email
      }
    }
  }
`

const useSignInUserMutation = () => useMutation(SIGN_IN_USER_MUTATION);

export { useMutation, useSignInUserMutation, SIGN_IN_USER_MUTATION };