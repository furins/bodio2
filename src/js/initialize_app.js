var app = angular.module("app", [
  "ui.router",
  "ngTouch",
  "ngSanitize",
  "ngStorage"
]);

var apriUrl = function(url) {
  // ATTENZIONE richiede l'inAppBrowser
  window.open(url, "_blank", "hideurlbar=yes");
  console.log(url);
  return false;
};

var apribrowserinterno = function(url) {
  // ATTENZIONE richiede l'inAppBrowser
  cordova.InAppBrowser.open(url, "_blank", "location=no");
  console.log(url);
  return false;
};

app.run([
  "$http",
  "$rootScope",
  function($http, $rootScope) {
    console.log("scarico");
    //TODO gestirlo diversamente!
    backgroundDownloadAll($http, true); // popolo le variabili locali, mi raccomando il force = true o non si aggiornerà mai!

    $rootScope.$on("$stateChangeSuccess", function(e, curr, prev) {
      $rootScope.data = curr.data; //data viene recuperato dal router, definito in index.js
    });
  }
]);

app.controller("appController", [
  "$scope",
  "$http",
  "$state",
  "$location",
  function($scope, $http, $state, $location) {
    $scope.$back = function() {
      try {
        window.history.back();
      } catch (e) {
        $location.path("/home/");
      }
    };
    $scope.apriUrl = apriUrl;
    $scope.apribrowserinterno = apribrowserinterno;
    $scope.ha_club = scc_customizations.ha_club;
    console.log("ha club? " + scc_customizations.ha_club);

    // interfacciamento con il device
    document.addEventListener(
      "deviceready",
      function() {
        if (window.cordova.logger) {
          // senza questo il log non parte all'avvio dell'app
          window.cordova.logger.__onDeviceReady();
        }
        // TODO verificarli tutti
        var codice_iscr = localStorage.getItem("iscritto"); // normalmente è il codice della card
        if (codice_iscr !== null) {
          if (localStorage.getItem("dati_iscrizione") === null) {
            // si tratta di un utente non registrato o con registrazione vecchia
            console.log("richiedo i dati al server");
            var url =
              scc_customizations.server_club_url +
              "/api/v1/iscrizioni_codice/" +
              codice_iscr +
              "/?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863"; // development
            $http.get(url).then(
              function(response) {
                console.log("success");
                console.log(response);
                localStorage.setItem("iscritto", response.data.codice);
                localStorage.setItem(
                  "iscritto_nome",
                  response.data.nome + " " + response.data.cognome
                );
                localStorage.setItem(
                  "dati_iscrizione",
                  JSON.stringify(response.data)
                );
                console.log(
                  "L'utente è iscritto al club, ho aggiornato i dati."
                );
                console.log(
                  JSON.parse(localStorage.getItem("dati_iscrizione"))
                );
                localStorage.setItem("iscritto_al_club", true);
              },
              function(response) {
                if (
                  response.data ===
                  "More than one resource is found at this URI."
                ) {
                  // salvo una nuova scheda, con un nuovo codice
                  // ma come rimuovo quelle non valide? dovrei averle già rimosse in linea di principio
                  // posso usare iscritto_nome!
                  var iscritto_nome = localStorage.getItem("iscritto_nome");
                  var nome = encodeURI(iscritto_nome.split(" ")[0]);
                  var cognome = encodeURI(iscritto_nome.split(" ")[1]);
                  var url =
                    scc_customizations.server_club_url +
                    "/api/v1/iscrizioni_nome/" +
                    codice_iscr +
                    "/?nome=" +
                    nome +
                    "&cognome=" +
                    cognome +
                    "&username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863";
                  $http.get(url).then(
                    function(response) {
                      console.log("codice_card_aggiornato");
                      localStorage.setItem("iscritto", response.data.codice);
                      localStorage.setItem(
                        "iscritto_nome",
                        response.data.nome + " " + response.data.cognome
                      );
                      localStorage.setItem(
                        "dati_iscrizione",
                        JSON.stringify(response.data)
                      );
                      console.log(
                        "L'utente ora è univoco, ho aggiornato i dati."
                      );
                      console.log(response);
                      console.log(
                        JSON.parse(localStorage.getItem("dati_iscrizione"))
                      );
                      localStorage.setItem("iscritto_al_club", true);
                    },
                    function(response) {
                      console.log("Impossibile disambiguare l'utente.");
                      localStorage.setItem("iscritto_al_club", false);
                    }
                  );
                }
                console.log(
                  "Impossibile capire se l'utente è iscritto al club."
                );
                console.log("errore");
                console.log(response);
                localStorage.setItem("iscritto_al_club", false);
              }
            );
          } else {
            // tutto ok, ho i dati aggiornati
            console.log("L'utente  è iscritto al club.");
            console.log(JSON.parse(localStorage.getItem("dati_iscrizione")));
            localStorage.setItem("iscritto_al_club", true);
          }
        } else {
          console.log("L'utente non è iscritto al club.");
          localStorage.setItem("iscritto_al_club", false);
        }
        onDeviceReady($http, $scope); // definito in when_ready.js
      },
      false
    );
  }
]);
