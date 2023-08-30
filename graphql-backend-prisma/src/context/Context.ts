import { PrismaClient } from "@prisma/client";

export interface Context {
  database: PrismaClient;
  token: string | undefined;
}
