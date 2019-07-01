// scrape button to display articles
// append articlesfunction
var display = function() {
  $.getJSON("/articles", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      $("#articles-well").append(
        "<div class ='card'" +
          "<div class='card-body'>" +
          "<h5 class='card-title'>" +
          data[i].title +
          "</h5>" +
          "<a href='" +
          data[i].link +
          "'>Article Link</a>" +
          "<br><div><button type='button' class='btn btn-success'id='save'>Save</button></div><br></div></div>" +
          "<br>"
      );
    }
  });
};
// scrape on click
$("#scrape").on("click", function(event) {
  display();
});
// save button for saving articles
$("save").on("click", function() {
  $.ajax({
    method: "POST",
    url: "/articles/saved/",
    success: function(response) {
      console.log("Saved article!");
    },
    error: function(error) {
      console.log(error);
    }
  });
});
// append saved articles function
var saved = function() {
  $.getJSON("/saved", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      $("#savedArticles").append(
        "<div class ='card'" +
          "<div class='card-body'>" +
          "<h5 class='card-title'>" +
          data[i].title +
          "</h5>" +
          "<a href='" +
          data[i].link +
          "'>Article Link</a>" +
          "<br><div><button type='button' class='btn btn-danger'id='remove'>Remove</button><button type='button' class='btn btn-info'id='note'>Note</button></div><br></div></div>" +
          "<br>"
      );
    }
  });
};

// saved articles on click for link
$("showsaved").on("click", function(event) {
  saved();
});

// on saved articles file option to remove saved article, add a note and save to notes table, button to remove note
