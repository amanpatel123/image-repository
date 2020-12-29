import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "ImagesQuery";

const IMAGES_QUERY = gql`
  query ${name}($after: String) {
    images(first: 6, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          label
          url
          tags
          user {
            id
            fullName
          }
        }
      }
    }
  }
`;

const useImagesQuery = () => useQuery(IMAGES_QUERY);

export { useImagesQuery, IMAGES_QUERY };