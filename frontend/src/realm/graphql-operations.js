import gql from "graphql-tag";

//TODO: Make these for table
export const GET_TABLES = gql`
  query {
    activeTables {
      _id
      gameType
      lastModified
      log
      name
      password
      players {
        id
        username
        position
      }
      rules {
        players
      }
      status
    }
  }
`;

// export const UPDATE_MOVIE = gql`
//   mutation UpdateMovie($query: MovieQueryInput!, $set: MovieUpdateInput!) {
//     updateOneMovie(query: $query, set: $set) {
//       _id
//       title
//     }
//   }
// `;
