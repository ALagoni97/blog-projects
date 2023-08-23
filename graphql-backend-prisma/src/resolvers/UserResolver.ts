export const UserResolver: any = {
  Query: {
    users: async (_, args, context) => {
      const users = [
        {
          title: "The Awakening",
          author: "Kate Chopin",
        },
        {
          title: "City of Glass",
          author: "Paul Auster",
        },
      ];
      return users;
    },
  },
};
