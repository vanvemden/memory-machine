import { gql } from 'apollo-boost';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    # TODO Select characters from random page
    characters(page: 1) {
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
