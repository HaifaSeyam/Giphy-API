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
        for (var i = 0 ; i < response.data.length ; i++) {
            // Storing the rating data
            var rating = response.data[i].rating;
            // Creating an element to have the rating displayed
            var displayRating = $("<p>").text("Rating: " + rating);
            // Retrieving the URL for the image
            var imgURL = response.data[i].images.fixed_width_still.url;
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            image.addClass("gif");
            // Adding a state-attribute
            image.attr("data-state", "still");
            image.attr("data-still", response.data[i].images.fixed_width_still.url);
            image.attr("data-animate", response.data[i].images.fixed_width.url);
            //Creating a div to add 4 images (columns) per line (row)
            var imageDiv = $("<div>");
            imageDiv.addClass("col-md-3");
            // Displaying the rating
            imageDiv.append(displayRating);
            // Appending the image
            imageDiv.append(image);
            // Putting the entire topic above the previous topics
            $(".topics-view").prepend(imageDiv);
        }

        // This function handles events where a topic button is clicked
        $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
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

      // This function handles events where a topic button is clicked
      $("#add-topic").on("click", function(event) {
          event.preventDefault();
            if($.trim($("#topic-input").val()).length == 0){
                //alert("You have to add a topic!");
                $("#warning").text("You have to add a topic!");
            } else {
                event.preventDefault();
                // This line grabs the input from the textbox
                var topicInput = $("#topic-input").val().trim();
                // Adding topic from the textbox to our array
                topics.push(topicInput);
                // Calling renderButtons which handles the processing of our topics array
                renderButtons();
            }
      });

      // Adding a click event listener to all elements with a class of "topic-btn"
      $(document).on("click", ".topic-btn", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();