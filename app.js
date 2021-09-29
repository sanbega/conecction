const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express =  require('express');
const http = require('http');
const db = require('./knex')

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
     app,
     path: '/'
  });

  await db.raw("SELECT 1")

  console.log(`🚀 Database connected`);

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
//schema 
const typeDefs = gql`
  type Query {
    hello: String
    hello2: [Order]
    num_orden: Int 
  }

  type Order {
    num_orden: ID!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world',
    hello2: () => db.select('num_orden').table('ordenes_annarlab')
  },
};

startApolloServer(typeDefs, resolvers)