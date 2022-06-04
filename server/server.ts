import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      listOfSuggestions: [String]
    }
    type Mutation {
      getSuggestionWithDate(items: [String]): [String]
    }
  `,
  resolvers: {
    Query: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      listOfSuggestions: () => require('./list_suggestions-v7.0.0.json').data,
    },
    Mutation: {
      getSuggestionWithDate: (parent, args) => args.items.map((x: string) => `${x} - ${new Date().toISOString()}`),
    },
  },
});

// eslint-disable-next-line no-console
server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
