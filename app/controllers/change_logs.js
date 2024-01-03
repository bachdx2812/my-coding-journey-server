module.exports = {
  list: (_, res) => {
    const list = require("../data/change_logs");

    res.json(list);
  },
};
