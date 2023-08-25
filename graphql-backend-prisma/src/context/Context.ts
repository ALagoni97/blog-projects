import { PrismaClient } from "@prisma/client";

export interface Context {
  database: PrismaClient;
}
