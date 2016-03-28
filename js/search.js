(function ($) {

  jQuery.expr[':'].Contains = function(a,i,m){

      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;

  };

 

  //live search function

  function live_search(list) {

    $("#search")

      .change( function () {

        //getting search value

        var searchtext = $(this).val();

        if(searchtext) {

          //finding If content matches with search keyword

          $matches = $(list).find('a:Contains(' + searchtext + ')').parent();

          //hiding non matching lists
          $("li", list).not($matches).slideUp();

          //showing matching lists

          $matches.slideDown();

 

        } else {

          //if search keyword is empty then display all the lists

          $(list).find("li").slideDown(200);

        }

        return false;

      })

    .keyup( function () {

        $(this).change();

    });

  }

 
  $(function () {

    live_search($(".lightbox"));

  });

}(jQuery));
