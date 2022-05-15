import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
  credentials: 'omit',
});

export default client;
