$(document).ready(function () {
  var topics = ["Wakko", "Pinky and the Brain", "Freakazoid", "Batman Beyond", "Mighty Morphin Power Rangers", "Captain Planet", "Carmen Sandiego", "Yakko", "Dot", "Doug",];
  var offsets = Array(topics.length).fill(0);
  var draw = function () {
    $("#buttonDisplaySection").empty();
    topics.forEach(function (current, i) {
      var newDiv = $("<button>").addClass("displayBtn").attr({"data-characters": current, "offset": offsets[i], "id": i}).text(current);
      $("#buttonDisplaySection").append(newDiv);
    });
  }
  draw();

  $("#buttonDisplaySection").on("click", ".displayBtn", function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-characters") + "&offset=" + $(this).attr("offset") + "&api_key=28maurzKoYPvxWr0KwK0UUtJdSTF4zfE&limit=10&rating=pg-13";
    console.log(queryURL);
    var index = $(this).attr("id");
    console.log(offsets[index]);
    offsets[index] += 10;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var newRow = $("<div>").addClass("row")
      response.data.forEach(function (currGif, i) {
        var gifDiv = $("<div>").addClass("container col-md-3");
        var newImg = $("<img>").addClass("gif").attr({
          "src": currGif.images.fixed_height_still.url,
          "scndSrc": currGif.images.fixed_height.url
        });
        var p = $("<p>").text("Rating: " + currGif.rating);
        gifDiv.append(newImg, p);
        newRow.append(gifDiv);
        $(".gifDisplayArea").prepend(newRow);
      });
    });
    $(this).attr("offset", offsets[index]);
  });

  $(document.body).on("click", ".gif", function () {
    var temp = $(this).attr("src");
    $(this).attr("src", $(this).attr("scndSrc"));
    $(this).attr("scndSrc", temp);
  });

  $("#addData").on("click", function (event) {
    event.preventDefault();
    topics.push($("#newTopicElement").val().trim());
    offsets.push(0);
    $("#newTopicElement").val("");
    draw();
  });
});