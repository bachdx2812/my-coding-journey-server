const langchain = require("../services/langchain");

module.exports = {
  generator: async (req, res) => {
    if (!req.body.keywords || req.body.keywords.length == 0) {
      res.status(400).json({ error: "keywords are required" });
    }

    const { answer } = await langchain.retrieve(req.body.keywords);
    res.status(200).json({ answer });
  },
};
