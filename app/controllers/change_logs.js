const ChangeLog = require("../models/changelog");

module.exports = {
  list: async (_, res) => {
    res.json(await ChangeLog.list());
  },
};
