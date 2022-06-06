import listOfSuggestions from './listOfSuggestions';
import getSuggestionWithDate from './getSuggestionWithDate';

const rootResolver = {
  Query: {
    listOfSuggestions
  },
  Mutation: {
    getSuggestionWithDate
  },
};

export default rootResolver;