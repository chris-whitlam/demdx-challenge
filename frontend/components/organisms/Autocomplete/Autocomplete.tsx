import styled from 'styled-components';
import {
  ChangeEvent,
  FC,
  useState,
  useCallback,
  useRef,
  FocusEventHandler
} from 'react';
import { useDebounce } from 'react-use';

import { TextInput, CheckboxDropdownOption } from '../../atoms';

const AutocompleteContainer = styled.div`
  min-width: 100%;
`;

const DropdownOptions = styled.div`
  position: relative;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 100%;
  background-color: #90be72;
  filter: drop-shadow(0.25rem 0.25rem 0.15rem rgba(0, 0, 0, 0.2));
  
  ::-webkit-scrollbar {
    width: 20px;        
  }
  ::-webkit-scrollbar-track {
    background: #90be72;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);      
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    background: #2e4712; 
  }
`;

const DEFAULT_DELAY_MS = 400;

interface AutocompleteProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string, isChecked: boolean) => Promise<void>;
  placeholder?: string;
  delay?: number
}

const Autocomplete: FC<AutocompleteProps> = ({
  options,
  selectedOptions,
  onToggle,
  placeholder = '',
  delay = DEFAULT_DELAY_MS,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const userInput = event.target.value;
      setValue(userInput);

      if (!userInput) {
        setFilteredOptions([])
      }
    },
    [setValue]
  );

  useDebounce(() => {
    if (!value) {
      setFilteredOptions([])
      return;
    }

    setFilteredOptions(options.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) > -1,
    ));
  }, delay, [value])

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (event.relatedTarget?.attributes.getNamedItem('data-name')?.value === 'dropdown-option') {
      inputRef.current?.focus();
      return;
    }

    setFilteredOptions([]);
  };


  return (
    <AutocompleteContainer data-test-id='autocomplete-input' {...rest}>
      <TextInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DropdownOptions>
        {filteredOptions.map((option) => (
          <CheckboxDropdownOption
            key={option}
            value={option}
            checked={selectedOptions.includes(option)}
            onToggle={onToggle}
          />
        ))}
      </DropdownOptions>
    </AutocompleteContainer>
  );
};

export default Autocomplete;
