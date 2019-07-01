// Dependencies
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//make a new userschema object
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    default: false
  },
  //note association
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//Create our model from the above schema using mongoose model methood
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
