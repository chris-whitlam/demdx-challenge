import { renderHook, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing';
import useFetchSuggestion from './useFetchSuggestions';
import { fetchSuggestionApolloMock, mockSuggestions } from '../../../../test/fixtures/apolloMocks';

const wrapper = ({ children, throwError = false }) => {
  const apolloMocks = [...fetchSuggestionApolloMock(mockSuggestions, throwError)];
  return <MockedProvider mocks={apolloMocks}>{children}</MockedProvider>
}

const render = (throwError = false) => renderHook(useFetchSuggestion, { wrapper: ({ children }) => wrapper({ children, throwError }) });

describe('useFetchSuggestion', () => {
  it('should fetch suggestions successfully', async () => {
    const { result: hook } = render();

    const loadingState = hook.current;

    expect(loadingState.loading).toBe(true);
    expect(loadingState.data).toBeUndefined();
    expect(loadingState.error).toBeUndefined();

    await waitFor(() => {
      expect(hook.current.loading).toBe(false);
      expect(hook.current.error).toBeUndefined();
      expect(hook.current.data).toStrictEqual({
        listOfSuggestions: mockSuggestions
      });
    })
  })

  it('should return error when error occurs', async () => {
    const { result: hook } = render(true);

    const loadingState = hook.current;

    expect(loadingState.loading).toBe(true);
    expect(loadingState.data).toBeUndefined();
    expect(loadingState.error).toBeUndefined();

    await waitFor(() => {
      expect(hook.current.loading).toBe(false);
      expect(hook.current.data).toBeUndefined();
      expect(hook.current.error).toEqual(new Error('An error occurred'));
    })
  })
})