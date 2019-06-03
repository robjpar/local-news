const db = require("../models");

module.exports = function(app) {

  // Index page end-point
  app.get("/", function(req, res) {
    db.Article
      .find({})
      .populate({
        path: 'comments',
        options: {
          sort: {
            addedAt: -1
          }
        }
      })
      .sort({
        postedAt: -1
      })
      .limit(50)
      .then(function(articles) {
        res.render('index', {
          articles: articles
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // 404 status for any unmatched routes
  app.get('*', function(req, res) {
    res.status(404).send('404 Not Found');
  });

};
