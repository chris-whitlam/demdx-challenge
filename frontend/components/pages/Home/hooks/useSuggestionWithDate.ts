import { gql, MutationHookOptions, useMutation } from '@apollo/client';

export const SUGGESTION_WITH_DATE = gql`
  mutation SuggestionWithDate($items: [String]) {
    getSuggestionWithDate(items: $items)
  }
`;

const useSuggestionWithDate = (options?: MutationHookOptions) => useMutation(SUGGESTION_WITH_DATE, options);

export default useSuggestionWithDate;
