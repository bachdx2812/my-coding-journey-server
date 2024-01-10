const github = require("../libs/github");

class Roadmap {
  constructor(title, done) {
    this.title = title;
    this.done = done;
  }

  static async list() {
    const list = require("../data/roadmaps.json");

    return {
      updatedAt: await Roadmap.fetchLatestUpdatedTime(),
      list: list,
    };
  }

  static async fetchLatestUpdatedTime() {
    return github.fetchLatestCommitedTime(
      "https://api.github.com/repos/bachdx2812/my-coding-journey-server/commits?path=app/data/roadmaps.json&page=1&per_page=1"
    );
  }
}

module.exports = Roadmap;
