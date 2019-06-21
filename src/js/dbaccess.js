var genericModel = (function() {
  'use strict';

  function lista($http, categoria, forzata, id) {
    forzata = forzata || false;
    // var connesso = false;
    // if ((typeof(navigator) !== 'undefined') && (typeof(navigator.connection) !== 'undefined') && (typeof(Connection) !== 'undefined')){
    //     connesso = (navigator.connection.type != Connection.NONE);
    // }
    // console.log(connesso);
    id = id || false;
    console.log("accedo al db");
    //console.log("window['"+categoria+"']: "+window[categoria]);
    if ((typeof(window[categoria]) !== 'undefined') && (window[categoria] !== null) && (forzata === false)) {
      // risposta più veloce: recupero dal global namespace
      console.log("recuperato dal global namespace " + categoria);
      return window[categoria];
    } else {
      // risposta intermedia: recupero da localstorage (versione dati aggiornata)
      console.log("non presente nel global namespace " + categoria);
      var elementi = localStorage.getItem(categoria);
      if ((elementi !== null) && (forzata === false)) {
        // manca la variabile globale ma c'è nel localstorage. lo recupero
        // console.log("recuperato dal localstorage la variabile " + categoria);
        var valori = JSON.parse(elementi)
        window[categoria] = valori;
        return valori;
      } else {
        // non è mai stato impostato nemmeno il localstorage.
        // recupera la versione memorizzata nel filesystem (probabilmente obsoleta)
        $http.get('json/' + categoria + '.json').success(function(data) {
          console.log("recuperato temporaneamente dal filesystem il file json/" + categoria + ".json");
          window[categoria] = data;
        });

        //e ora, più lentamente procedo al download della versione aggiornata
        // if (connesso) {
            console.log("sono connesso");
            var risultato;
            var url = 'http://app.bodiocenter.com/api/v1/' + categoria + '/';
            if (id) {
                url = 'http://app.bodiocenter.com/api/v1/' + categoria + '/' + id + '/'
            };
            return $http.get(url)
              .success(function(data) {
                  risultato = data.objects;
                  if(id) {
                      risultato = data;
                  }
                console.log("recuperato dal web il file json per "+categoria);
                localStorage.setItem(categoria, JSON.stringify(risultato));
                window[categoria] = risultato;
                $('.caricamento').dimmer('hide');
              })
              .error(function(message) {
                console.log("errore download dati");
                console.log(message);
                //TODO fornire un messaggio all'utente in questo caso?
                $('.caricamento').dimmer('hide');
              })
              .then(function() {
                return window[categoria];
              });
        // } else {
        //     console.log("non sono connesso");
        //     return window[categoria];
        // }

      }
    }
  }
  return {
    lista: lista
  };
}());

// function backgroundDownloadSingolo($http, nome, force) {
//   if ((force) || (!localStorage.hasOwnProperty(nome))) {
//     console.log("scarico banca dati " + nome);
//     genericModel.lista($http, nome, true);
//   }
// }

var backgroundDownloadAll = function($http, force) {
    genericModel.lista($http, 'shoppingcenters', force, shopping_center_id);
};
