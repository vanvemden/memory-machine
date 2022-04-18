import { useQuery } from '@apollo/react-hooks';
import { GET_CHARACTERS } from '../Apollo/queries';

import './App.css';
import CardGrid from './CardGrid';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { createCardSet, shuffleCardSet } from './helpers';

function App() {
  // Query client set in app's ApolloProvider wrapper
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  const cardSet = createCardSet(data.characters.results);
  const shuffledCardSet = shuffleCardSet(cardSet);

  return <CardGrid cards={shuffledCardSet} />;
}

export default App;
