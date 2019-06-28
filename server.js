// Dependencies
var express = require ("express");
var mongoose = require ("mongoose");
var axios = require ("axios");
var cheerio = require ("cheerio");
 var handlebars = require("handlebars");
 var logger = require ("morgan");


//require all models
// var db = require("./models");
var PORT = process.env.PORT || 3000;

// initalize express
var app = express();

//middleware
// morgan logger logs requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Make the public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myoniondb";
mongoose.connect(MONGODB_URI,{useNewUrlParser:true});

// Routes
// a get route for scraping the onion website
app.get("/scrape", function(req, res) {    //use axios to get body of html
    axios.get("https://www.theonion.com/").then(function(response) {
        //use cheerio to save it
        var $ = cheerio.load(response.data);
       
        $("article").each(function(i, element) {
            var results = {};
            results.title = $(this).children().text();
            results.link = $(this).find("a").attr("href");
             results.image = $(this).find("img").attr("src");
           
            // db.Article.create(results).then(function(dbArticle) {
            //     console.log(dbArticle);
            // })
            // .catch(function(err) {
            //     console.log(err);
            // });
            console.log(results);
            });   
        });
        
    });

    //finish routes etc
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  