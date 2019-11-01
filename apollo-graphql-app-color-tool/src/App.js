import React from 'react';
import { useQuery, /* Query */ } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { UnorderedList } from './components/UnorderedList';

const APP_QUERY = gql`
  query AppQuery {
    colors {
      id
      name
      hexcode
    }
  }
`;


export const App = () => {
  
  const { loading, data, error } = useQuery(APP_QUERY);

  if (loading) {
    return <div>Loading!</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <>
    <ToolHeader headerText="Color Tool" />
    <UnorderedList items={data.colors}>
      {(item) => item.name + ' - ' + item.hexcode}
    </UnorderedList>
  </>;
};

// export const App = () => {
//   return <Query query={APP_QUERY}>
//     {({ loading, error, data}) => {
//       if (loading) {
//         return <div>Loading!</div>;
//       }
//       if (error) {
//         return <div>Error: {error}</div>;
//       }
//       return <div>{data.message}!!!</div>;
//     }}
//   </Query>;
// };
