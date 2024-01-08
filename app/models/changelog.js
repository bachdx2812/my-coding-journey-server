const github = require("../libs/github");

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
    return github.fetchLatestCommitedTime(
      "https://api.github.com/repos/bachdx2812/my-coding-journey-server/commits?path=app/data/change_logs&page=1&per_page=1"
    );
  }
}

module.exports = Changelog;
