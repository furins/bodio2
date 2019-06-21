var province = [
    {id: "?", prov: "Seleziona una provincia"},
    {id: "MI", prov: "Milano"},
    {id: "AG", prov: "Agrigento"},
    {id: "AL", prov: "Alessandria"},
    {id: "AN", prov: "Ancona"},
    {id: "AO", prov: "Aosta"},
    {id: "AQ", prov: "L'Aquila"},
    {id: "AR", prov: "Arezzo"},
    {id: "AP", prov: "Ascoli Piceno"},
    {id: "AT", prov: "Asti"},
    {id: "AV", prov: "Avellino"},
    {id: "BA", prov: "Bari"},
    {id: "BT", prov: "Barletta Andria Trani"},
    {id: "BL", prov: "Belluno"},
    {id: "BN", prov: "Benevento"},
    {id: "BG", prov: "Bergamo"},
    {id: "BI", prov: "Biella"},
    {id: "BO", prov: "Bologna"},
    {id: "BZ", prov: "Bolzano"},
    {id: "BS", prov: "Brescia"},
    {id: "BR", prov: "Brindisi"},
    {id: "CA", prov: "Cagliari"},
    {id: "CL", prov: "Caltanissetta"},
    {id: "CB", prov: "Campobasso"},
    {id: "CI", prov: "Carbonia Iglesias"},
    {id: "CE", prov: "Caserta"},
    {id: "CT", prov: "Catania"},
    {id: "CZ", prov: "Catanzaro"},
    {id: "CH", prov: "Chieti"},
    {id: "CO", prov: "Como"},
    {id: "CS", prov: "Cosenza"},
    {id: "CR", prov: "Cremona"},
    {id: "KR", prov: "Crotone"},
    {id: "CN", prov: "Cuneo"},
    {id: "EN", prov: "Enna"},
    {id: "FM", prov: "Fermo"},
    {id: "FE", prov: "Ferrara"},
    {id: "FI", prov: "Firenze"},
    {id: "FG", prov: "Foggia"},
    {id: "FC", prov: "Forli Cesena"},
    {id: "FR", prov: "Frosinone"},
    {id: "GE", prov: "Genova"},
    {id: "GO", prov: "Gorizia"},
    {id: "GR", prov: "Grosseto"},
    {id: "IM", prov: "Imperia"},
    {id: "IS", prov: "Isernia"},
    {id: "SP", prov: "La Spezia"},
    {id: "LT", prov: "Latina"},
    {id: "LE", prov: "Lecce"},
    {id: "LC", prov: "Lecco"},
    {id: "LI", prov: "Livorno"},
    {id: "LO", prov: "Lodi"},
    {id: "LU", prov: "Lucca"},
    {id: "MC", prov: "Macerata"},
    {id: "MN", prov: "Mantova"},
    {id: "MS", prov: "Massa Carrara"},
    {id: "MT", prov: "Matera"},
    {id: "VS", prov: "Medio Campidano"},
    {id: "ME", prov: "Messina"},
    {id: "MO", prov: "Modena"},
    {id: "MB", prov: "Monza Brianza"},
    {id: "NA", prov: "Napoli"},
    {id: "NO", prov: "Novara"},
    {id: "NU", prov: "Nuoro"},
    {id: "OG", prov: "Ogliastra"},
    {id: "OT", prov: "Olbia Tempio"},
    {id: "OR", prov: "Oristano"},
    {id: "PD", prov: "Padova"},
    {id: "PA", prov: "Palermo"},
    {id: "PR", prov: "Parma"},
    {id: "PV", prov: "Pavia"},
    {id: "PG", prov: "Perugia"},
    {id: "PU", prov: "Pesaro Urbino"},
    {id: "PE", prov: "Pescara"},
    {id: "PC", prov: "Piacenza"},
    {id: "PI", prov: "Pisa"},
    {id: "PT", prov: "Pistoia"},
    {id: "PN", prov: "Pordenone"},
    {id: "PZ", prov: "Potenza"},
    {id: "PO", prov: "Prato"},
    {id: "RG", prov: "Ragusa"},
    {id: "RA", prov: "Ravenna"},
    {id: "RC", prov: "Reggio Calabria"},
    {id: "RE", prov: "Reggio Emilia"},
    {id: "RI", prov: "Rieti"},
    {id: "RN", prov: "Rimini"},
    {id: "RM", prov: "Roma"},
    {id: "RO", prov: "Rovigo"},
    {id: "SA", prov: "Salerno"},
    {id: "SS", prov: "Sassari"},
    {id: "SV", prov: "Savona"},
    {id: "SI", prov: "Siena"},
    {id: "SR", prov: "Siracusa"},
    {id: "SO", prov: "Sondrio"},
    {id: "TA", prov: "Taranto"},
    {id: "TE", prov: "Teramo"},
    {id: "TR", prov: "Terni"},
    {id: "TO", prov: "Torino"},
    {id: "TP", prov: "Trapani"},
    {id: "TN", prov: "Trento"},
    {id: "TV", prov: "Treviso"},
    {id: "TS", prov: "Trieste"},
    {id: "UD", prov: "Udine"},
    {id: "VA", prov: "Varese"},
    {id: "VE", prov: "Venezia"},
    {id: "VB", prov: "Verbania"},
    {id: "VC", prov: "Vercelli"},
    {id: "VR", prov: "Verona"},
    {id: "VV", prov: "Vibo Valentia"},
    {id: "VI", prov: "Vicenza"},
    {id: "VT", prov: "Viterbo"}
];

app.controller('clubController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function ($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);

        $rootScope.titolo = "Digital Card";
        $scope.iscritto = localStorage.getItem('iscritto');
        $scope.proprietario = localStorage.getItem('iscritto_nome');
        $scope.privacy_policy = scc_customizations.privacy_policy;
        $scope.province = province;

        $('.ui.modal')
            .modal({
                closable: true,
                onDeny: function () {
                    return true;
                },
                onApprove: function () {
                    localStorage.removeItem('iscritto');
                    localStorage.removeItem('iscritto_nome');
                    localStorage.setItem('iscritto_al_club', false);
                    localStorage.removeItem('dati_iscrizione');
                    $scope.$apply(function () {
                        $scope.iscritto = null;
                        $scope.proprietario = null;
                        if (scc_customizations.club_qr_code === true) {
                            $('#qrcode').replaceWith('<div id="qrcode"></div>');
                        }
                    });
                }
            });

        $scope.annullaIscrizione = function () {
            $('.ui.modal')
                .modal('show');
        };


        var negozi_interni = sc.negozi.filter(dentroAlCentro);
        var negozi_esterni = sc.negozi.filter(fuoriCentro);
        $scope.promozioni_interne = determina_promozioni(sc, negozi_interni).filter(soloCard);
        $scope.promozioni_esterne = determina_promozioni(sc, negozi_esterni).filter(soloCard);

        $('.ui.checkbox').checkbox();
        if (!$('html').hasClass('windowsPhone')) {
            $('#provincia').dropdown();
        }
        $('.iscrizione form')
            .form({
                on: 'blur',
                inline: true,
                fields: {
                    azienda: {
                        identifier: 'azienda',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il nome dell\'azienda in cui lavori'
                        }]
                    },
                    nome: {
                        identifier: 'nome',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il tuo nome'
                        }]
                    },
                    cognome: {
                        identifier: 'cognome',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il tuo cognome'
                        }]
                    },
                    telefono: {
                        identifier: 'telefono',
                        // optional: true,
                        rules: [{
                            type: 'regExp[/^[03]{1}[0-9]{5,10}$/]',
                            prompt: 'Inserisci il numero di telefono'
                        }]
                    },
                    email: {
                        identifier: 'email',
                        // optional: true,
                        rules: [{
                            type: 'email',
                            prompt: 'Per favore inserisci un\'email valida'
                        }]
                    },
                    indirizzo: {
                        identifier: 'indirizzo',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci un indirizzo'
                        }]
                    },
                    citta: {
                        identifier: 'citta',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci un citta'
                        }]
                    },
                    provincia: {
                        identifier: 'provincia',
                        rules: [{
                            type: 'regExp[/^[a-zA-Z]{2}$/]',
                            prompt: 'Inserisci la sigla della provincia (2 lettere)'
                        }]
                    },
                    cap: {
                        identifier: 'cap',
                        rules: [{
                            type: 'regExp[/^[0-9]{5}$/]',
                            prompt: 'Inserisci un CAP valido'
                        }]
                    },
                    privacy: {
                        identifier: 'privacy',
                        rules: [{
                            type: 'checked',
                            prompt: 'è necessario fornire il proprio consenso al trattamento dei dati personali'
                        }]
                    }
                }
            });

        $scope.iscriviti = function () {
            $scope.error = false;
            $scope.validazione = null;

            if ($('.iscrizione form').form('is valid') === true) {
                $scope.iscrizione.privacy = $('input[name="privacy"]').is(':checked');
                $scope.loading = true;

                console.log($scope.iscrizione);

                // tutto ok, procedo
                //var url = "http://app.bodiocenter.com/api/v1/iscrizioni/?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863"; //production
                var url = scc_customizations.server_club_url + "/api/v1/iscrizioni/" + $scope.iscrizione.telefono + "/?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863"; // development
                var params = {
                    "azienda": $scope.iscrizione.azienda,
                    "nome": $scope.iscrizione.nome,
                    "cognome": $scope.iscrizione.cognome,
                    "telefono": $scope.iscrizione.telefono,
                    "email": $scope.iscrizione.email,
                    "indirizzo": $scope.iscrizione.indirizzo,
                    "cap": $scope.iscrizione.cap,
                    "citta": $scope.iscrizione.citta,
                    "provincia": $('#provincia').val(),
                    "shopping_center": "/api/v1/shoppingcenters/" + shopping_center_id + "/"
                };

                console.log('richiedo card');
                console.log($scope.iscrizione.provincia);
                $http.put(url, params).then(function (response) {
                    console.log('success');
                    console.log(response);
                    $scope.validazione = null;
                    localStorage.setItem('iscritto', response.data.codice);
                    localStorage.setItem('iscritto_nome', response.data.nome + ' ' + response.data.cognome);
                    localStorage.setItem('dati_iscrizione', JSON.stringify(response.data));
                    $scope.iscritto = response.data.codice;
                    $scope.proprietario = response.data.nome + ' ' + response.data.cognome;
                    localStorage.setItem('iscritto_al_club', true);
                    $scope.loading = false;
                }, function (response) {
                    console.log('errore');
                    console.log(response);
                    $scope.error = true;
                    $scope.validazione = "Controllate per favore i vostri dati e assicuratevi di essere connessi a" +
                        " internet. Se il problema persiste riprovare tra qualche ora.";
                    localStorage.setItem('iscritto_al_club', false);
                    $scope.loading = false;
                });
            }
        };

        show_interface();
    }
]);

app.controller('clubProfileController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function ($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);

        $rootScope.titolo = "Modifica profilo";
        $scope.iscritto = localStorage.getItem('iscritto');
        $scope.proprietario = localStorage.getItem('iscritto_nome');
        $scope.privacy_policy = scc_customizations.privacy_policy;
        $scope.aggiornamento = JSON.parse(localStorage.getItem('dati_iscrizione'));
        $scope.province = province;

        $('.ui.checkbox').checkbox();
        if (!$('html').hasClass('windowsPhone')) {
            $('select.dropdown').dropdown();
        }
        $('.aggiornamento form')
            .form({
                on: 'blur',
                inline: true,
                fields: {
                    azienda: {
                        identifier: 'azienda',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il nome dell\'azienda in cui lavori'
                        }]
                    },
                    nome: {
                        identifier: 'nome',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il tuo nome'
                        }]
                    },
                    cognome: {
                        identifier: 'cognome',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci il tuo cognome'
                        }]
                    },
                    telefono: {
                        identifier: 'telefono',
                        // optional: true,
                        rules: [{
                            type: 'regExp[/^[03]{1}[0-9]{5,10}$/]',
                            prompt: 'Inserisci il numero di telefono'
                        }]
                    },
                    email: {
                        identifier: 'email',
                        // optional: true,
                        rules: [{
                            type: 'email',
                            prompt: 'Per favore inserisci un\'email valida'
                        }]
                    },
                    indirizzo: {
                        identifier: 'indirizzo',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci un indirizzo'
                        }]
                    },
                    citta: {
                        identifier: 'citta',
                        rules: [{
                            type: 'empty',
                            prompt: 'Inserisci un citta'
                        }]
                    },
                    provincia: {
                        identifier: 'provincia',
                        rules: [{
                            type: 'regExp[/^[a-zA-Z]{2}$/]',
                            prompt: 'Inserisci la sigla della provincia (2 lettere)'
                        }]
                    },
                    cap: {
                        identifier: 'cap',
                        rules: [{
                            type: 'regExp[/^[0-9]{5}$/]',
                            prompt: 'Inserisci un CAP valido'
                        }]
                    },
                    privacy: {
                        identifier: 'privacy',
                        rules: [{
                            type: 'checked',
                            prompt: 'è necessario fornire il proprio consenso al trattamento dei dati personali'
                        }]
                    }
                }
            });

        $scope.aggiornati = function () {
            $scope.error = false;
            $scope.validazione = null;
            $scope.loading = true;

            if ($('.aggiornamento form').form('is valid') === true) {
                $scope.aggiornamento.privacy = true;


                console.log($scope.aggiornamento);

                // tutto ok, procedo
                //var url = "http://app.bodiocenter.com/api/v1/iscrizioni/?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863"; //production
                var url = scc_customizations.server_club_url + "/api/v1/iscrizioni/" + $scope.aggiornamento.telefono + "/?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863"; // development
                var params = {
                    "azienda": $scope.aggiornamento.azienda,
                    "nome": $scope.aggiornamento.nome,
                    "cognome": $scope.aggiornamento.cognome,
                    "telefono": $scope.aggiornamento.telefono,
                    "email": $scope.aggiornamento.email,
                    "indirizzo": $scope.aggiornamento.indirizzo,
                    "cap": $scope.aggiornamento.cap,
                    "citta": $scope.aggiornamento.citta,
                    "provincia": $scope.aggiornamento.provincia,
                    "shopping_center": "/api/v1/shoppingcenters/" + shopping_center_id + "/"
                };

                console.log('richiedo card');
                $http.put(url, params).then(function (response) {
                    console.log('success');
                    console.log(response);
                    $scope.validazione = null;
                    localStorage.setItem('iscritto', response.data.codice);
                    localStorage.setItem('iscritto_nome', response.data.nome + ' ' + response.data.cognome);
                    localStorage.setItem('dati_iscrizione', JSON.stringify(response.data));
                    $scope.iscritto = response.data.codice;
                    $scope.proprietario = response.data.nome + ' ' + response.data.cognome;
                    $scope.loading = false;
                    localStorage.setItem('iscritto_al_club', true);
                    $state.go('club');

                }, function (response) {
                    console.log('errore');
                    console.log(response);
                    $scope.error = true;
                    $scope.validazione = "Controllate per favore i vostri dati e assicuratevi di essere connessi a" +
                        " internet. Se il problema persiste riprovare tra qualche ora.";
                    localStorage.setItem('iscritto_al_club', false);
                    $scope.loading = false;
                });
            }
        };

        show_interface();
    }
]);


app.controller('clubCardController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function ($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);

        $rootScope.titolo = "Digital Card";
        $scope.iscritto = localStorage.getItem('iscritto');
        $scope.proprietario = localStorage.getItem('iscritto_nome');
        $scope.privacy_policy = scc_customizations.privacy_policy;


        if ((localStorage.getItem('iscritto') !== null) && (scc_customizations.club_qr_code === true)) {
            new QRCode(document.getElementById("qrcode"), localStorage.getItem('iscritto'));
        }

        show_interface();
    }
]);

app.controller('clubCardScontriniController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function ($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);

        $rootScope.titolo = "Carica punti";
        $scope.iscritto = localStorage.getItem('iscritto');
        $scope.proprietario = localStorage.getItem('iscritto_nome');
        $scope.aggiornamento = JSON.parse(localStorage.getItem('dati_iscrizione'));
        document.getElementById("scontrini_load").style.visibility = "hidden";
        show_interface();
    }
]);


function invia_scontrino() {
    console.log("inizio a trasmettere");
    document.getElementById("scontrini_load").style.visibility = "visible";
    var formdata = new FormData();
    formdata.append('cc', document.getElementById('invio_scontrino_cc').value);
    formdata.append('card', document.getElementById('invio_scontrino_card').value);
    formdata.append('rich', "carica");
    formdata.append('immagine', document.getElementById('capture').files[0]);

    if (document.getElementById('capture') && document.getElementById('capture').files.length > 0) {
        document.getElementById('testo_capture').innerHTML = 'caricamento in corso...';
        $.ajax({
            url: scc_customizations.scontrini_server,
            type: "POST",
            data: formdata,
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            beforeSend: function () {

            },
            complete: function () {
                document.getElementById('testo_capture').innerHTML = '';
            },
            success: function (response) {
                if (response !== null && response !== '') {
                var obj = JSON && JSON.parse(response.replace(
                    'retvar', ''));
                if (typeof obj.card !== 'undefined') {
                    alert("scontrino inserito correttamente!");
                    localStorage.setItem('saldoPunti', obj.saldoPunti || 0);
                    localStorage.setItem('scontriniDaConfermare', obj.scontriniDaConfermare || 0);
                    localStorage.setItem('scontrini', JSON.stringify(obj.scontrini));
                    localStorage.setItem('scontriniCaricati', obj.scontriniCaricati || 0);
                    document.getElementById('testo_capture').innerHTML = '';
                    document.getElementById("scontrini_load").style.visibility = "hidden";
                } else {
                    alert(
                        'Si è verificato un errore, riprova più tardi.'
                    );
                    console.log(obj);
                    document.getElementById('testo_capture').innerHTML = '';
                    document.getElementById("scontrini_load").style.visibility = "hidden";
                }
                } else {
                    alert(
                        'Si è verificato un errore, riprova più tardi.'
                    );
                    console.log(obj);
                    document.getElementById('testo_capture').innerHTML = '';
                    document.getElementById("scontrini_load").style.visibility = "hidden";
                }
            }, dataType: 'text'
        });
    } else {
        alert("Nessuna immagine caricata");
        document.getElementById('testo_capture').innerHTML = '';
        document.getElementById("scontrini_load").style.visibility = "hidden";
    }
}


app.controller('clubCardPuntiController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function ($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);

        $rootScope.titolo = "Raccolta punti";
        $scope.iscritto = localStorage.getItem('iscritto');
        $scope.proprietario = localStorage.getItem('iscritto_nome');
        var aggiornamento = JSON.parse(localStorage.getItem('dati_iscrizione'));
        $scope.aggiornamento = aggiornamento;

        $scope.punti = localStorage.getItem('saldoPunti') || 0;
        $scope.scontriniDaAnalizzare = localStorage.getItem('scontriniDaConfermare') || 0;

        $scope.scontrini_caricati = localStorage.getItem('scontriniCaricati') || 0;
        var scontrini = localStorage.getItem('scontrini');
        if (scontrini !== null && scontrini !== 'undefined') {
            try{
                scontrini = JSON.parse(scontrini);
            } catch(e){
                console.log(e);
                scontini = [];
            }

            if (scontrini.length > 0) {
                var risposta = '';
                var nuovi_scontrini = [];
                for (var scontrino_archiviato in scontrini) {
                    var data_array = scontrini[scontrino_archiviato].data.split(/[-\s:]/);
                    var elemento = {
                        descrizione: 'Scontrino del ' + data_array[2] + '/' + data_array[1] + '/' + data_array[0] + ', caricato alle ore ' + data_array[3] + ':' + data_array[4]
                    };
                    if (scontrini[scontrino_archiviato].stato === 'Da elaborare') {
                        elemento.stato = 'IN ELABORAZIONE';
                        elemento.colore = 'yellow';
                    } else if (scontrini[scontrino_archiviato].punti > 0) {
                        elemento.stato = scontrini[scontrino_archiviato].punti + ' PUNTO/I!';
                        elemento.colore = 'green';
                    } else {
                        elemento.stato = 'RIFIUTATO';
                        elemento.colore = 'red';
                    }
                    nuovi_scontrini.push(elemento);
                }

                scontrini = nuovi_scontrini;
            }

        }
        $scope.scontrini = scontrini;
        $scope.loading = true;
        show_interface();

        console.log("chiamata ajax");

        $http.get(scc_customizations.scontrini_server+'?cc=6&rich=getscontrini&card='+aggiornamento.telefono).then(
             function (response) {
                console.log(response);
                try {
                    if (response !== '') {
                        var obj = JSON && JSON.parse(response.replace(
                            'retvar', ''));
                        if (typeof obj.card !== 'undefined') {
                            console.log("aggiorno dati");
                            console.log(obj);
                            localStorage.setItem('saldoPunti', obj.saldoPunti||0);
                            localStorage.setItem('scontriniDaConfermare', obj.scontriniDaConfermare||0);
                            localStorage.setItem('scontrini', JSON.stringify(obj.scontrini));
                            localStorage.setItem('scontriniCaricati', obj.scontriniCaricati||0);
                            $scope.punti = obj.saldoPunti || 0;
                            $scope.scontriniDaAnalizzare = obj.scontriniDaConfermare || 0;
                            $scope.scontrini = obj.scontrini;
                            $scope.scontrini_caricati = obj.scontriniCaricati || 0;
                            $scope.loading = false;
                        } else {
                            alert(
                                'Errore.'
                            );
                            console.log(obj);
                            $scope.loading = false;
                        }
                    } else {
                        $scope.loading = false;
                        console.log('nessuna risposta.');
                    }
                } catch (errore) {
                    console.log("Errore nel parsing.");
                    console.log(errore);
                    $scope.loading = false;
                }
            },  function(){
                console.log("Errore di connessione.");
                console.log(errore);
                $scope.loading = false;
            });
    }
]);
