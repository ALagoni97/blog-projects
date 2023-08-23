## Apollo Server 4 / GraphQL / Prisma
In the article i am going to go through step-by-step how i would create a fundamental start to a dynamic and strong GraphQL backend utilizing Prisma as ORM for our database. GraphQL is a great way to create a robust and strong API for your applications and with Apollo Server we can utilize their strong foundation for our server to built upon. We will use Prisma as our ORM as it's a great choice for PostgreSQL databases that will allow us to write quick queries. It will also help us solve the famous n-1 problem for GraphQL API's. As you will see my do in this article I am going to create an actual REST API as well and attach the GraphQL API as a middleware for one of the requests. This makes it so we can create normal Node / Express endpoints to our backend to support various other features that in GraphQL would be problematic. This could be features such as SSE or image upload (Can be done in GraphQL but will require changes to backend).



Let's go over why we choose Prisma as our ORM and the N plus 1 problem immediately:

#### Why Prisma and what is N+1 GraphQL issue:
So GraphQL 

### Setup
I have gone and followed Apollo Server 4 quickstart setup where we get a initial setup from Apollo Server 4 with Typescript support. 
### Resolvers and GraphQL Type definitions
### Context and authorization
### More complex queries and how Prisma handles them
### Maybe: Pagination
### Maybe: Versioning and CI flow
### Maybe: Fragments
### Maybe: Handling errors
### Extending the backend with image upload and SSE
### Extending GraphQL schema with more complex queries