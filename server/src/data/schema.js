import { resolvers } from './resolvers';
import { typeDefs } from '../../../src/typeDefs';
import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
