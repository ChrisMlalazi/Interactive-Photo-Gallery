//Problem: User when clicking on image goes to a dead end.
//Solution:  Create an overlay with the large image - lightbox:
 var $overlay = $('<div id="overlay"></di>');
 var $image = $("<img>");
 var $caption = $("<p></p>");
 
//Add overlay 
$("body").append($overlay);

// An image to overlay.
  $overlay.append($image);

//A caption to overlay
$overlay.append($caption);

  
// Capture the click event on a link to add an image.
$(".lightbox a").click(function(event) {
	event.preventDefault();
 var imageLocation = $(this).attr("href");
	
//Update overlay with the image linked in the link.
  $image.attr("src", imageLocation);
	 
	
	//Show the overlay.
  $overlay.show();	
	
	//Get child's alt attribute and set caption
	
	var captionText = $(this).children("img").attr("data-title");
	$caption.text(captionText);
});

//When overlay is clicked:
$overlay.click(function() {
  //Hide the overlay.
	$overlay.hide();
	
});