const axios = require('axios').default;
const cheerio = require('cheerio');

// getPageData returns the HTML for the entire section from the picture
// through the social mesia links for a single page

module.exports.getPageData = async (url) => {
  let body;
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      body = $('.col-sm-8:first-child');
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  return body.html();
};
