import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "MyImagesQuery";

const MY_IMAGES_QUERY = gql`
  query ${name} {
    myImages {
      id
      label
      user {
        id
        fullName
      }
      url
    }
  }
`;

const useMyImagesQuery = () => useQuery(MY_IMAGES_QUERY);

export { useMyImagesQuery, MY_IMAGES_QUERY };