const axios = require("axios");
const { format, parseISO } = require("date-fns");

async function fetchLatestCommitedTime(path) {
  try {
    const response = await axios.get(path);

    return format(
      parseISO(response.data[0]["commit"]["committer"]["date"]),
      "LLLL do yyyy"
    );
  } catch {
    return format(new Date(), "LLLL do yyyy");
  }
}

module.exports = { fetchLatestCommitedTime };
