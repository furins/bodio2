function getPromoPrenotate() {
    var prenotate = localStorage.getItem('prenotataSH') || '[]';
    return JSON.parse(prenotate);
}


function isPromoPrenotata(id) {
    var prenotate = getPromoPrenotate();
    for (var i = 0; i < prenotate.length; i++) {
        if (prenotate[i] === id) {
            return true;
        }
    }
    return false;
}


function aggiungiAllElencoPromo(element) {
    var prenotate = getPromoPrenotate();
    var posizione = inArray(prenotate, function(e) {
        return e === element
    });
    if (posizione === -1) {
        prenotate.push(element);
        localStorage.setItem('prenotataSH', JSON.stringify(prenotate));
    }
};


function rimuoviDallElencoPromo(element) {
    var prenotate = getPromoPrenotate();
    var posizione = inArray(prenotate, function(e) {
        return e === element
    });
    if (posizione > -1) {
        prenotate.splice(posizione, 1);
        localStorage.setItem('prenotataSH', JSON.stringify(prenotate));
    }
}

function setPromoPrenotata(id, $http, $q) {

    // ritorna un valore true se è stata inserita una promo, false altrimenti
    // ritorna una promise

    return $q(function(resolve, reject) {
        var baseurl = scc_customizations.server_club_url+'/api/v1/prenotazioni/';
        var codice_card = localStorage.getItem('iscritto');
        var url_convenzione = '/api/v1/promozioni/' + id + '/';
        var dati_iscrizione = JSON.parse(localStorage.getItem('dati_iscrizione'));

        // dati iscrizione deve essere definito a questo punto. Se non lo fosse non potrei aver visualizzato le promo.



        if (codice_card === null) {
            // condizione 1. l'utente non ha ancora una card
            reject({
                'error': 1,
                'message': 'occorre iscriversi al club prima!'
            });
        } else {
            $http.get(baseurl + '?telefono=' + dati_iscrizione.telefono + '&convenzione=' + id+'&codice='+dati_iscrizione.codice).
            then(function(response) {
                // condizione 2.1 il server ha comunicato eventuali altre promozioni del cliente
                if (response.data.meta.total_count > 0) {
                    // condizione 3.1 c'è già una promozione (o più di una associata al cliente). Evito di inserirne altre. Aggiorno il mio db interno.
                    resolve('prenotazione precedentemente aggiunta sul server');
                } else {
                    // condizione 3.2 aggiungo prenotazione
                    var params = {
                        "telefono": dati_iscrizione.telefono,
                        "codice": dati_iscrizione.codice,
                        "convenzione": url_convenzione,
                        "shopping_center": "/api/v1/shoppingcenters/" + shopping_center_id + "/"
                    };

                    $http.post(baseurl + '?username=indalo&api_key=6ca8ed17381d56bd5540484722c2422a60d34863', params).
                    then(function(response) {
                        // condizione 4.1 prenotazione aggiunta
                        resolve('prenotazione aggiunta sul server')
                    }, function(response) {
                        // promozione 4.2 errore lato server
                        console.log(response);
                        reject({
                            'error': 2,
                            'message': 'impossibile aggiungere la prenotazione in questo momento'
                        });
                    });
                }
            }, function(response) {
                // condizione 2.2 il server ha restituito un errore
                // il server è programmato per rispondere sempre, quindi c'è un problema sul server stesso.
                reject({
                    'error': 3,
                    'message': 'impossibile verificare la prenotazione in questo momento'
                });
            });
        }
    });


}


function removePromoPrenotata(id, $http, $q) {

    // ritorna un valore true se è stata inserita una promo, false altrimenti
    // ritorna una promise

    return $q(function(resolve, reject) {
        var baseurl = 'http://app.bodiocenter.com/api/v1/prenotazioni/';
        var codice_card = JSON.parse(localStorage.getItem('dati_iscrizione'));
        var url_convenzione = '/api/v1/promozioni/' + id + '/';


        if (codice_card === null) {
            // condizione 1. l'utente non ha ancora una card
            reject({
                'error': 1,
                'message': 'occorre iscriversi al club prima!'
            });
        } else {
            $http.get(baseurl + '?telefono=' + codice_card + '&convenzione=' + id).
            then(function(response) {


                    // condizione 2.1 il server ha comunicato eventuali altre promozioni del cliente
                    if (response.data.meta.total_count > 0) {
                        // condizione 3.1 c'è già una promozione (o più di una associata al cliente). Evito di inserirne altre. Aggiorno il mio db interno.
                        var chain = $q.when();
                        response.data.objects.forEach(function(item){
                            chain = chain.then(
                                function(){
                                    console.log('cancello '+item.id);
                                    return $http.delete(baseurl + item.id + '/');
                                }
                            );
                        });
                        chain.then(function(){
                            resolve('completato il loop');
                        });
                    } else {
                        resolve('prenotazione già rimossa dal server');
                    }
                },
                function(response) {
                    // condizione 2.2 il server ha restituito un errore
                    // il server è programmato per rispondere sempre, quindi c'è un problema sul server stesso.
                    reject({
                        'error': 3,
                        'message': 'impossibile verificare la prenotazione in questo momento'
                    });
                });
        }
    });


}



app.controller('promozioniCentroDetailController', ['$scope', '$http', '$state', 'sc', '$stateParams', '$timeout', '$rootScope', '$q',
    function($scope, $http, $state, sc, $stateParams, $timeout, $rootScope, $q) {
        prepare_interface($rootScope);

        var id = parseInt($stateParams.id);
        $rootScope.titolo = "Convenzioni";

        var promozione;
        var negozi = sc.negozi;
        for (var i = 0, iLen = negozi.length; i < iLen; i++) {
            for (var j = 0, jLen = negozi[i].promozioni.length; j < jLen; j++) {
                var promo = negozi[i].promozioni[j];
                var stato_prenotazione = 'prenotabile';
                if (promo.url_richiesta_servizio.trim()!=="") {
                    stato_prenotazione = 'con_url';
                } else if (promo.chiama_per_prenotare === true) {
                    if (negozi[i].telefono.trim() !== '') {
                        stato_prenotazione = 'con_telefono';
                    }
                } else if (promo.email_per_prenotare === true) {
                    if (negozi[i].email.trim() !== '') {
                        stato_prenotazione = 'con_email';
                    }
                } else if (isPromoPrenotata(promo.id)) {
                    stato_prenotazione = 'prenotata';
                }
                console.log(stato_prenotazione);
                if (promo.id === id) {
                    promozione = {
                        'data_inizio': promo.data_inizio,
                        'data_fine': promo.data_fine,
                        'data_completa': 'dal ' + formattaData(promo.data_inizio),
                        'descrizione': promo.descrizione,
                        'allegato': promo.allegato,
                        'id': promo.id,
                        'nome': promo.nome,
                        'cat_promo': promo.cat_promo,
                        'immagine': promo.immagine,
                        'immagineThumb': promo.immagineThumb,
                        'solo_per_possessori_card': promo.solo_per_possessori_card,
                        'url_richiesta_servizio': promo.url_richiesta_servizio,
                        'stato_prenotazione': stato_prenotazione,
                        'prenotata': isPromoPrenotata(promo.id),
                        'negozio': {
                            'id': negozi[i].id,
                            'nome': negozi[i].nome,
                            'indirizzo': negozi[i].indirizzo,
                            'email': negozi[i].email,
                            'telefono': negozi[i].telefono,
                            'web': negozi[i].web,
                            'preferito': isPreferito(negozi[i].id)
                        }
                    }
                }
            }
        }
        $scope.promozione = promozione;
        $scope.iscritto = localStorage.getItem('iscritto');


        $timeout(function() {
            $('a[target="_blank"]').click(function() {
                var url = $(this).attr('href');
                window.open(encodeURI(url), '_system', 'location=yes');
                return false;
            })
        });

        $scope.rimuovi = function(promozione) {
            $('a.ui.fluid.orange.button.prenotazione').addClass('loading');
            var newid = parseInt(promozione.id);
            removePromoPrenotata(newid, $http, $q).then(
                function(response) {
                    console.log(response);

                    rimuoviDallElencoPromo(id);
                    promozione.prenotata = false;
                    $scope.promozione.stato_prenotazione = 'prenotabile';
                    $('a.ui.fluid.orange.button.prenotazione').removeClass('loading');
                },
                function(response) {
                    console.log(response);
                    if (response.error === 1) {
                        // occorre iscriversi al club
                        console.log(response.message);
                    } else if (response.error === 2) {
                        // impossibile aggiungere la promo
                        console.log(response.message);
                    } else if (response.error === 3) {
                        // impossibile verificare se la promo è già inserita
                        console.log(response.message);
                    } else {
                        console.log("errore totalmente inatteso, non so cosa fare.");
                    }
                    promozione.prenotata = isPromoPrenotata(id);
                    if (promozione.prenotata) {
                        $scope.promozione.stato_prenotazione = 'prenotata';
                    } else {
                        $scope.promozione.stato_prenotazione = 'prenotabile';
                    }
                    $('a.ui.fluid.orange.button.prenotazione').removeClass('loading');
                }
            );
        }

        $scope.prenota = function(promozione) {
            var newid = parseInt(promozione.id);
            $('a.ui.fluid.primary.button.prenotazione').addClass('loading');
            setPromoPrenotata(newid, $http, $q).then(
                function(response) {
                    console.log(response);
                    $('a.ui.fluid.primary.button.prenotazione').removeClass('loading');
                    aggiungiAllElencoPromo(id);
                    promozione.prenotata = true;
                    $scope.promozione.stato_prenotazione = 'prenotata';
                },
                function(response) {
                    $('a.ui.fluid.primary.button.prenotazione').removeClass('loading');
                    console.log(response);
                    if (response.error === 1) {
                        // occorre iscriversi al club
                        console.log(response.message);
                    } else if (response.error === 2) {
                        // impossibile aggiungere la promo
                        console.log(response.message);
                    } else if (response.error === 3) {
                        // impossibile verificare se la promo è già inserita
                        console.log(response.message);
                    } else {
                        console.log("errore totalmente inatteso, non so cosa fare.");
                    }
                    promozione.prenotata = false;
                    $scope.promozione.stato_prenotazione = 'prenotabile';
                }
            );
        }

        show_interface();
    }
]);


app.controller('promozioniController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);
        $rootScope.titolo = "Convenzioni";
        if ((typeof(sc) !== 'undefined') && (typeof(sc) !== 'negozi')) {
            $scope.promozioni = determina_promozioni(sc, sc.negozi);
            $scope.volantini = sc.volantini;
            $('.item img')
                .visibility({
                    type: 'image',
                    transition: 'fade in',
                    duration: 1000
                });
        }
        show_interface();
    }
]);



function determina_promozioni(sc, negozi) {
    var promozioni = [];
    var oggi = new Date();
    for (var i = 0, iLen = negozi.length; i < iLen; i++) {
        for (var j = 0, jLen = negozi[i].promozioni.length; j < jLen; j++) {
            var promo = negozi[i].promozioni[j];
            var inizio = new Date(promo.inizio_visualizzazione);
            var fine = new Date(promo.data_fine);
            var data_completa = '';
            fine.setDate(fine.getDate() + 1);
            if ((fine > oggi) && (inizio <= oggi)) {
                if (promo.data_inizio > oggi) {
                    data_completa = 'dal ' + formattaData(promo.data_inizio) + ' ';
                }
                //data_completa += 'fino al ' + formattaData(promo.data_fine);
                var newpromo = {
                    'data_inizio': promo.data_inizio,
                    'data_fine': promo.data_fine,
                    'data_completa': data_completa,
                    'descrizione': promo.descrizione,
                    'allegato': promo.allegato,
                    'id': promo.id,
                    'immagine': promo.immagine,
                    'immagineThumb': promo.immagineThumb,
                    'solo_per_possessori_card': promo.solo_per_possessori_card,
                    'nome': promo.nome,
                    'cat_promo': promo.cat_promo,
                    'prenotata': isPromoPrenotata(promo.id),
                    'negozio': {
                        'id': negozi[i].id,
                        'nome': negozi[i].nome,
                        'indirizzo': negozi[i].indirizzo,
                        'email': negozi[i].email,
                        'telefono': negozi[i].telefono,
                        'web': negozi[i].web,
                        'preferito': isPreferito(negozi[i].id),
                        'area': negozi[i].area
                    }
                };
                promozioni.push(newpromo);
            }
        }
    }
    return promozioni;
}
