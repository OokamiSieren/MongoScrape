
// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var logger = require("morgan");
// initalize express
var app = express();

// set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// app.get("/", function (req, res) {
//   res.render("index");
// }); this didn't help

//require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;



//middleware
// morgan logger logs requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make the public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myoniondb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
// a get route for scraping the onion website
app.get("/", function(req, res) {
  res.render("index")
  //use axios to get body of html
  axios.get("https://www.theonion.com/").then(function(response) {
    //use cheerio to save it
    var $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
      //get the title text and links for the articles and save them to results
      var results = {};
      results.title = $(this)
        .find("h1")
        .text();
      results.link = $(this)
        .find("figure")
        .find("a")
        .attr("href");
      //  create a new article with the results
      db.Article.create(results)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
      console.log(results);
    });
  });
});

// Route for getting all of the articles from the database
app.get("/articles", function(req, res) {

  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});
// update articles that get saved
app.post("/articles/saved/:id", function(req, res) {
  db.Article
      .update({ _id: req.params.id }, { saved: true })
      .then(function(dbArticle) {
          res.json(dbArticle);
      })
      .catch(function(err) {
          res.json(err);
      });
});
// get saved articles from database
app.get("/saved", function(req, res) {
  // render saved page
  res.render("saved");
 db.Article.find({saved:true}).then(function(dbArticle) {
   res.json(dbArticle);
 }).catch(function(err) {
   res.json(err)
 });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
