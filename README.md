Bibliotekets API
================

Biblioteket har en åben API, hvor nye titler bl.a. kan hentes.
Filerne viser, hvordan du kan hente materialerne til en webside.

* [API Help](https://eaaa.reindex.net/EAAA/main/Help.php?TutAction=Interfaces)
* [API: nye titler XML data](https://eaaa.reindex.net/EAAA/main/Api.php?Focus=newslistall)

AJAX henter bibliotekets data om bøgerne i form af noget XML,
der via Jquery transmuteres til HTML:

~~~~
// Jquery henter indhold fra item og title
$(xml).find('item').each(function() {
  let titel = $(this).find('title').text();
~~~~

Derefter sker transmutationen til html og en ikon fra font awesome indsættes:

~~~~
$('#indhold').append('<div class="bog">' +
  // ...  
  '<h3><i class="fas fa-book"></i> ' + titel + '</h3>' + // titel
  // ...
~~~~

De fleste filer viser bare mere eller mindre et råt dump af data og billeder.
Filerne `xml-seek-word.html`, `xml-seek-word.css` og `xml-seek-word.js`
viser, hvordan man kan style indholdet responsivt via CSS grid og nogle
ikoner fra font awesome.
