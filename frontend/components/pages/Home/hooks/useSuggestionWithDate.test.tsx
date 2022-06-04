import { renderHook, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { suggestionWithDateApolloMock } from '../../../../test/fixtures/apolloMocks';
import useSuggestionWithDate from './useSuggestionWithDate';

const wrapper = ({ children, suggestion, throwError = false }) => {
  const apolloMocks = [...suggestionWithDateApolloMock(suggestion, throwError)];
  return <MockedProvider mocks={apolloMocks} addTypename={false}>{children}</MockedProvider>
}

const render = (suggestion: string, throwError = false) => renderHook(
  useSuggestionWithDate,
  {
    wrapper: ({ children }) => wrapper({ children, suggestion, throwError })
  }
);

describe('useSuggestionWithDate', () => {
  const mockSuggestion = 'mySuggestion';
  const currentDateTime = new Date().toISOString();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(currentDateTime))
  })

  afterAll(jest.useRealTimers);

  it('should complete successfully', async () => {
    const { result: hook } = render(mockSuggestion);

    const [initialCallback] = hook.current;

    act(() => {
      initialCallback({
        variables: {
          items: [mockSuggestion],
        },
      });
    })

    expect(hook.current[1].loading).toBe(true);
    expect(hook.current[1].error).toBeUndefined();
    expect(hook.current[1].data).toBeUndefined();

    await waitFor(() => {
      expect(hook.current[1].loading).toBe(false);
      expect(hook.current[1].error).toBeUndefined();
      expect(hook.current[1].data).toStrictEqual({
        getSuggestionWithDate: [
          `${mockSuggestion} - ${currentDateTime}`
        ]
      });
    })
  })

  it('should return error when error occurs', async () => {
    const { result: hook } = render(mockSuggestion, true);

    const [initialCallback] = hook.current;

    const callback = async () => initialCallback({
      variables: {
        items: [mockSuggestion]
      },
    })

    act(() => {
      expect(callback).rejects.toThrow();
    })

    expect(hook.current[1].loading).toBe(true);
    expect(hook.current[1].error).toBeUndefined();
    expect(hook.current[1].data).toBeUndefined();

    await waitFor(() => {
      expect(hook.current[1].loading).toBe(false);
      expect(hook.current[1].data).toBeUndefined();
      expect(hook.current[1].error).toEqual(new Error('An error occurred'))

    })
  })
})