import { useCallback, useState } from "react";

export interface AutocompleteOptions {
  onToggle?: (option: string, isChecked: boolean) => Promise<void>;
}

const useAutocomplete = ({ onToggle: onCustomToggle }: AutocompleteOptions) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const deSelectItem = (option: string) => {
    setSelectedOptions((storedOptions) => storedOptions.filter((storedOption) => storedOption !== option));
  };

  const onToggle = useCallback(
    async (option: string, isChecked: boolean) => {

      if (isChecked) {
        setSelectedOptions((storedOptions) => [...storedOptions, option]);
      } else {
        deSelectItem(option);
      }

      if (onCustomToggle) {
        await onCustomToggle(option, isChecked)
      }
    },
    [setSelectedOptions],
  );

  return { selectedOptions, onToggle, deSelectItem };
}

export default useAutocomplete;