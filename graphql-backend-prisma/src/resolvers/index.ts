import { mergeDeep } from "../utils/DeepMerge.js";
import { UserResolver } from "./UserResolver.js";

const resolversMerge = {};
mergeDeep(resolversMerge, [UserResolver]);

export const resolvers: any = resolversMerge;
