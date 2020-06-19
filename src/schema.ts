import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './resolvers/resolvers';

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
