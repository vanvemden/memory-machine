import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  credentials: 'omit',
});

export default client;
