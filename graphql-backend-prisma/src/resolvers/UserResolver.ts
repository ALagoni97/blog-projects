import { GQLResolvers } from "../__generated__/resolvers-types";

export const UserResolver: GQLResolvers = {
  Query: {
    users: async (_, args, context) => {
      const users = await context.database.user.findMany();
      return users;
    },
  },
};
