import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "UserQuery";

const USER_QUERY = gql`
  query User($input:ID!){
    user(userId: $input){
      id
      email
      images {
        id
        label
      }
      fullName
    }
  }
`;

const useUserQuery = () => useQuery(USER_QUERY);

export { useUserQuery, USER_QUERY };