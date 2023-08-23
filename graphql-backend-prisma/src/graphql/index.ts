import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../../src/graphql");
const filepath = path.join(basePath, "*.gql");
const typesArray = loadFilesSync(filepath);
export const typeDefs = mergeTypeDefs(typesArray);
