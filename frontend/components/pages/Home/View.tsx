import { FC, useState } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../atoms';
import { List } from '../../molecules';

import { Autocomplete, useAutocomplete } from '../../organisms';
import { useSuggestionWithDate } from './hooks';

const HomePageContainer = styled.div`
  width: 100%;
`;

const MutationResultContainer = styled.div`
  margin-top: 20px;
`;

interface ViewProps {
  symptoms: string[];
}

const View: FC<ViewProps> = ({ symptoms }) => {
  if (!symptoms.length) return null;

  const [showMutationResult, setShowMutationResult] = useState<boolean>(false);
  const [fetchSuggestionWithDate, { data, loading, error }] = useSuggestionWithDate();

  const { selectedOptions: selectedSymptoms, onToggle } = useAutocomplete({
    onToggle: async (option, isChecked) => {
      if (isChecked) {
        await fetchSuggestionWithDate({
          variables: {
            items: [option],
          }
        })
      }
      setShowMutationResult(isChecked);
    }
  });

  return (
    <HomePageContainer data-test-id="home-page">
      <PageTitle>My Symptoms</PageTitle>
      <List data-test-id='symptoms-list' listItems={selectedSymptoms} emptyListMessage="No symptoms selected" />
      <Autocomplete
        options={symptoms}
        selectedOptions={selectedSymptoms}
        onToggle={onToggle}
        placeholder='Enter your symptoms...'
        autoFocus
      />
      <MutationResultContainer data-test-id='mutation-result-container'>
        {loading && <span data-test-id='mutation-loading'>Loading...</span>}
        {data && showMutationResult && <span data-test-id='mutation-result'>{data.getSuggestionWithDate[0]}</span>}
        {error && <span data-test-id='mutation-error'>Something went wrong</span>}
      </MutationResultContainer>
    </HomePageContainer>
  )
};

export default View;
