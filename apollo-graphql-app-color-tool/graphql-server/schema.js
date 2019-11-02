export const typeDefs = `
  type Query {
    message: String
    colors: [Color]
    color(colorId: ID, colorName: String): Color
    authors: [Author]
    books: [Book]
    contacts: [Contact]
    people: [People]
    flights(offset: Int, limit: Int): [Flight]
  }

  type Mutation {
    appendColor(color: AppendColor): Color
  }

  interface Contact {
    id: Int
    firstName: String
    lastName: String
  }

  type Employee implements Contact {
    id: Int
    firstName: String
    lastName: String
    ssn: String
  }

  type Vendor implements Contact  {
    id: Int
    firstName: String
    lastName: String
    companyName: String
    ein: String    
  }

  union People = Employee | Vendor  

  type Flight {
    id: ID
    origin: String
    destination: String
    scheduledDepartureTime: Int
    actualDepartureTime: Int
    delayed: Int
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

  type Author {
    id: Int
    firstName: String
    lastName: String
    phoneNumber: String
    fullName: String
    bookCount: Int
    books: [Book]
  }

  type Book {
    id: Int
    isbn: String
    title: String
    authorId: Int
    author: Author
    category: String
    price: Float
    quantity: Int
  }

`;
