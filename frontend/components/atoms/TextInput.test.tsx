import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';


import TextInput from './TextInput';

describe('Text Input', () => {
  const value = 'MyValue';

  it('should render correctly', async () => {
    const placeholder = 'MyPlaceholder';
    const { getByTestId } = render(
      <TextInput
        value={value}
        placeholder={placeholder}
      />
    );

    const textInput = getByTestId('text-input');
    expect(textInput).toBeInTheDocument();
    expect(textInput.getAttribute('value')).toBe(value);
    expect(textInput.getAttribute('placeholder')).toBe(placeholder);
  })

  it('should call onChange when value changes', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <TextInput value="input" onChange={onChange} />
    );

    const textInput = getByTestId('text-input');
    act(() => {
      fireEvent.change(textInput, { target: { value } })
    })

    expect(onChange).toBeCalled();
  })

  it('should call onBlur when focus lost', async () => {
    const onBlur = jest.fn();

    const { getByTestId } = render(
      <>
        <TextInput value="input" onBlur={onBlur} />
        <input data-test-id='focus-target' />
      </>
    );

    const textInput = await waitFor(() => getByTestId('text-input'));
    act(() => {
      textInput.focus();
    })

    await waitFor(() => {
      expect(textInput).toHaveFocus()
    })

    const focusTarget = getByTestId('focus-target');
    act(() => {
      focusTarget.focus();
    })

    await waitFor(() => {
      expect(focusTarget).toHaveFocus()
    })

    expect(onBlur).toBeCalled();
  })
})