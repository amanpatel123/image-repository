import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "MyImagesQuery";

const MY_IMAGES_QUERY = gql`
  query ${name}($after: String) {
    myImages(first: 6, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          label
          url
          user {
            id
            fullName
          }
        }
      }
    }
  }
`;

const useMyImagesQuery = () => useQuery(MY_IMAGES_QUERY);

export { useMyImagesQuery, MY_IMAGES_QUERY };