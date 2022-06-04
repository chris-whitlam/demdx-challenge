import { render } from '@testing-library/react';

import { PageTitle } from './Heading';

describe('Heading', () => {
  it('should render page title correctly', () => {
    const mockTitleText = "MyPage";
    const { getByText } = render(<PageTitle>{mockTitleText}</PageTitle>)

    expect(getByText(mockTitleText)).toBeInTheDocument();
  })
})