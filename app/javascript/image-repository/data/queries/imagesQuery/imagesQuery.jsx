import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "ImagesQuery";

const IMAGES_QUERY = gql`
  query ${name} {
    images {
      id
      label
      user {
        id
        fullName
      }
    }
  }
`;

const useImagesQuery = () => useQuery(IMAGES_QUERY);

export { useImagesQuery, IMAGES_QUERY };