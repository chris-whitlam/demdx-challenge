import getSuggestionWithDate from './getSuggestionWithDate';

describe('getSuggestionWithDate', () => {
  const parent = {}
  const currentDateTime = new Date().toISOString();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(currentDateTime))
  })

  afterAll(jest.useRealTimers);

  it('should add current date onto input value', () => {
    const suggestions = [
      'Bob',
      'Bobbins'
    ]

    const result = getSuggestionWithDate(parent, { items: suggestions } );

    expect(result).toStrictEqual([
      `${suggestions[0]} - ${currentDateTime}`,
      `${suggestions[1]} - ${currentDateTime}`
    ])
  })
})