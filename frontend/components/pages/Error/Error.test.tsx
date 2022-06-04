import { render as rtlRender, waitFor } from '@testing-library/react';
import Error from './Error';

const render = () => rtlRender(<Error />)

describe('Error page', () => {
  it('should render components correctly', async () => {
    const { getByTestId } = render();

    await waitFor(() => {
      expect(getByTestId('error-page')).toBeInTheDocument();
      expect(getByTestId('page-title')).toBeInTheDocument();
    })
  })
})