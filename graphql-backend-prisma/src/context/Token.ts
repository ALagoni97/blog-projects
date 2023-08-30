import { Request } from "express";
import { IncomingMessage } from "http";

export const getToken = (req: IncomingMessage): string | undefined => {
  const authHeader = req.headers.authorization;
  let token = undefined;
  if (authHeader) {
    // If it's a bearer token we just get the actual token
    token = authHeader.split(" ")[1];
  }
  return token;
};
