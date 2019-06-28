// Dependencies
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// create a note shema object
var NoteSchema = new Schema({
  title: String,
  body: String
});

//Create our model from the above schema using mongoose model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
