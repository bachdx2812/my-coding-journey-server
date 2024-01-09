// import { CohereEmbeddings } from "@langchain/cohere";
// import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";

(async () => {
  const { OpenAIEmbeddings } = await import("@langchain/openai");
  const { VercelPostgres } = await import(
    "@langchain/community/vectorstores/vercel_postgres"
  );

  const fs = require("fs");
  const path = require("path");

  // Config is only required if you want to override default values.
  const config = {};

  const vercelPostgresStore = await VercelPostgres.initialize(
    new OpenAIEmbeddings(),
    config
  );

  const folderPath = path.join(__dirname, "snippets/docker");

  const fileNames = fs.readdirSync(folderPath);
  const documents = [];

  fileNames.forEach((fileName) => {
    if (path.extname(fileName) === ".txt") {
      const filePath = path.join(folderPath, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      const document = {
        pageContent: content,
        metadata: { topic: "docker" },
      };
      documents.push(document);
    }
  });

  const ids = await vercelPostgresStore.addDocuments(documents);
})();
