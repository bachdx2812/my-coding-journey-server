module.exports = {
  list: (_, res) => {
    const list = require("../data/roadmaps.json");

    res.json(list);
  },
};
