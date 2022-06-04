import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { mockSuggestions } from '../../../test/fixtures/apolloMocks';

import Autocomplete from './Autocomplete';

describe('Autocomplete', () => {
  it('should render correctly when loaded', async () => {
    const onToggle = jest.fn();
    const placeholder = 'MyAutocomplete';

    const { getByTestId, queryAllByTestId } = render(
      <Autocomplete
        options={mockSuggestions}
        selectedOptions={[]}
        onToggle={onToggle}
        placeholder={placeholder}
      />
    )

    expect(getByTestId('autocomplete-input')).toBeInTheDocument()
    expect(queryAllByTestId('checkbox-dropdown-option')).toHaveLength(0);
    const textInput = getByTestId('text-input');
    expect(textInput).toHaveValue('');
  })

  it('should show options related to input', async () => {
    const onToggle = jest.fn();
    const placeholder = 'ab';
    const value = 'Abdominal'

    const { getByTestId, queryAllByTestId } = render(
      <Autocomplete
        options={mockSuggestions}
        selectedOptions={[]}
        onToggle={onToggle}
        placeholder={placeholder}
      />
    )

    const textInput = getByTestId('text-input');
    act(() => {
      fireEvent.change(textInput, { target: { value } })
    })

    await waitFor(() => {
      expect(queryAllByTestId('checkbox-dropdown-option')).toHaveLength(2);
      const filteredOptions = queryAllByTestId('checkbox-dropdown-option');
      expect(filteredOptions[0]).toHaveTextContent('Abdominal pain');
      expect(filteredOptions[1]).toHaveTextContent('Abdominal swelling');
    })
  })

  it('should call onToggle when option selected', async () => {
    const onToggle = jest.fn();
    const placeholder = 'ab';
    const value = 'Abdominal'

    const { getByTestId, queryAllByTestId } = render(
      <Autocomplete
        options={mockSuggestions}
        selectedOptions={[]}
        onToggle={onToggle}
        placeholder={placeholder}
      />
    )

    act(() => {
      fireEvent.change(getByTestId('text-input'), { target: { value } })
    })

    await waitFor(() => {
      expect(queryAllByTestId('checkbox-dropdown-option')).toHaveLength(2);
    })

    const filteredOptions = queryAllByTestId('checkbox-dropdown-option');
    act(() => {
      fireEvent.click(filteredOptions[0]);
    })

    await waitFor(() => {
      expect(onToggle).toBeCalledWith('Abdominal pain', true);
    })
  })
});