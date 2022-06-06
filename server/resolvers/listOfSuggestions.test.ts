import { readFileSync } from 'fs';
import { join } from 'path';
import listOfSuggestions from './listOfSuggestions';

describe('listOfSuggestions', () => {
  it('should add current date onto input value', async () => {
    const dataFile = readFileSync(
      join(__dirname, '../data/list_suggestions-v7.0.0.json'), 
      {
        encoding: 'utf-8'
      }
    );
    const expectedSuggestions = JSON.parse(dataFile);
    const result = listOfSuggestions();

    expect(result).toStrictEqual(expectedSuggestions.data)
  })
})