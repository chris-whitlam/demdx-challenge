import { FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0.2em;
  
  :hover {
    background-color: #769e4a;
  }
`;

const Checkbox = styled.input`
  margin-right: 1em;
  transform: scale(1.5);
  accent-color: #2e4712;
`;

type OnToggleHandler = (value: string, isChecked: boolean) => void;

interface CheckboxDropdownOptionProps {
  onToggle: OnToggleHandler;
  value: string;
  checked: boolean;
}

const CheckboxDropdownOption: FC<CheckboxDropdownOptionProps> = ({ value, onToggle, checked }) => {
  const handleClick = () => {
    onToggle(value, !checked);
  };

  return (
    <Button data-test-id='checkbox-dropdown-option' key={value} data-name="dropdown-option" onClick={handleClick}>
      <Checkbox data-test-id='checkbox-dropdown-option--checkbox' name={value} type="checkbox" checked={checked} readOnly />
      <label data-test-id='checkbox-dropdown-option--label' htmlFor={value}>{value}</label>
    </Button>
  );
};

export default CheckboxDropdownOption;
