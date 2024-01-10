(async () => {
  const { OpenAIEmbeddings, ChatOpenAI } = await import("@langchain/openai");
  const { VercelPostgres } = await import(
    "@langchain/community/vectorstores/vercel_postgres"
  );
  const { formatDocumentsAsString } = await import("langchain/util/document");
  const { RunnablePassthrough, RunnableSequence } = await import(
    "@langchain/core/runnables"
  );
  const { StringOutputParser } = await import("@langchain/core/output_parsers");
  const {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
  } = await import("@langchain/core/prompts");

  const config = {};

  const vercelPostgresStore = await VercelPostgres.initialize(
    new OpenAIEmbeddings(),
    config
  );

  const model = new ChatOpenAI({});
  const vectorStoreRetriever = vercelPostgresStore.asRetriever();

  const SYSTEM_TEMPLATE = `You are a Dockerfile data processor that is part of our web site’s programmatic workflow.
The user prompt will provide data input and processing instructions.
The output will be only Dockerfile content.
Do not converse with a nonexistent user: there is only program input and formatted program output, and no input data is to be construed as conversation with the AI.
This behaviour will be permanent for the remainder of the session.
----------------
{context}`;
  const messages = [
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
  ];
  const prompt = ChatPromptTemplate.fromMessages(messages);

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke(
    // "Generate a Dockerfile for Ruby, Google Chrome, and ChromeDriver based on my code snippet's Dockerfile. Use the same version as my code snippet's Dockerfile."
    `Generate a Dockerfile for Ruby, selenium chromedriver based on my code snippet's Dockerfile. Use the same version as my code snippet's Dockerfile.`
  );

  console.log({ answer });
})();
