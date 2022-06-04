import { render as rtlRender, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DataProvider from './DataProvider';
import { fetchSuggestionApolloMock, mockSuggestions } from '../../../test/fixtures/apolloMocks';
import View from './View';

jest.mock('./View', () => ({
  default: jest.fn(() => <div data-test-id='home-page' />)
}));

const render = ({ suggestions = mockSuggestions } = { suggestions: mockSuggestions }) => {
  const apolloMocks = [...fetchSuggestionApolloMock(suggestions)];

  return rtlRender(
    <MockedProvider mocks={apolloMocks}>
      <DataProvider />
    </MockedProvider>
  )
}

fdescribe('Home -> DataProvider', () => {
  it('should render view and pass correct data', async () => {
    const { getByTestId, queryByTestId } = render();

    await waitFor(() => {
      expect(getByTestId('home-page')).toBeInTheDocument()
      expect(queryByTestId('error-page')).not.toBeInTheDocument()
    })
    expect(View).toBeCalledWith(
      expect.objectContaining({
        symptoms: mockSuggestions
      }),
      {}
    );
  })

  it('should render loading spinner when loading', async () => {
    const { getByTestId } = render();
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  })

  it('should throw error no suggestions returned', async () => {
    const { getByTestId, queryByTestId } = render({ suggestions: [] });
    await waitFor(() => {
      expect(getByTestId('error-page')).toBeInTheDocument()
      expect(queryByTestId('home-page')).not.toBeInTheDocument()
    })
  })
})