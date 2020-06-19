import { ApolloServer } from 'apollo-server';
import { schema } from './schema';

require('dotenv').config('../.env');
export const socrataAppToken = process.env.SOCRATA_APP_TOKEN as string;

if (!process.env.TEST) {
    const server = new ApolloServer({
        schema,
        engine: {
            experimental_schemaReporting: true,
        },
    });

    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 app running at ${url}`);
    });
}
