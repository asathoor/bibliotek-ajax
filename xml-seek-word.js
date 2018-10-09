/**
 * file: xml-seek-word.html
 * formål: henter data om bøger fra EAAA Bibliotekets API

 Denne let reviderede version viser
 en række roterede forsider fra nye bøger
 på biblioteket.

 **/
$(document).ready(function() {

  // "renser" #indhold ...
  $('#indhold').html('');
  //alert('visForsider() klar');

  // vider forsider af nyheder ved load
  let visForsider = function() {

    // API url: list all news
    let newsListAll = 'https://eaaa.reindex.net/EAAA/main/Api.php?Focus=newslistall';

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
              '<img src="' +
              img +
              '" alt="billede" class="enForside" style="max-width:200px;transform: rotate(' +
              Math.floor(Math.random() * 85) +
              'deg);">' +
              '</a>';

            if (billede !== undefined) {
              $('#indhold').append(billedLink);
            } else {
              $('#indhold').append('<!-- billede mangler -->')
            }
          } // nytBillede slut

          nytBillede(permalink, billede);

        })
      }
    }); // ajax slut
  }

  // kalder vis visForsider
  visForsider();

  // get user input
  $("#myTextBox").on("change paste keyup", function() {

    // query:
    wrd = 'https://eaaa.reindex.net/EAAA/main/Api.php?Focus=rsshitlist&qe='
    wrd += encodeURIComponent($(this).val()) // uri encoder søgestrengen
    wrd += '&pagesize=500&page=1&format=rss';

    //let link = $('#test'); // viser uri til APIen som link i browseren
    //link.html('<a href="' + wrd + '">' + wrd + '</a>');

    $('#test').show();

  });

  // format the searchstring
  $('#submit').click(function() {

    // "renser" #indhold ...
    $('#indhold').html('');
    //$('#test').hide();

    // henter data via AJAX
    $.ajax({
      type: "GET",
      url: wrd,
      cache: false,
      dataType: "xml",
      success: function(xml) {

        //console.log(xml); // viser XML-strukturen i console-inspect-tool

        $(xml).find('item').each(function() { // ved hver <item> gøres følgende ...

          // vælger data med .find() og gemmer dem i variabler
          let titel = $(this).find('title').text();
          let forfatter = $(this).find('author').text();
          let beskrivelse = $(this).find('description').text();
          let billede = $(this).find('enclosure').attr("url"); // src til billedet
          let permalink = $(this).find('link').text();
          let pubdate = $(this).find('pubDate').text();

          // er der et billede? J/N?
          function visBillede(img) {
            if (img !== undefined) { // hvis img ikke er undefined
              return '<img class="center" src="' + img + '" alt="billede af bogen">';
            }
            if (img == undefined) { // hvis billede er undefined
              return '<!-- billede af forsiden mangler -->';
            }
          }

          // tilføjer (append) markup til #indhold
          $('#indhold').append('<div class="bog">' + // .bog en bogkasse begynder
            '<a href="' + permalink + '" target="_blank">' + visBillede(billede) + '</a>' + // billede (måske)
            '<h3><i class="fas fa-book"></i> ' + titel + '</h3>' + // titel
            '<h4><i class="fas fa-user-circle"></i> By: ' + forfatter + '</h4>' + // forfatter
            // visBillede( billede ) + // skriver kun billedtag, hvis der er et billede
            '<p>' + beskrivelse + '</p>' + // beskrivelse
            '<p>Published: ' + pubdate.substring(0, 16) + '</p>' + // tryk: dato
            '<a href="' + permalink + '" target="_blank">' + '<i class="fas fa-location-arrow"></i> Bestil </a>' + // permalink
            '</div>' // bogkasse slut
          );
        })
      }
    }); // ajax slut
  }); // #submit klik slut
}); // document ready slut
