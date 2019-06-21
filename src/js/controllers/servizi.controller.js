app.controller('serviziController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Servizi";
        if (typeof $rootScope.negozio !== 'undefined') {
            $rootScope.negozio.logo = null;
        }
        $scope.apriservizio = function(sref, sref_params){
            console.log(sref);
            console.log(sref_params);
            if ((typeof(sref_params) === 'undefined') || (sref_params === '') || (sref_params === null )) {
                $state.go(sref);
                return false;
            } else {
                $state.go(sref, sref_params);
                return false;
            }
        };
        show_interface();
    }
]);

app.controller('serviziRistorazioneEsternaController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Servizi";
        if (typeof $rootScope.negozio !== 'undefined') {
            $rootScope.negozio.logo = null;
        }
        if (typeof(cordova.InAppBrowser) !== 'undefined'){
            var ref = cordova.InAppBrowser.open('http://www.bodiocenter.com/sito/pagine/servizi_ristorazione_phone.php', '_blank');
        }
        show_interface();
    }
]);

app.controller('serviziEsterniController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Servizi";
        if (typeof $rootScope.negozio !== 'undefined') {
            $rootScope.negozio.logo = null;
        }
        if (typeof(cordova.InAppBrowser) !== 'undefined'){
            var ref = cordova.InAppBrowser.open('http://www.bodiocenter.com/sito/pagine/servizi_ext_phone.php', '_blank');
        }
        show_interface();
    }
]);
