/*
 * Controller generico per i negozi (food, non food, temporary)
 */
var controller_negozi = function($scope, sc, $rootScope, titolo, filtro) {
    // imposto titolo pagina
    prepare_interface($rootScope);
    $rootScope.titolo = titolo;

    // imposto variabili per pagina
    $scope.negozi = sc.negozi.filter(filtro);
    $scope.query = '';
    $scope.search = function(negozio) {
        return ricerca_fulltext_negozi($scope, negozio)
    };

    // imposto funzioni pagina
    $scope.annulla_cerca = function() {
        $scope.query = '';
    };

    if (scc_customizations.orario_food !== false) {
        $scope.ha_orario_food = true;
        $scope.orario_food = scc_customizations.orario_food;
    } else {
        $scope.ha_orario_food = false;
        $scope.orario_food = '';
    }
    // visualizzo pagina
    show_interface();
}


function e_convenzione(elemento) {
    console.log(elemento);
    if (typeof(elemento.promozioni) !== 'undefined'){
        return elemento.promozioni.length > 0;
    } else {
        return false;
    }
}

app.controller('negoziController', ['$scope', 'sc', '$rootScope',
    function($scope, sc, $rootScope, titolo, filtro) {
        return controller_negozi($scope, sc, $rootScope, "Aziende di Bodio Center", dentroAlCentro);
    }
]);

app.controller('foodController', ['$scope', 'sc', '$rootScope',
    function($scope, sc, $rootScope, titolo, filtro) {
        return controller_negozi($scope, sc, $rootScope, "Aziende Convenzionate", e_convenzione);
    }
]);



app.controller('negoziDetailController', ['$scope', '$http', '$state', 'sc', '$stateParams', '$timeout', '$rootScope',
    function($scope, $http, $state, sc, $stateParams, $timeout, $rootScope) {
        prepare_interface($rootScope);
        // recupero dati negozio
        var negozio = getByValue(sc.negozi, 'id', $stateParams.id);
        console.log(negozio);
        // intestazione pagina
        $rootScope.titolo = negozio.nome || '';
        $rootScope.negozio = negozio;

        function mostra_sezione(azione, negozio_id) {
            var negozio = getByValue(sc.negozi, 'id', negozio_id);
            console.log("click");
            if (azione === 'menu') {
                console.log("apro menu");
                apriUrl('http://app.bodiocenter.com'+negozio.allegato);
            } else {
                console.log("apro scheda");
                $('#sopra .tab').tab('change tab', 'vuoto');
                $('#sotto .tab').tab('change tab', 'mappa');
            }
        };

        $scope.mostra_sezione = mostra_sezione;
        // attivazione tab
        $('#sopra .tab').tab({
            'context': '#sopra'
        });
        $('#sotto .tab').tab({
            'context': '#sotto'
        });

        // gestione eventi tab
        $('#schede .descrizione').on('click', function() {
            $('#sopra .tab').tab('change tab', 'descrizione');
            $('#sotto .tab').tab('change tab', 'descrizione');
        });



        // $('#schede .posizione').on('click', );

        $('#schede .promozioni').on('click', function() {
            $('#sopra .tab').tab('change tab', 'vuoto');
            $('#sotto .tab').tab('change tab', 'promozioni');
            $('.checkbox.preferito').checkbox({
                'onChange': function() {
                    setPreferito(parseInt(negozio.id));
                    //$('.checkbox.preferito label').text(isPreferito(negozio.id)?'Disabilita notifiche promozioni':'Abilita notifiche promozioni');
                }
            });
            $('.checkbox.preferito input').prop("checked", isPreferito(negozio.id));
            console.log(isPreferito(negozio.id));
        });

        $('#schede .contatti').on('click', function() {
            $('#sopra .tab').tab('change tab', 'vuoto');
            $('#sotto .tab').tab('change tab', 'contatti');
        });

        $timeout(function() {
            $('a[target="_blank"]').click(function() {
                var url = $(this).attr('href');
                window.open(encodeURI(url), '_system', 'location=yes');
                return false;
            })
        });

        $scope.promozioni = negozio.promozioni; // TODO occorre ripulirle all'avvio, dopo aver scaricato gli aggiornamenti

        show_interface();
        // conserva questo codice ti serev nelle mappe parcheggi

        // rileva dove clicchi
        // $('.mappa').click(function(e) {
        //   console.log("{left:" + (myScroll.pointX - 5) + ", top:" + (myScroll.pointY - 49) + "},");
        //
        //   $(".punto-mappa").css({
        //     left: myScroll.pointX - 5,
        //     top: myScroll.pointY - 49
        //   });
        // });


    }
]);
