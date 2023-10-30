import { PrismaClient } from "@prisma/client";

let databaseConnection: PrismaClient;
let globalDb;
//check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  databaseConnection = new PrismaClient();
} else {
  //check if there is already a connection to the database
  if (!globalDb) {
    globalDb = new PrismaClient({
      log: ["query"],
    });
  }
  databaseConnection = globalDb;
}

export { databaseConnection };
