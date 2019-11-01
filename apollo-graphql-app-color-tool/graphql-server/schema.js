export const typeDefs = `
  type Query {
    message: String
    colors: [Color]
    color(colorId: ID, colorName: String): Color
  }

  type Mutation {
    appendColor(color: AppendColor): Color
  }

  type Color {
    id: ID
    name: String
    hexcode: String
  }

  input AppendColor {
    name: String
    hexcode: String
  }

`;
