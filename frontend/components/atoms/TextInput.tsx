import styled from 'styled-components';

import { forwardRef } from 'react';

const Input = styled.input`
  height: 3rem;
  margin: 1em 0 0 0;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.5rem;
  border-radius: 4px;
  filter: drop-shadow(0.25rem 0.25rem 0.15rem rgba(0, 0, 0, 0.2));
  border-width: 0;

  :focus {
    outline: none;
  }
`;

interface TextInputProps {
  value?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((
  {
    value = '',
    placeholder = '',
    autoFocus = false,
    onChange,
    onBlur
  },
  ref
) => <Input
    data-test-id='text-input'
    ref={ref}
    type="text"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    readOnly={Boolean(value && !onChange)}
    placeholder={placeholder}
    autoFocus={autoFocus}
  />
)


export default TextInput;
