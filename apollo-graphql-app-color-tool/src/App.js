import React from 'react';
import { useQuery, Query, useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { UnorderedList } from './components/UnorderedList';
import { ColorForm } from './components/ColorForm';
import { FlightsChart } from './components/FlightsChart';

const APP_QUERY = gql`
  query AltAppQuery {
    headerText @client 
    toggle @client
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

const TOGGLE_MUTATION = gql`
  mutation Toggle {
    toggle @client
  }
`;

const FLIGHTS_QUERY = gql`
  query FlightsQuery($offset: Int, $limit: Int) {
    flights(offset: $offset, limit: $limit) {
      id
      origin
      destination
      delayed
    }
  }
`;


export const App = () => {
  
  const { loading, data, error } = useQuery(APP_QUERY);

  const [ mutateAppendColor ] = useMutation(APPEND_COLOR_MUTATION);
  const [ mutateToggle ] = useMutation(TOGGLE_MUTATION);

  const pageLength = 10;

  const flightsQuery = useQuery(FLIGHTS_QUERY, {
    variables: {
      offset: 0,
      limit: pageLength,
    },
  });  

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

  const toggle = () => {
    mutateToggle({});
  };

  return <>
    <ToolHeader headerText={data.headerText.text} />
    <UnorderedList items={data.colors}>
      {(item) => item.id + ': ' + item.name + ' - ' + item.hexcode}
    </UnorderedList>
    <ColorForm buttonText="Add Color" onSubmitColor={appendColor} />
    <button type="button" onClick={toggle}>{data.toggle ? 'On' : 'Off'}</button>
    {!flightsQuery.loading && <FlightsChart flights={flightsQuery.data.flights} pageLength={10} onLoadMore={(page) => {
      console.log('fetchMore: ' + page * pageLength);
      return flightsQuery.fetchMore({
        variables: {
          offset: page * pageLength,
          limit: pageLength,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            flights: prev.flights.concat(fetchMoreResult.flights),
          };
        },
      });
    }} />}


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
