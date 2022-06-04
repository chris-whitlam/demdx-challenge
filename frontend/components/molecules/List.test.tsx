import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const emptyListMessage = 'List is empty';
  const expectedListItems = Array.from({ length: 5 }, (v, i) => `Item ${i}`)

  it('should render list items correctly', async () => {
    const { getAllByTestId, queryByTestId } = render(
      <List
        listItems={expectedListItems}
      />
    )

    const listItems = getAllByTestId('list-item')
    expect(queryByTestId('empty-list-message')).not.toBeInTheDocument()
    expect(listItems).toHaveLength(expectedListItems.length);
    listItems.forEach((listItem, index) => {
      expect(listItem).toHaveTextContent(expectedListItems[index])
    })
  })

  it('should render empty list message when no list items', async () => {
    const { queryAllByTestId, getByTestId } = render(
      <List
        listItems={[]}
        emptyListMessage={emptyListMessage}
      />
    )

    expect(queryAllByTestId('list-item')).toHaveLength(0);
    expect(getByTestId('empty-list-message')).toHaveTextContent(emptyListMessage)
  })
});