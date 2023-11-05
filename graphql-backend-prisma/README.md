## How to create a GraphQL backend with Apollo and Prisma

In this post I am going to show how to create a GraphQL backend with Apollo Server and Prisma as our ORM. The goal of the post is to give some insights behind the scenes on how Prisma solves the N plus 1 problem and how to create a backend where we use basic authorization and using Apollo Server context to provide valuable information to each of our resolvers. After this post you should be able to create a new GraphQL backend with a strong foundation or change your existing backend to utilize these features. You can see the entire code in this post at this [link](https://github.com/ALagoni97/blog-projects/tree/main/graphql-backend-prisma)

This article also takes inspiration from a video by Prisma that explains the N plus 1 problem and how Prisma solves this really well - Check it out [here](https://www.youtube.com/watch?v=7oMfBGEdwsc&)

Inspiration is also taken from this article from Prisma themselves - Read it [here](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance)

### Setup

**Note**: If you just want to read about the different features and see code examples, then just jump to the next section [here](#resolvers-and-graphql-type-definitions)

You would need Docker installed as we are using a PostgreSQL database.
I would recommend you fork my repository because it has everything you need to set it up (If you are starting a new project that is).
This will allow you to test these features out for yourself. Follow these steps for a quick start:

1. Open the Github link - [click here](https://github.com/ALagoni97/blog-projects/tree/main/graphql-backend-prisma)
2. Fork the repository and clone it locally
3. Open the project and type `yarn install` or `npm install`
4. Type `docker-compose up -d`
5. Type `yarn prisma migrate dev` - This should create the correct tables and seed data in your database. If the seed data is not present, type `yarn prisma db seed`
6. Now start the server `yarn dev`
7. Now you can open the localhost Apollo Playground, where you can execute your queries.

You now have a simple GraphQL backend with context properties and a way for you to experiment with new features and allow you to use the rest of this article as an inspiration to test how the different features work.

### Context object

We obviously want some context for our GraphQL resolvers so they can easily access any authentication state of the user trying to access the data and also gain access to the database. We do this by extending the BaseContext of Apollo Server. It is done where you instantiate your Apollo Server.

```ts
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});
```

The Context interface is a type that include everything that you want in your servers context. Each resolver will have access to the context object. My example is going to include the database connection and a simple token. This token is being extracted from the req headers sent to the server.

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

As far as the token in your context I would in a real world example replace it with some kind of authentication of the user. Verifying that the query is infact authorized instead of just returning a string.

### Field resolvers in GraphQL

Let's take a look at how resolvers work in Apollo / GraphQL. A resolver in Apollo is basically just a function which sole purpose is to populate some data for the specific query that is being run. It can return any amount of data we define and it can return data from our own database or fetch from external API's.

We define them very simply by creating a function. This function will take the 4 arguments:

1. _parent_ - This is a value returned by the previous resolver. We will use this in field resolvers that need the context of the parent to be able to populate data. If it's a top-level field (As in the first resolver that the query meets) then this field is populated by rootValue function passes to Apollo Server's constructor.
2. _args_ - Arguments passes to the resolver. This can be filtering from the client or pagination or anything that get's passes as an argument to the resolver.
3. _context_ - This is the context value that we previously populated in the `startStandaloneServer`. We can populate this object with any data we want and is shared on all resolvers.
4. _info_ - Contains information about the operation's execution state, we won't really use this in this article. You can read more [here](https://github.com/graphql/graphql-js/blob/f851eba93167b04d6be1373ff27927b16352e202/src/type/definition.ts#L891-L902)

The next few examples I am going to show here is being run by a simple query:

```graphql
query Users($pagination: PaginationInput!, $filter: UserFilter) {
  users(pagination: $pagination, filter: $filter) {
    name
    posts {
      postId
      title
      comments {
        message
        commentId
      }
    }
  }
}
```

Here is the types for the queries:

```graphql
type Query {
  users(filter: UserFilter, pagination: PaginationInput!): [User!]
}

type User {
  userId: String!
  name: String!
  posts: [Post!]
}

input UserFilter {
  name: String
}

type Post {
  postId: String!
  title: String!
  comments: [Comment!]
}

type Comment {
  commentId: String!
  message: String!
}
```

We define the root resolver like this:

```ts
Query: {
    users: async (_, { pagination, filter }, context) => {
      const users = await context.database.user.findMany({
        where: {
          name: filter.name,
        },
        take: pagination.perPage,
      });
      return users;
    },
},
```

Here we are using Prisma as our ORM and trying to fetch all users with pagination.

**What about posts and comments?**
The posts and comments are going to be populated by their own field resolvers inside user resolver. We are doing this to seperate the business logic from each resolvers to their own. We will define the posts resolver like this:

```ts
User: {
    posts: async (parent, args, context) => {
      const post = await context.database.user
        .findUnique({
          where: {
            userId: parent.userId,
          },
        })
        .Posts();
      return post;
    },
},
```

Here we are using the parent argument being passed down from the top-level users resolver. We use that to get the userId from that user and return all their posts.

**Why findUnique and not findMany?**
It would probably make sense to do a `context.database.post.findMany()` instead of what we are doing here, but this is a constraint directly from Prisma. We need to utilize their built in DataLoader and for that we need to use `.findUnique()`. As of writing this article, they have not yet implemented batching to `findMany()`. See the issue [here](https://github.com/prisma/prisma/issues/1477)

For the comments of each post we do exactly the same as we did with the post:

```ts
Post: {
    comments: async (parent, args, context) => {
      const comments = await context.database.post
        .findUnique({
          where: {
            postId: parent.postId,
          },
        })
        .Comments({ take: 2 });
      return comments;
    },
},
```

Let's take a look at what's going on under the hood.

## The queries and Prisma under the hood

Let's take example in the earlier used query:

```graphql
query Users($pagination: PaginationInput!, $filter: UserFilter) {
  users(pagination: $pagination, filter: $filter) {
    name
    posts {
      postId
      title
      comments {
        message
        commentId
      }
    }
  }
}
```

GraphQL will resolve this into these steps:
![GraphQL query overview](https://raw.githubusercontent.com/ALagoni97/blog-projects/main/graphql-backend-prisma/assets/graphql-3.png)

It starts at the top-level query with fetching all the users. After that each user will fetch their posts and each post will fetch their comments. By writing the field resolvers with `findMany()` from Prisma it's clear to see the N plus 1 problem emerging.

```ts
User: {
    posts: async (parent, args, context) => {
      const post = await context.database.post.findMany({
        where: {
          userId: parent.userId,
        },
      });
      return post;
    },
},
```

If you run this with debug mode in Prisma you will see alot of select statements. If you follow the diagram above you can see each of these post / comment queries is their own SELECT statement.
![Select queries](https://raw.githubusercontent.com/ALagoni97/blog-projects/main/graphql-backend-prisma/assets/select-queries.png)
This is the famous N plus 1 problem because we need to resolve N plus 1 queries. You can guess that this is a major issue for a server because we are using more ressources than we need to. Just imagine what it looks like if we would add yet another child field to the query. For example adding another one-to-many relation to the comment. Suddenly it will be alot more queries to the database than what is needed.

And now if we take it back to using the correct syntax and using Prisma `findUnique()` method we will see a drastically better select statements:
![Select queries](https://raw.githubusercontent.com/ALagoni97/blog-projects/main/graphql-backend-prisma/assets/select-queries-findunique.png)

Behind the scenes Prisma is trying to batch these queries `findUnique()` together with a `WHERE IN()` statement meaning they are being batched together and not really run individually. That is the DataLoader built in Prisma working it's magic. If you want to learn more about this I suggest reading [this article](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance).

## What's next?

So far we have built a strong foundation to continue working with. Next I would personally add directives as it gives a lot of flexibility later when expanding your API with security. There is obviously more things to do with an API, such as metrics, error handling, caching, but this foundation is just the most important parts and then focused on N plus 1 issue, which is very important to address and understanding.

### Directives

Directives in GraphQL will allow you to make certain fields in your GraphQL types and endpoints authenticated to specific roles users have. This will make it possible to fine-tune security in your backend to make sure types and data is sealed tight and only available for users that have specific roles.

```graphql
type Query {
  users(filter: UserFilter, pagination: PaginationInput!): [User!]
    @auth(type: User)
}

type User {
  userId: String!
  name: String!
  posts: [Post!]
  unreadMessages: Int @auth(type: User)
}
```

You can add it to the root query or to specific fields like the `user.unreadMessages` field.
You can read more about it [here](https://www.apollographql.com/docs/apollo-server/schema/directives/).

I hope you gained something from this article and learned something about Prisma, Apollo and GraphQL!
