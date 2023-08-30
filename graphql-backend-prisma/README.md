## How to create a GraphQL backend with Apollo and Prisma
In this post I am going to show how to create a GraphQL backend with Apollo Server and Prisma as our ORM. The goal of the post is to give some insights behind the scenes on how Prisma solves the N plus 1 problem and how to create a backend where we use basic authorization and using Apollo Server context to provide valuable information to each our resolvers. After this post you should be able to create a new GraphQL backend the proper way or change your existing backend to utilize these features. You can see the entire code in this post at this [link]()

### Setup
**Note**: If you just want to read about the different features and see code examples, then just to the next section [here](#resolvers-and-graphql-type-definitions)

You would need Docker installed as we are using a PostgreSQL database behind the scenes.
I would recommend you fork my repository because it has everything you need to set it up. 
This will allow you test these features out for yourself. This is how you would setup the project quickly:

1. Open the Github link
2. Fork the repository and clone it locally
3. Open the project and type `yarn install` or `npm install`
4. Type `docker-compose up -d`
5. Type `yarn prisma migrate dev` - This should create the correct tables and seed data in your database. If the seed data is not present - type `yarn prisma db seed`
6. Now start the server `yarn dev`
7. Now you can open the localhost Apollo Playground, where you can execute your queries. 

You now have a simple GraphQL backend with context properties and a way for you to experiment with new features and allow you to use the rest of this article as an inspiration to test how the different features work. 

### Context and authorization
We obviously want some context for our GraphQL resolvers so they can easily access any authentication state of the user trying to access the data and also gain access to the database. We do this by extending the BaseContext of Apollo Server. It is done where you instantiate your Apollo Server. 

```ts
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});
```
The Context interface is a type that you have specified what that type contains. This is your Context type so include everything that you want in your server. My example is going to include the database connection and a simple token. This token is being extracted from the req headers sent to the server. 

```ts
import { PrismaClient } from "@prisma/client";

export interface Context {
  database: PrismaClient;
  token?: string;
}
```
Then in the instantiating of the server we need to actually provide all the data to the context values:
```ts
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) =>
    ({
      database: databaseConnection,
      token: getToken(req),
    } satisfies Context),
});
```
The satisfies operator is used here to make Typescript aware of what context properties it should expect, which will help Typescript with autocompleting the context as expected. Without this, the `startStandaloneServer` would throw so you knew you needed something, but you wouldn't get autocompletion in the context object. 

### More complex queries and how Prisma handles them
### Eslint and CI
### Maybe: Pagination
### Maybe: Versioning and CI flow
### Maybe: Fragments
### Maybe: Handling errors
### Extending the backend with image upload and SSE
### Extending GraphQL schema with more complex queries