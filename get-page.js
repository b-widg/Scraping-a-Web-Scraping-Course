const axios = require('axios').default;
const cheerio = require('cheerio');

// getPageData returns the HTML for the entire section from the picture
// through the social mesia links

module.exports.getPageData = async (url) => {
  let body;
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      body = $('.col-sm-8:first-child');
      // console.log(body.html());
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  return body.html();
};

// (async () => {
//   const pageData = await getPageData(url);
//   console.log('RETURNED PAGE DATA', pageData);
// })();
