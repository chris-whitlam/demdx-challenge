import { render as rtlRender, RenderResult, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import * as PagesModule from './components/pages';

jest.mock('./components/pages', () => ({
  ...jest.requireActual('./components/pages'),
  Home: jest.fn(() => <div data-test-id='home-page' />),
  Error: jest.fn(() => <div data-test-id='error-page' />)
}));

const render = () => rtlRender(
  <MockedProvider >
    <App />
  </MockedProvider>
)

describe('App Component', () => {
  afterAll(jest.restoreAllMocks)

  it('renders app correctly', async () => {
    const { getByTestId, queryByTestId } = render();

    await waitFor(() => {
      expect(getByTestId('home-page')).toBeInTheDocument();
      expect(queryByTestId('error-page')).not.toBeInTheDocument();
    })
  });

  it('renders error page when error occurs', async () => {
    let renderResult: any;

    jest.spyOn(PagesModule, 'Home').mockImplementation(() => {
      throw new Error('Test error');
    });

    // Silence the console
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const create = () => {
      renderResult = render();
    }

    expect(create).not.toThrow();

    const { getByTestId } = (renderResult as RenderResult);
    await waitFor(() => {
      expect(getByTestId('error-page')).toBeInTheDocument();
    })

    consoleSpy.mockRestore();
  });
})
