import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    colors: async (_1, _2, { restURL }) => {
      const res = await fetch(restURL + '/colors');
      const colors = await res.json();
      return colors;
    },
    color: async (_, { colorId, colorName }, { restURL }) => {
      if (colorName) {
        const res = await fetch(restURL + '/colors?name=' + colorName);
        const color = await res.json();
        return color[0];
      } else {
        const res = await fetch(restURL + '/colors/' + colorId);
        const color = await res.json();
        return color;
      }
    },
    authors: async (_1, _2, context) => {
      const res = await fetch(`${context.restURL}/authors`);
      return await res.json();
    },
    books: async (_1, _2, context) => {
      const res = await fetch(`${context.restURL}/books`);
      return await res.json();
    },
    contacts: () => {

      return [
        { id: 1, firstName: 'Bob', lastName: 'Smith', ssn: '111-111-1111' },
        { id: 1, firstName: 'Lisa', lastName: 'Timmons', companyName: 'Acme, Inc.', ein: '12-1212122' },
      ];

    },
    people: () => {

      return [
        { id: 1, firstName: 'Bob', lastName: 'Smith', ssn: '111-111-1111' },
        { id: 1, firstName: 'Lisa', lastName: 'Timmons', companyName: 'Acme, Inc.', ein: '12-1212122' },
      ];

    },
    flights: async (_, { offset, limit }, { airlineRestUrl }) => {
      console.log('offset:' , offset);
      const res = await fetch(`${airlineRestUrl}/flights?_start=${offset}&_limit=${limit}`);
      const flights = await res.json();
      return flights;
    },
  },
  Flight: {
    id: ({ flNum }) => flNum,
    origin: ({ origin }) => origin,
    destination: ({ dest }) => dest,
    scheduledDepartureTime: ({ crsDepTime }) => crsDepTime,
    actualDepartureTime: ({ depTime }) => depTime,
    delayed: ({ crsDepTime, depTime }) => depTime - crsDepTime,
  },  
  Contact: {
    __resolveType: (obj) => {
      if (obj.ssn) {
        return 'Employee';
      }
      if (obj.ein) {
        return 'Vendor';
      }
      return null;
    }
  },
  People: {
    __resolveType: (obj) => {
      if (obj.ssn) {
        return 'Employee';
      }
      if (obj.ein) {
        return 'Vendor';
      }
      return null;
    }
  },
  Book: {
    author: async ({ authorId }, _, { restURL }) => {
      const res = await fetch(`${restURL}/authors/${encodeURIComponent(authorId)}`);
      return await res.json();
    },
  },
  Author: {
    // default resolver
    // firstName: (author) => author.firstName,
    fullName: (author) => {
      return author.firstName + ' ' + author.lastName;
    },
    bookCount: async (author, _, { restURL }) => {
      const res = await fetch(`${restURL}/books?authorId=${encodeURIComponent(author.id)}`);
      const books = await res.json();
      return books.length;
    },
    books: async (author, _, { restURL }) => {
      const res = await fetch(`${restURL}/books?authorId=${encodeURIComponent(author.id)}`);
      return await res.json();
    },
  },  
  Mutation: {
    appendColor: async (_, { color }, { restURL }) => {

      const res = await fetch(restURL + '/colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json ' },
        body: JSON.stringify(color),
      });

      const addedColor = await res.json();

      return addedColor;
    },
  }
};
