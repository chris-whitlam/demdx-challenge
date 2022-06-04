import { FC } from 'react';

import View from './View';
import { useFetchSuggestions } from './hooks';
import { Spinner } from '../../atoms';
import { Error } from "../Error";

const DataProvider: FC = () => {
  const { loading, error, data: suggestions } = useFetchSuggestions();

  if (loading) {
    return <Spinner />;
  }

  if (error || !suggestions.listOfSuggestions.length) {
    return <Error />
  }


  return <View symptoms={suggestions.listOfSuggestions} />;
};

export default DataProvider;
