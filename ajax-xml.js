/**
 * file: ajax-xml.js
 * purpose: get and parse XML to HTML from extern API via Jquery
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

      console.log(xml); // viser XML-strukturen i console-inspect-tool.

      $(xml).find('item').each(function() {

        // titel
        let titel = $(this).find('title').text();
        //console.log(titel);

        let beskrivelse = $(this).find('description').text();
        console.log(beskrivelse);

        // billeder af forsider i
        let billede = $(this).find('enclosure').attr("url"); // src til billedet
        //console.log(billede);

        let permalink = $(this).find('guid').text(); // returnerer streng med mellemrum
        permalink = permalink.replace(/\s/g, ''); // fjerner mellemrum m. regexp
        //console.log('perm: ' + permalink);

        // tilføjer (append) html med data fra xml til #indhold
        $('#indhold').append('<div class="bog">' +
          '<h3>' + titel + '</h3>' +
          '<img class="enForside" src="' + billede + '" alt="billede af bogen" width="100px">' +
          '<p>' + beskrivelse + '</p>' +
          '<p><a href="' + permalink + '">Mere om denne bog.</a></p>' +
          '</div>'
        );
      })
    }
  }); // ajax slut

}); // document ready function slut

/*
FORBEDRINGER
I visse tilfælde er variablen billede.
Dvs. at der i stedet for en src til et billede
kommer en img tag, der ser sådan ud:

<img src="undefined" alt="billede af bogen">

Via en if / else konstruktion kan du enten
undlade billeder, hvor src=undefined
eller sætte et placeholder-billede ind.
Sådan kan man fjerne fejlmelding ved
manglende billeder.

Eksperimenter gerne med APIen;
men brug kun de url-er, som ikke kræver login.

Permalink: er linket til bogens side på Biblioteket.
Man kan bestille mv. der.
*/
