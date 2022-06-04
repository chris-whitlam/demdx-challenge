import { gql, MutationHookOptions, useQuery } from '@apollo/client';

export const FETCH_SUGGESTIONS = gql`
  query fetchSuggestions {
    listOfSuggestions
  }
`;

const useFetchSuggestions = (options?: MutationHookOptions) => useQuery(FETCH_SUGGESTIONS, options);

export default useFetchSuggestions;
