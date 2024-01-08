const axios = require("axios");
const fns = require("date-fns");

class Changelog {
  constructor(content) {
    this.content = content;
  }

  static async list() {
    const list = require("../data/change_logs");

    return {
      updatedAt: await Changelog.fetchLatestUpdatedTime(),
      list: list,
    };
  }

  static async fetchLatestUpdatedTime() {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/bachdx2812/my-coding-journey-server/commits?path=app/data/change_logs&page=1&per_page=1"
      );

      return fns.format(
        fns.parseISO(response.data[0]["commit"]["committer"]["date"]),
        "LLLL do yyyy"
      );
    } catch {
      return fns.format(new Date(), "LLLL do yyyy");
    }
  }
}

module.exports = Changelog;
