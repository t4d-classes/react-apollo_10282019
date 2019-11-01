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
