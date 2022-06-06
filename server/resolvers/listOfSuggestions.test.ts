import listOfSuggestions from './listOfSuggestions';

describe('listOfSuggestions', () => {
  it('should add current date onto input value', async () => {
    const expectedSuggestions = require('../data/list_suggestions-v7.0.0.json').data
    const result = listOfSuggestions();

    expect(result).toStrictEqual(expectedSuggestions)
  })
})