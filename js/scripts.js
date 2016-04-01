//Problem: User when clicking on image goes to a dead end
//Solution Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay"><div></div></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//list index position to move forward and backwards by 1.
var $index = 0;

//Grabbing the list items from the imageGallery element and we are assigning the length total
//this makes it flexible to expand the gallery or take away
var $galleryLength = $(".lightbox li").length;

//2.1 An image
$overlay.children("div").append($image);


//2.2 add caption
$overlay.children("div").append($caption);

// Add some nav buttons and assign unique ids to them!
$overlay.children("div").append("<button id='btnPrev'> < </button>");
$overlay.children("div").append("<button id='btnNext'> > </button>");
$overlay.children("div").append("<button id='btnClose'> X </button>");

//2. Add overlay
$("body").append($overlay);


// Update image overlay

var updateImage = function(imageLocation, imageCaption){

  //1.2 update the overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //1.3 Get child <img> data-title atrbute and set caption
  $caption.text(imageCaption);


}

//1. Click <a> event to an image
$(".lightbox a").click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  var imageCaption =  $(this).children("img").attr("data-title");

  //update index to current selected image
  $index = $(this).parent().index(); 

  //this is calling that new Update overlay function above
  updateImage(imageLocation, imageCaption);

  //1.1 Show the overlay
  $overlay.show(imageLocation);


});


//Button prev next function
var prevNext = function(prev ) {
  //set prev to true to move backwards in the index

  //if flag set move backwards, if not move forwards
  if(!prev) { $index++; }
  else { $index--; }

  //if out of index reset
  if ($index < 0) { $index = $galleryLength-1;}
  if ($index > 11) { $index = 0; }

  //Grab the element by index and then get the link
  var newImgSelected = $(".lightbox li").get($index).getElementsByTagName("a");

  //grab link information
  var imageLocation = $(newImgSelected).attr("href");
  var imageCaption =  $(newImgSelected).children("img").attr("data-title");

  //Update Overlay
  updateImage(imageLocation, imageCaption);
}


// Hide Overlay function
function hideOverlay() {
 $overlay.hide();
}


//Button events - CLICK

$("#btnPrev").click(function(event){
  prevNext(true);
});

$("#btnNext").click(function(event){
  prevNext();
});


// Button events - KEYBOARD NAV

$("#btnPrev").keydown(function(event){
  prevNext(true);
});

$("#btnNext").keydown(function(event){
  prevNext();

});



// Exit button
$("#btnClose").click(function(){
   hideOverlay();
});


//When overlay is click
$overlay.click(function(event){
 // Hide the overlay  

   if(event.target.id == "overlay")
   $(this).slideUp("fast");
   hideOverlay;
});


/***************************
SEARCH FILTER
****************************/


 (function() {                             // Lives in an IIFE
  var $imgs = $('.lightbox img');          // Get the images
  var $search = $('#search');      // Get the input element
  var cache = [];                         // Create an array called cache

  $imgs.each(function() {                 // For each image
    cache.push({                          // Add an object to the cache array
      element: this,                      // This image
      text: this.alt.trim().toLowerCase() // Its alt text (lowercase trimmed)
    });
  });

  function filter() {                     // Declare filter() function
    var query = this.value.trim().toLowerCase();  // Get the query
    cache.forEach(function(img) {         // For each entry in cache pass image 
      var index = 0;                      // Set index to 0

      if (query) {                        // If there is some query text
        index = img.text.indexOf(query);  // Find if query text is in there
      }

      img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
    });
  }

  if ('oninput' in $search[0]) {          // If browser supports input event
    $search.on('input', filter);          // Use input event to call filter()
  } else {                                // Otherwise
    $search.on('keyup', filter);          // Use keyup event to call filter()
  }              

}());


/*****************************
KEYBOARD NAVIGATION
*****************************/


$("#overlay img").keydown(function (e){ 
    if(e.keyCode == 37) // left arrow
    {
        // your action here, for example
        $('#btnPrev').keydown();
    }
    else if(e.keyCode == 39)    // right arrow
    { 
        // your action here, for example
        $('#btnNext').keydown();
    }
});



