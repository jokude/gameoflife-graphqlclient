import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import Base from './components/Base';

const App = () => (
  <ApolloProvider client={client}>
    <Base />
  </ApolloProvider>
);

export default App;
