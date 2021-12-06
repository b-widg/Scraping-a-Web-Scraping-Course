const os = require('os');
const axios = require('axios').default;
const cheerio = require('cheerio');

// getSessionUrls() returns an array of all URLs that need to be visied by visiting the site's enrollment page.
// The session titles are scraped and used to crearte the URL to each session.

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

const getSessionUrls = () => {
  axios
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
        const sessionUrls = sessionTitles.map((title) => {
          return formatTitleForUrl(title);
        });
        // console.log(sessionUrls);
        return sessionUrls;
      });
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  // .then(() => {
  //   console.log(`Well .then(), I guess we're done...`);
  // });
};

module.exports = getSessionUrls;
