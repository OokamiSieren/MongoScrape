// scrape button to display articles
// append function
var display = function(){
    $.getJSON("/articles",function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            $("#articles-well").append("<div class ='card'"+ "<div class='card-body'>" +"<h5 class='card-title'>"+ data[i].title +"</h5>"+ "<a href='"+ data[i].link +"'>Article Link</a>"+ "<br><div><button type='button' class='btn btn-success'id='save'>Save</button></div><br></div></div>"+"<br>");
        }
    });
}
// scrape on click
    $("#scrape").on("click", function(event) {
      display();
    });

// save on click
// click save button and it tags the article by the id, set route to saved articles page here? 

// click saved articles link to direct to saved handlebars file

// on saved articles file option to remove saved article, add a note and save to notes table, button to remove note