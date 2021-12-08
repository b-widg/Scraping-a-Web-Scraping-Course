const os = require('os');
const axios = require('axios').default;
const cheerio = require('cheerio');

// getSessionUrls() returns an array of all URLs that need to be visied by visiting the site's enrollment page.
// The lesson titles are scraped and used to create the URL to each lesson.

// Converts Lesson Title into full URL to that lesson.
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

module.exports.getLessonUrls = async () => {
  let lessonUrls = [];
  await axios
    .get('https://gohighbrow.com/portfolio/build-your-own-web-scraping-tool/')
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('h5:contains("Course plan")+p', html).each(function () {
        const titlesString = $(this).text();
        // Titles are in a string.  split(os.EOL) splits them to an array based on operating
        // system's end of line character.
        const lessonTitles = titlesString.split(os.EOL);
        // Remove last element as it should be '+ Quiz'
        lessonTitles.pop();
        // Convert array of lesson titles to array of full URLs.
        lessonUrls = lessonTitles.map((title) => {
          return formatTitleForUrl(title);
        });
      });
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  return lessonUrls;
};
