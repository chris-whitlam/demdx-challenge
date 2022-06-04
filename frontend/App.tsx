import { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Home, Error } from './components/pages';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background: #BEEF9E;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: min(80vw, 500px);
  align-self: center;

  @media only screen and (max-width: 650px) {
    width: 80vw;
  }
`;

const createApolloClient = () => new ApolloClient({
  uri: process.env.SERVER_URL || 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App: FC = () => {
  const client = createApolloClient();

  return (
    <>
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={Error}>
        <ApolloProvider client={client}>
          <PageContainer >
            <Home />
          </PageContainer>
        </ApolloProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
