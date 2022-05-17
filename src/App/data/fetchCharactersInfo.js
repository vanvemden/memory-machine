// Returns a promise. That's all you need!
import { gql } from 'apollo-boost';

import client from './client';

const fetchCharactersInfo = () =>
  client.query({
    query: gql`
      query FetchCharactersInfo {
        characters {
          info {
            count
            pages
          }
        }
      }
    `,
  });

export default fetchCharactersInfo;
