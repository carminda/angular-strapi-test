import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      Title
      Description
    }
  }
`;

export default CATEGORIES_QUERY;
