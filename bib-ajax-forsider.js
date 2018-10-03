/**
 * file: ajax-xml.js
 * purpose: viser kun nye titlers forsider
 **/

// API url: list all news
let newsListAll = 'https://eaaa.reindex.net/EAAA/main/Api.php?Focus=newslistall';

$(document).ready(function() {

  // GET AJAX the Jquery way
  $.ajax({
    type: "GET",
    url: newsListAll,
    cache: false,
    dataType: "xml",
    success: function(xml) {

      $(xml).find('item').each(function() {

        let billede = $(this).find('enclosure').attr("url"); // src til billedet
        let permalink = $(this).find('guid').text(); // returnerer streng med mellemrum
        permalink = permalink.replace(/\s/g, ''); // fjerner mellemrum m. regexp

        let nytBillede = function(perm, img) {

          billedLink = '<a href="' + perm + '" target="_blank">' +
            '<img src="' + img + '" alt="billede" class="enForside">' +
            '</a>';

          if (billede !== undefined) {
            $('#indhold').append(billedLink);
          }
          else {
            $('#indhold').append('<!-- billede mangler -->')
          }
        } // nytBillede slut

        nytBillede(permalink, billede);

      })
    }
  }); // ajax slut

}); // document ready function slut
