import * as React from 'react';
import { useQuery, Query, useMutation, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { CarTable } from './components/CarTable';
import { CarForm } from './components/CarForm';

import { useCars } from './hooks/useCars';

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



export const App = () => {
  const { loading, data, error } = useQuery(APP_QUERY);

  const [ appendCar, deleteCar ] = useCars([
    { query: APP_QUERY },
  ]);

  if (loading) {
    return <div>Loading!</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <>
    <ToolHeader headerText="Car Tool" />
    <CarTable cars={data.cars} onDeleteCar={deleteCar} />
    <CarForm buttonText="Add Car" onSubmitCar={appendCar} />
  </>;
};

// export const App = () => {

//   return <Mutation mutation={DELETE_CAR_MUTATION}>
//     {(mutateDeleteCar)=> {

//       const deleteCar = carId => {

//         mutateDeleteCar({
//           variables: {
//             carId,
//           },
//           update(store, { data: { deleteCar: car }}) {
//             const data = store.readQuery({ query: APP_QUERY });
//             const newData = {
//               ...data,
//               cars: data.cars.filter(c => c.id !== car.id),
//             };
//             store.writeQuery({ query: APP_QUERY, data: newData });
//           }
//         })

//       }      

//       return <Mutation mutation={APPEND_CAR_MUTATION}>
//         {(mutateAppendCar)=> {

//           const appendCar = car => {

//             mutateAppendCar({
//               variables: {
//                 car: {
//                   ...car,
//                 }
//               },
//               refetchQueries: [ {query: APP_QUERY } ],
//             });

//           };

//           return <Query query={APP_QUERY}>
//             {({ loading, error, data}) => {
//               if (loading) {
//                 return <div>Loading!</div>;
//               }
//               if (error) {
//                 return <div>Error: {error}</div>;
//               }
//               return <>
//                 <ToolHeader headerText="Car Tool" />
//                 <CarTable cars={data.cars} onDeleteCar={deleteCar} />
//                 <CarForm buttonText="Add Car" onSubmitCar={appendCar} />
//               </>;
//             }}
//           </Query>

//         }}
//       </Mutation>;


//     }}

//   </Mutation>

// };
