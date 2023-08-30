import { GQLResolvers } from "../__generated__/resolvers-types";
import { databaseConnection } from "../context/Database";

export const UserResolver: GQLResolvers = {
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
};

/* 
Current include way
*/

// export const UserResolver: GQLResolvers = {
//   Query: {
//     users: async (_, { pagination }, context) => {
//       const users = await context.database.user.findMany({
//         include: {
//           Posts: {
//             include: {
//               Comments: true,
//             },
//           },
//         },
//         take: pagination.perPage,
//       });
//       return users.map((user) => ({
//         ...user,
//         posts: user.Posts.map((post) => ({
//           ...post,
//           comments: post.Comments,
//         })),
//       }));
//     },
//   },
// };
