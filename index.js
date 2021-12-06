const fs = require('fs');
const cheerio = require('cheerio');
const GetLinks = require('./get-links');

const sessionUrls = await GetLinks.getSessionUrls();
