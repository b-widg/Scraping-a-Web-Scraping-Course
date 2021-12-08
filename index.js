const fs = require('fs');
const cheerio = require('cheerio');
const ejs = require('ejs');
const express = require('express');
const GetLinks = require('./utils/get-links');
const GetPage = require('./utils/get-page');

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const sessionUrls = await GetLinks.getLessonUrls();
  const getPageHtml = sessionUrls.map(async (link) => {
    return await GetPage.getPageData(link);
  });
  const htmlArray = await Promise.all(getPageHtml);
  res.render('index', { pageData: htmlArray });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
