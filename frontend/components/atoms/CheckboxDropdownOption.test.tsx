import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import CheckboxDropdownOption from './CheckboxDropdownOption';

describe('CheckboxDropdownOption', () => {
  it('should render component correctly', async () => {
    const value = "MyOption";
    const checked = true;
    const onToggle = jest.fn();

    const { getByTestId } = render(
      <CheckboxDropdownOption
        value={value}
        checked={checked}
        onToggle={onToggle}
      />
    )

    expect(getByTestId('checkbox-dropdown-option')).toBeInTheDocument();
    expect(getByTestId('checkbox-dropdown-option--checkbox')).toBeChecked();
    expect(getByTestId('checkbox-dropdown-option--label')).toContainHTML(value);
  })

  it('should call onToggle with new inverted boolean', async () => {
    const value = "MyOption";
    const checked = false;
    const onToggle = jest.fn();

    const { getByTestId } = render(
      <CheckboxDropdownOption
        value={value}
        checked={checked}
        onToggle={onToggle}
      />
    )

    const button = getByTestId('checkbox-dropdown-option');
    act(() => {
      fireEvent.click(button);
    })

    expect(onToggle).toBeCalledWith(value, !checked)
  })
})