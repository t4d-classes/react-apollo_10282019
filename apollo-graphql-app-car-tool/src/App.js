import * as React from 'react';
import { useQuery, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { CarTable } from './components/CarTable';

const APP_QUERY = gql`
  query AppQuery {
    message
    cars {
      id
      make
      model
      year
      color
      price
    }
  }
`;

// export const App = () => {
//   const { loading, data, error } = useQuery(APP_QUERY);
//   if (loading) {
//     return <div>Loading!</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return <div>{data.message}</div>;
// };

export const App = () => {
  return <Query query={APP_QUERY}>
    {({ loading, error, data}) => {
      if (loading) {
        return <div>Loading!</div>;
      }
      if (error) {
        return <div>Error: {error}</div>;
      }
      return <>
        <ToolHeader headerText="Car Tool" />
        <CarTable cars={data.cars} />
      </>;
    }}
  </Query>;
};
