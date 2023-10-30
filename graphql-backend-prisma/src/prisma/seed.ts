import { databaseConnection } from "../context/Database.js";

await databaseConnection.user.createMany({
  data: [
    {
      name: "Test user 1",
    },
    {
      name: "Test user 2",
    },
    {
      name: "Test user 3",
    },
  ],
});
const users = await databaseConnection.user.findMany();

for (const user of users) {
  await databaseConnection.post.createMany({
    data: [
      {
        title: "Artikel 1",
        userId: user.userId,
      },
      {
        title: "Artikel 2",
        userId: user.userId,
      },
      {
        title: "Artikel 3",
        userId: user.userId,
      },
    ],
  });
  const posts = await databaseConnection.post.findMany();
  for (const post of posts) {
    await databaseConnection.comment.createMany({
      data: [
        {
          message: "Comment 1",
          postId: post.postId,
          senderId: user.userId,
        },
        {
          message: "Comment 2",
          postId: post.postId,
          senderId: user.userId,
        },
        {
          message: "Comment 3",
          postId: post.postId,
          senderId: user.userId,
        },
      ],
    });
  }
}
