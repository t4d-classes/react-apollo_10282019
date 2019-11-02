import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';

import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const toggleQuery = gql`
  query Toggle {
    toggle
  }
`;

const cache = new InMemoryCache();

const httpLink1 = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
  fetch: (...params) => {
    console.log('calling http1 server');
    return fetch(...params);
  },
});

const httpLink2 = new HttpLink({
  uri: `http://localhost:3060/graphql`,
  fetch: (...params) => {
    console.log('calling http2 server');
    return fetch(...params);
  },
});

const prelink1 = new ApolloLink( (operation, forward) => {
  console.log('http link 1');
  console.log(operation);
  return forward(operation);
} );

const prelink2 = new ApolloLink( (operation, forward) => {
  console.log('http link 2');
  console.log(operation);
  const result = forward(operation);

  return result.map(v => {
    // post http link handler
    console.log('post http link 2 result');
    console.dir(v);
    return v;
  });

} );


const link = split(
  op => {
    console.log(op.getContext());
    return !op.operationName.startsWith('Alt');
  },
  ApolloLink.from([prelink1, httpLink1]),
  ApolloLink.from([prelink2, httpLink2]),
);


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
