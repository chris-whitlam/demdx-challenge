import { gql } from "apollo-server";

const schema = gql`
  type Query {
    listOfSuggestions: [String]
  }
  type Mutation {
    getSuggestionWithDate(items: [String]): [String]
  }
`;

export default schema;