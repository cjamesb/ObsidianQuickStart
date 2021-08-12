import { gql } from "./serverDeps.ts"

export const types = gql`
  type Movie {
    id: ID
    title: String
    releaseYear: Int
  }

  type Query {
    getMovie: Movie
  }
`;


export const resolvers = {
    Query: {
      getMovie: () => {
        return {
          id: "1",
          title: "Up",
          releaseYear: 2009
        };
      },
    },
  };

  