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
      if (onCustomToggle) {
        try {
          await onCustomToggle(option, isChecked)
        } catch (error) {
          // If error with custom toggle don't update state
          // eslint-disable-next-line no-console
          return;
        }
      }

      if (isChecked) {
        setSelectedOptions((storedOptions) => [...storedOptions, option]);
      } else {
        deSelectItem(option);
      }


    },
    [setSelectedOptions],
  );

  return { selectedOptions, onToggle, deSelectItem };
}

export default useAutocomplete;