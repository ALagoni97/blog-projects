import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/index.js";
import { resolvers } from "./resolvers/index.js";
import { databaseConnection } from "./context/Database.js";
import { Context } from "./context/Context.js";
import { getToken } from "./context/Token.js";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) =>
    ({
      database: databaseConnection,
      token: getToken(req),
    } satisfies Context),
});

console.log(`🚀  Server ready at: ${url}`);
