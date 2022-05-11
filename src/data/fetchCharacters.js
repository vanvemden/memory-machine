// Returns a promise. That's all you need!
import { gql } from 'apollo-boost';

import client from './client';

const fetchCharacters = () =>
  client.query({
    query: gql`
      query FetchCharacters {
        # TODO Select characters from random page
        characters(page: 10) {
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
