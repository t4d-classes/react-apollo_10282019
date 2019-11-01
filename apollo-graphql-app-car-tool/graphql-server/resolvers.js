import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    cars: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/cars`).then(res => res.json());
    },
  },
  Mutation: {
    appendCar: (_, { car }, { restURL }) => {

      console.log(car);
      
      return fetch(`${restURL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      }).then(res => res.json());
    }
  }
};
