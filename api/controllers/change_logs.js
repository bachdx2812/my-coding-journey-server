module.exports = {
  list: (req, res) => {
    const list = require("../data/change_logs");

    res.json(list);
  },
};
