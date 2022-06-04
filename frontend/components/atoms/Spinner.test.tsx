import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Spinner />);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  })
})