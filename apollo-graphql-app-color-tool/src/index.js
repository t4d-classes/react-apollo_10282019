import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const toggleQuery = gql`
  query Toggle {
    toggle
  }
`;

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const client = new ApolloClient({
  link, cache,
  connectToDevTools: true,
  resolvers: {
    // Query: {
    //   headerText: () => 'Color Tool!!!',
    // },
    Mutation: {
      toggle: (_1, _2, { cache }) => {

        const data = cache.readQuery({ query: toggleQuery });

        // cache.writeData({
        //   data: {
        //     toggle: !data.toggle,
        //   }
        // });

        cache.writeQuery({ query: toggleQuery, data: { toggle: !data.toggle } });

      },
    },
  },
});

cache.writeData({
  data: {
    headerText: 'Test',
    toggle: true,
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
