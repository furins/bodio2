$('.caricamento').dimmer('show');
window.isParseStarted = false;


app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/home/");

    $stateProvider
        .state('home', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'home',
                show_back: false
            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/home/",
            views: {
                "viewContent": {
                    templateUrl: "home.content.html",
                    controller: 'homeController'
                }
            },
            onEnter: function($state) {}
        })
        .state('empty', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'empty',
                show_back: false
            },
            url: "/empty/",
            views: {
                "viewContent": {
                    templateUrl: "empty.content.html",
                    controller: 'emptyController'
                }
            },
        })
        .state('empty_white', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'empty_white',
                show_back: false
            },
            url: "/empty_white/",
            views: {
                "viewContent": {
                    templateUrl: "empty.content.html",
                    controller: 'emptyController'
                }
            },
        })
        .state('negozi', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'negozi',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/negozi/",
            views: {
                "viewContent": {
                    templateUrl: "negozi.content.html",
                    controller: 'negoziController'
                }
            },
            onEnter: function($state) {}
        })
        .state('sulweb', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'sulweb',
                show_back: false
            },
            url: "/sulweb/",
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            views: {
                "viewContent": {
                    templateUrl: "sulweb.content.html",
                    controller: 'sulwebController'
                }
            }
        })
        .state('emergenze', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'emergenze',
                show_back: false
            },
            url: "/emergenze/",
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            views: {
                "viewContent": {
                    templateUrl: "emergenze.content.html",
                    controller: 'emergenzeController'
                }
            }
        })
        .state('orari', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'orari',
                show_back: false
            },
            url: "/orari/",
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            views: {
                "viewContent": {
                    templateUrl: "orari.content.html",
                    controller: 'orariController'
                }
            }
        })
        .state('posizione', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'posizione',
                show_back: false

            },
            url: "/posizione/",
            views: {
                "viewContent": {
                    templateUrl: "posizioneAuto.content.html",
                    controller: 'posizioneController'
                }
            }
        })
        .state('posizioneTreno', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'posizione',
                show_back: false

            },
            url: "/posizione/treno/",
            views: {
                "viewContent": {
                    templateUrl: "posizioneTreno.content.html",
                    controller: 'posizioneController'
                }
            }
        })
        .state('posizioneAutobus', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'posizione',
                show_back: false

            },
            url: "/posizione/autobus/",
            views: {
                "viewContent": {
                    templateUrl: "posizioneAutobus.content.html",
                    controller: 'posizioneController'
                }
            }
        })
        .state('food', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'negozi',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/food/",
            views: {
                "viewContent": {
                    templateUrl: "negozi.content.html",
                    controller: 'foodController'
                }
            },
            onEnter: function($state) {}
        })

    .state('parcheggi', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'parcheggi',
                show_back: false

            },
            url: "/parcheggi/",
            views: {
                "viewContent": {
                    templateUrl: "parcheggi.content.html",
                    controller: 'parcheggiController'
                }
            },
        })
        .state('parcheggiFoto', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'parcheggi',
                show_back: true

            },
            url: "/parcheggi/foto/",
            views: {
                "viewContent": {
                    templateUrl: "parcheggi.foto.content.html",
                    controller: 'parcheggiFotoController'
                }
            },
        })
        .state('parcheggiMappa', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'parcheggi',
                show_back: true

            },
            url: "/parcheggi/mappa/:editable/:piano/",
            views: {
                "viewContent": {
                    templateUrl: "parcheggi.mappa.content.html",
                    controller: 'parcheggiMappaController'
                }
            },
        })
        .state('serviziFood', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'servizi',
                show_back: false

            },
            url: "/servizi/food/",
            views: {
                "viewContent": {
                    templateUrl: "serviziFood.content.html",
                    controller: 'serviziRistorazioneEsternaController'
                }
            },
        })
        .state('serviziAuto', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'servizi',
                show_back: false

            },
            url: "/servizi/auto/",
            views: {
                "viewContent": {
                    templateUrl: "serviziAuto.content.html",
                    controller: 'serviziController'
                }
            },
        })
        .state('serviziAltro', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'servizi',
                show_back: false

            },
            url: "/servizi/altro/",
            views: {
                "viewContent": {
                    templateUrl: "serviziAltro.content.html",
                    controller: 'serviziEsterniController'
                }
            },
        })
        .state('chisiamo1', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo1',
                show_back: false

            },
            url: "/chisiamo/1/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo1.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo2', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo2',
                show_back: false

            },
            url: "/chisiamo/2/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo2.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo3', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo3',
                show_back: false

            },
            url: "/chisiamo/3/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo3.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo4', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo4',
                show_back: false

            },
            url: "/chisiamo/4/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo4.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo5', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo5',
                show_back: false

            },
            url: "/chisiamo/5/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo5.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo6', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo6',
                show_back: false

            },
            url: "/chisiamo/6/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo6.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo7', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo7',
                show_back: false

            },
            url: "/chisiamo/7/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo7.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('chisiamo8', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'chisiamo8',
                show_back: false

            },
            url: "/chisiamo/8/",
            views: {
                "viewContent": {
                    templateUrl: "chisiamo8.content.html",
                    controller: 'chisiamoController'
                }
            },
        })
        .state('listaSpesa', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'listaSpesa',
                show_back: false

            },
            url: "/lista/",
            views: {
                "viewContent": {
                    templateUrl: "lista.content.html",
                    controller: 'listaController'
                }
            },
        })
        .state('club', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'club',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/club/",
            views: {
                "viewContent": {
                    templateUrl: "club.iscrizione.content.html",
                    controller: 'clubController'
                }
            },
        })
        .state('clubCard', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'club_card',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/club/card/",
            views: {
                "viewContent": {
                    templateUrl: "club.card.content.html",
                    controller: 'clubCardController'
                }
            },
        })
        .state('clubPunti', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'club_punti',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/club/card/punti/",
            views: {
                "viewContent": {
                    templateUrl: "club.card.punti.html",
                    controller: 'clubCardPuntiController'
                }
            },
        })
        .state('clubScontrini', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'club_scontrini',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/club/card/scontrini/",
            views: {
                "viewContent": {
                    templateUrl: "club.card.scontrini.html",
                    controller: 'clubCardScontriniController'
                }
            },
        })
        .state('clubCardProfile', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'club_profile',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/club/profile/",
            views: {
                "viewContent": {
                    templateUrl: "club.iscrizione.profilo.html",
                    controller: 'clubProfileController'
                }
            },
        })
    .state('promozioniClubInterne', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'promozioni club',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/promozioni/club/interne/",
            views: {
                "viewContent": {
                    templateUrl: "promozioni.interne.content.html",
                    controller: 'promozioniInterneClubController'
                }
            },
            onEnter: function($state) {}
        })
        .state('promozioniClubEsterne', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'promozioni club',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/promozioni/club/esterne/",
            views: {
                "viewContent": {
                    templateUrl: "promozioni.interne.content.html",
                    controller: 'promozioniEsterneClubController'
                }
            },
            onEnter: function($state) {}
        })

    .state('temporary', {
        data: {
            // variabili che vengono iniettate nel controller parent
            page: 'negozi',
            show_back: false

        },
        resolve: {
            // da ripetere in tutti gli stati che hanno bisogno del db
            sc: ['$http', function($http) {
                return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
            }]
        },
        url: "/temporary/",
        views: {
            "viewContent": {
                templateUrl: "negozi.content.html",
                controller: 'temporaryController'
            }
        },
        onEnter: function($state) {}
    })


    .state('eventi', {
        data: {
            // variabili che vengono iniettate nel controller parent
            page: 'eventi',
            show_back: false

        },
        resolve: {
            // da ripetere in tutti gli stati che hanno bisogno del db
            sc: ['$http', function($http) {
                return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
            }]
        },
        url: "/eventi/",
        views: {
            "viewContent": {
                templateUrl: "eventi.content.html",
                controller: 'eventiController'
            }
        },
        onEnter: function($state) {}
    })

    .state('promozioni', {
        data: {
            // variabili che vengono iniettate nel controller parent
            page: 'promozioni',
            show_back: false

        },
        resolve: {
            // da ripetere in tutti gli stati che hanno bisogno del db
            sc: ['$http', function($http) {
                return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
            }]
        },
        url: "/promozioni/",
        views: {
            "viewContent": {
                templateUrl: "promozioni.content.html",
                controller: 'promozioniController'
            }
        },
        onEnter: function($state) {}
    })

    .state('promozioneDetail', {
        data: {
            // variabili che vengono iniettate nel controller parent
            page: 'promozioneDetail',
            show_back: true

        },
        resolve: {
            // da ripetere in tutti gli stati che hanno bisogno del db
            sc: ['$http', function($http) {
                return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
            }]
        },
        url: "/promozioni/:id/",
        views: {
            "viewContent": {
                templateUrl: "promozioniDetail.content.html",
                controller: 'promozioniCentroDetailController'
            }
        },
        onEnter: function($state) {}
    })

    .state('negoziDetail', {
        data: {
            // variabili che vengono iniettate nel controller parent
            page: 'negoziDetail',
            show_back: true

        },
        resolve: {
            // da ripetere in tutti gli stati che hanno bisogno del db
            sc: ['$http', function($http) {
                return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
            }]
        },
        url: "/negozi/:id/",
        views: {
            "viewContent": {
                templateUrl: "negoziDetail.content.html",
                controller: 'negoziDetailController'
            }
        },
        onEnter: function($state) {}
    })

    .state('volantiniList', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'volantiniList',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/volantini/",
            views: {
                "viewContent": {
                    templateUrl: "volantini.content.html",
                    controller: 'VolantiniListController'
                }
            },
            onEnter: function($state) {}
    })

    .state('volantiniDetail', {
            data: {
                // variabili che vengono iniettate nel controller parent
                page: 'volantiniDetail',
                show_back: false

            },
            resolve: {
                // da ripetere in tutti gli stati che hanno bisogno del db
                sc: ['$http', function($http) {
                    return genericModel.lista($http, 'shoppingcenters', false, shopping_center_id);
                }]
            },
            url: "/volantini/:id/",
            views: {
                "viewContent": {
                    templateUrl: "volantini.detail.html",
                    controller: 'VolantiniDetailController'
                }
            },
            onEnter: function($state) {}
    })
    ;


});
