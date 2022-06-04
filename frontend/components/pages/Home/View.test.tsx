import { fireEvent, render as rtlRender, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { mockSuggestions, suggestionWithDateApolloMock } from '../../../test/fixtures/apolloMocks';
import View from './View';

interface RenderOptions {
  symptoms?: string[];
  suggestionWithDate?: string;
  throwError?: boolean;
}

const render = ({ symptoms = mockSuggestions, suggestionWithDate = '', throwError = false }: RenderOptions = { symptoms: mockSuggestions, suggestionWithDate: '', throwError: false }) => {
  const apolloMocks = [...suggestionWithDateApolloMock(suggestionWithDate, throwError)];

  return rtlRender(
    <MockedProvider mocks={apolloMocks}>
      <View symptoms={symptoms} />
    </MockedProvider>
  )
}

describe('Home -> View', () => {
  const currentDateTime = new Date().toISOString();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(currentDateTime))
  })

  afterAll(jest.useRealTimers);

  it('should render components correctly', async () => {
    const { getByTestId } = render();

    await waitFor(() => {
      expect(getByTestId('home-page')).toBeInTheDocument();
      expect(getByTestId('autocomplete-input')).toBeInTheDocument();
      expect(getByTestId('mutation-result-container')).toBeInTheDocument();
      expect(getByTestId('symptoms-list')).toBeInTheDocument();
    })
  })

  it('should not render if no symptoms passed', async () => {
    const { queryByTestId } = render({
      symptoms: []
    })

    await waitFor(() => {
      expect(queryByTestId('home-page')).not.toBeInTheDocument();
    })
  })

  it('should show mutation result and populate list when selected autocomplete option', async () => {
    const symptomToSelect = mockSuggestions[0];

    const { getByTestId, getAllByTestId, queryByTestId } = render({ suggestionWithDate: symptomToSelect })

    const inputField = await waitFor(() => getByTestId('text-input'));
    act(() => {
      fireEvent.change(inputField, { target: { value: symptomToSelect } })
    })

    const options = await waitFor(() => getAllByTestId('checkbox-dropdown-option'));
    act(() => {
      fireEvent.click(options[0]);
    })

    expect(queryByTestId('mutation-loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('mutation-result').innerHTML).toBe(`${symptomToSelect} - ${currentDateTime}`);
      expect(queryByTestId('mutation-error')).not.toBeInTheDocument();
      expect(queryByTestId('mutation-loading')).not.toBeInTheDocument();
      expect(getAllByTestId('list-item')[0].innerHTML).toBe(symptomToSelect);
    })
  })

  it('should show error message when mutation fails', async () => {
    const symptomToSelect = mockSuggestions[0];

    const { getByTestId, getAllByTestId, queryByTestId } = render({ throwError: true })

    const inputField = await waitFor(() => getByTestId('text-input'));
    act(() => {
      fireEvent.change(inputField, { target: { value: symptomToSelect } })
    })

    const options = await waitFor(() => getAllByTestId('checkbox-dropdown-option'));
    act(() => {
      fireEvent.click(options[0]);
    })

    expect(queryByTestId('mutation-loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('mutation-error')).toBeInTheDocument();
      expect(getByTestId('empty-list-message')).toBeInTheDocument()
      expect(queryByTestId('mutation-loading')).not.toBeInTheDocument();
      expect(queryByTestId('mutation-result')).not.toBeInTheDocument();
    })
  })

  it('should remove mutation result and list item when option deselected', async () => {
    const symptomToSelect = mockSuggestions[0];

    const { getByTestId, getAllByTestId, queryAllByTestId, queryByTestId } = render()

    const inputField = await waitFor(() => getByTestId('text-input'));
    act(() => {
      fireEvent.change(inputField, { target: { value: symptomToSelect } })
    })

    const options = await waitFor(() => getAllByTestId('checkbox-dropdown-option'));
    act(() => {
      fireEvent.click(options[0]);
    })

    await waitFor(() => queryByTestId('mutation-result'));

    act(() => {
      fireEvent.click(options[0]);
    })

    await waitFor(() => {
      expect(queryByTestId('mutation-result')).not.toBeInTheDocument();
      expect(queryAllByTestId('list-item')?.length).toBe(0);
    });
  })
})