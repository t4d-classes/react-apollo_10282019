import React from 'react';
import { useQuery, Query, useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { UnorderedList } from './components/UnorderedList';
import { ColorForm } from './components/ColorForm';

const APP_QUERY = gql`
  query AppQuery {
    colors {
      id
      name
      hexcode
    }
  }
`;

const APPEND_COLOR_MUTATION = gql`
  mutation AppendColor($color: AppendColor) {
    appendColor(color: $color) {
      id
      name
      hexcode
    }
  }
`;


export const App = () => {
  
  const { loading, data, error } = useQuery(APP_QUERY);

  const [ mutateAppendColor ] = useMutation(APPEND_COLOR_MUTATION);

  const appendColor = color => {

    return mutateAppendColor({
      variables: {
        color: {
          ...color,
        },
      },
      // refetchQueries: [ { query: APP_QUERY } ],
      // optimisticResponse: {
      //   appendColor: {
      //     ...color,
      //     id: -1,
      //     __typename: 'Color',
      //   },
      // },
      // cache-first, notified of server changes, use a subscription
      update(store, { data: { appendColor: color }}) {
        const data = store.readQuery({ query: APP_QUERY });
        const newData = {
          ...data,
          colors: data.colors.concat(color),
        };
        store.writeQuery({ query: APP_QUERY, data: newData });
      }
    });

  };

  if (loading) return <div>Loading!</div>;
  if (error) return <div>Error: {error}</div>;

  return <>
    <ToolHeader headerText="Color Tool" />
    <UnorderedList items={data.colors}>
      {(item) => item.id + ': ' + item.name + ' - ' + item.hexcode}
    </UnorderedList>
    <ColorForm buttonText="Add Color" onSubmitColor={appendColor} />
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
