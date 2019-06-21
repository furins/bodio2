var gpsModule = (function() {
  'use strict';



  var checkInProgress;
  var precisione_coordinate = 7;

  function updatePosition($scope, onsuccess) {
    locationService.getCurrentPosition(
      function(position) {
        if (typeof(onsuccess) !== 'undefined') {
          onsuccess(position);
        } // funzione passata direttamente all'atto della chiamata
        gpsModule.positionChanged({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, $scope);

      },
      function(error) {
        console.log("errore nell'ottenere le coordinate: " + error.code);
        console.log("errore nell'ottenere le coordinate: " + error.message);
        if (error.code == error.PERMISSION_DENIED) {
          console.log("non è consentito usare il geoposition html5");
        }
      }, {
        enableHighAccuracy: true,
        timeout: timeout_gps
      }
    );
  }


  /**
   * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
   */
  var positionChanged = function(location, $scope) {
    localStorage.setItem('coordinate', JSON.stringify(location)); // occorre che riduciamo ai soli id/tipo per rispariare sul localstorage
    var d = distanza(scc_customizations.latitude,scc_customizations.longitude, location.latitude, location.longitude);
    $scope.distanza = "ti trovi a "+parseInt(d)+" Km da "+scc_customizations.nome;
  };

  return {
    positionChanged: positionChanged,
    updatePosition: updatePosition
  };

}());
