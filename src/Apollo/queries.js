import { gql } from 'apollo-boost';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
          type
          dimension
        }
        image
        created
      }
    }
  }
`;
