// scrape button to display articles
// append function
var display = function(){
    $.getJSON("/articles",function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            $("#articles-well").append("<div class ='card'"+ "<div class='card-body'>" +"<h5 class='card-title'>"+ data[i].title +"</h5>" +"<br>" + "<a href='"+ data[i].link +"'>Article Link</a>"+ "</div>");
        }
    });
}
// scrape on click
    $("#scrape").on("click", function(event) {
      display();
    });

