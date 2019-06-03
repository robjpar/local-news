const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {

  // Web scraping end-point
  app.get("/api/scrape", function(req, res) {

    axios.get('https://www.kptv.com/news/')
      .then(function(response) {
        var $ = cheerio.load(response.data);

        $("article .card-container").each(function(i, element) {
          var result = {};

          const headline_link = $(element).find('.tnt-headline').children('a');
          result.headline = headline_link.text();
          result.url = 'https://www.kptv.com' + headline_link.attr("href");
          const datetime = $(element).find('.tnt-date').attr('datetime');
          result.postedAt = new Date(datetime);

          db.Article.findOneAndUpdate(result, result, {
              upsert: true, // insert if doesn't exist
              setDefaultsOnInsert: true, // use model defaults
              new: true // return updated item
            })
            .then(function(article) {
              // console.log(article);
            })
            .catch(function(err) {
              console.log(err);
            });
        });

        res.send("Scrape complete. Data being saved to the database... Use GET /api/articles to view the database");
      });
  });

  // All the articles end-point
  app.get("/api/articles", function(req, res) {
    db.Article
      .find({})
      .populate('comments')
      .then(function(articles) {
        res.json(articles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Add a comment end-point
  app.post("/api/comment/:article_id", function(req, res) {
    db.Comment.create(req.body)
      .then(function(comment) {
        return db.Article.findOneAndUpdate({
          _id: req.params.article_id
        }, {
          $push: { // add the comment id to the article
            comments: comment._id
          }
        }, {
          new: true
        });
      })
      .then(function(article) {
        res.json(article);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Delete a comment end-point
  app.delete("/api/comment/:comment_id", function(req, res) {
    // Remove a note using the objectID
    db.Comment.deleteOne({
        _id: req.params.comment_id
      })
      .then(function(comment) {
        res.json(comment);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

};
