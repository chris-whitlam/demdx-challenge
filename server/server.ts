import { ApolloServer } from 'apollo-server';
import rootResolver from './resolvers/rootResolver';
import schema from './graphql/schema';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: rootResolver,
});

// eslint-disable-next-line no-console
server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
