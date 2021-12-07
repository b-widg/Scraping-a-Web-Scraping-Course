const fs = require('fs');
const cheerio = require('cheerio');
const GetLinks = require('./get-links');
const GetPage = require('./get-page');
const ejs = require('ejs');
const express = require('express');
const app = express();

const PORT = 3000;

//app.set('views', __dirname + '/views');
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
