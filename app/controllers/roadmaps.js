const Roadmap = require("../models/roadmap");

module.exports = {
  list: async (_, res) => {
    res.json(await Roadmap.list());
  },
};
