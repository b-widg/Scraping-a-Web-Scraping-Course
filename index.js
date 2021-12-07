const fs = require('fs');
const cheerio = require('cheerio');
const GetLinks = require('./get-links');
const GetPage = require('./get-page');

(async () => {
  const sessionUrls = await GetLinks.getSessionUrls();
  const getPageHtml = sessionUrls.map(async (link) => {
    return await GetPage.getPageData(link);
  });
  const htmlArray = await Promise.all(getPageHtml);
  console.log(htmlArray);
})();
