import { renderHook, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import useAutocomplete, { AutocompleteOptions } from './useAutocomplete';

const render = ({ onToggle }: AutocompleteOptions = {}) => renderHook(() => useAutocomplete({ onToggle }));

describe('useAutocomplete', () => {
  it('should return selectedOptions and onToggle', async () => {
    const { result: hook } = render();

    const { selectedOptions, onToggle } = hook.current;

    expect(selectedOptions).toStrictEqual([]);
    expect(onToggle).toBeDefined();
  })

  it('should add option to selectedOptions when isChecked=true calling onToggle', async () => {
    const option = 'MyOption';
    const onCustomToggle = jest.fn();
    const { result: hook } = render({ onToggle: onCustomToggle });

    const { onToggle } = hook.current;

    act(() => {
      onToggle(option, true);
    })

    await waitFor(() => {
      expect(hook.current.selectedOptions).toContain(option);
      expect(onCustomToggle).toBeCalled();
    })
  })

  it('should remove option from selectedOptions when isChecked=false calling onToggle', async () => {
    const option = 'MyOption';
    const onCustomToggle = jest.fn();
    const { result: hook } = render({ onToggle: onCustomToggle });

    const { onToggle } = hook.current;

    act(() => {
      onToggle(option, true);
    })

    await waitFor(() => {
      expect(hook.current.selectedOptions).toContain(option);
      expect(onCustomToggle).toBeCalled();
    })

    act(() => {
      onToggle(option, false);
    })

    await waitFor(() => {
      expect(hook.current.selectedOptions).not.toContain(option);
      expect(onCustomToggle).toBeCalled();
    })
  })
})