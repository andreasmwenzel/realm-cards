import gql from "graphql-tag";

//TODO: Make these for table
export const GET_TABLES = gql`
  query {
    activeTables {
      _id
      gameType
      rules {
        players
      }
      name
      rules {
        players
      }
      players {
        user {
          _id
          username
        }
      }
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
