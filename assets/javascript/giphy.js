// Initial array of topics
var topics = ["Baboon", "Caracal", "Cassowary", "Catfish"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayTopicInfo() {
    $("#warning").empty();
    $(".topics-view").empty();
    
    var APIKey = "NZmkgTebl7zcqFVWb6vovQRRQaXBQaCe";
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIKey + "&limit=10";
    
    // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        });
}

    // Function for displaying topic data
    function renderButtons() {
        $("#buttons-view").empty();
        $("#warning").empty();
        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each topic in the array
          var a = $("<button>");
          // Adding a class of topic-btn to our button
          a.addClass("topic-btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // Adding a click event listener to all elements with a class of "topic-btn"
      $(document).on("click", ".topic-btn", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();