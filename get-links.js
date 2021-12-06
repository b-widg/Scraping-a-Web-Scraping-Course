const os = require('os');
const axios = require('axios').default;
const cheerio = require('cheerio');

// getSessionUrls() returns an array of all URLs that need to be visied by visiting the site's enrollment page.
// The session titles are scraped and used to create the URL to each session.

// Converts Session Title into full URL to that session.
// Example Title: 'Lesson 8. Solutions to Other Web Scraping “Gotchas” You May Encounter'
// Result shoule be: 'https://gohighbrow.com/Solutions-to-Other-Web-Scraping-Gotchas-You-May-Encounter'
const formatTitleForUrl = (title) => {
  formattedTitle = title
    .replaceAll(` `, `-`)
    .replaceAll(`’`, ``)
    .replaceAll(`“`, ``)
    .replaceAll(`”`, ``)
    .replaceAll(`"`, ``);
  formattedTitle = `https://gohighbrow.com/${formattedTitle
    .split('-')
    .splice(2)
    .join('-')}`;
  return formattedTitle;
};

module.exports.getSessionUrls = async () => {
  let sessionUrls = [];
  await axios
    .get('https://gohighbrow.com/portfolio/build-your-own-web-scraping-tool/')
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('h5:contains("Course plan")+p', html).each(function () {
        const titlesString = $(this).text();
        // Titles are in a string.  split(os.EOL) splits them to an array based on operating
        // system's end of line character.
        const sessionTitles = titlesString.split(os.EOL);
        // Remove last element as it should be '+ Quiz'
        sessionTitles.pop();
        // Convert array of session titles to array of foll URLs.
        sessionUrls = sessionTitles.map((title) => {
          return formatTitleForUrl(title);
        });
        // console.log(sessionUrls);
      });
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  return sessionUrls;
};

// (async () => {
//   sessionUrls = await getSessionUrls();
//   console.log('RETURNED SESSION URLs', sessionUrls);
// })();
