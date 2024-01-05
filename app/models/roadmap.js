const axios = require("axios");
const fns = require("date-fns");

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
    try {
      const response = await axios.get(
        "https://api.github.com/repos/bachdx2812/my-coding-journey-server/commits?path=app/data/roadmaps.json&page=1&per_page=1"
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

module.exports = Roadmap;
