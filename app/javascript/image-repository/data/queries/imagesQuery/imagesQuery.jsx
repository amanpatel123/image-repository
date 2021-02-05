import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const name = "ImagesQuery";

const IMAGES_QUERY = gql`
  query ${name}($after: String, $tags: String) {
    images(first: 6, tags: $tags, after: $after) {
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
          description
          totalLikes
          likeByCurrentUser
          user {
            id
            fullName
          }
        }
      }
    }
  }
`;

const useImagesQuery = (options) => useQuery(IMAGES_QUERY, options);

export { useImagesQuery, IMAGES_QUERY };