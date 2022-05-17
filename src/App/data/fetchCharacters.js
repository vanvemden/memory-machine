// Returns a promise. That's all you need!
import { gql } from 'apollo-boost';

import client from './client';

const fetchCharacters = (randomPage) =>
  client.query({
    query: gql`
      query FetchCharacters {
        characters(page: ${randomPage}) {
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
    `,
  });

export default fetchCharacters;
