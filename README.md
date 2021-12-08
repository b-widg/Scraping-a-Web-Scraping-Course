# Scraping-a-Web-Scraping-Course

## About the Project

This one was mostly for fun. It's a simple project meant to show how one can grab a lot of data with very little code. The application uses a single URL from the intro page of a 10 part tutorial on web scraping. It grabs the title of each article from the page and converts the title into the URL for that article. Then it grabs the entire article from that page. The articles are combined into a single document that can be viewed on your localhost.

## Built With

[Cheerio.js](https://cheerio.js.org/) was used for the actual scraping. All of the code required to do the scraping is contained in the two files in the utils folder.

[Express.js](https://expressjs.com/), [EJS](https://ejs.co/), and [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) were used in the most bare bones way possible to display the content in a readable format.

[nodemon](https://nodemon.io/) was used as a dev dependency to auto refresh the server while coding.

## Trying it Out

If you'd like to try it out, just clone or download the repository.

Download the dependencies.

```sh
npm install
```

Run [nodeman](https://nodemon.io/) to start the server on localhost:3000

```sh
npm run nodemon
```

And that's about it. Navigate to [localhost:3000](http://localhost:3000/). Everything should be downloaded by the time you get there.

## Final Thoughts

This is for educational purposes only. Please do not upload this as a live web site. It would probably be a copyright violation, but at the very least it would be incredibly rude.

The articles themselves are very good. I highly recommend them to anyone getting started in web scraping. I intentionally included the author info, the site's affiliate links, and social media links in the scrape so if you scrape the content and like it. Perhaps you can help them out.
