app.controller('promozioniInterneClubController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);
        $rootScope.titolo = "Promozioni Club";
        var negozi_interni = sc.negozi.filter(dentroAlCentro);
        var negozi_esterni = sc.negozi.filter(fuoriCentro);
        $scope.promozioni_interne = determina_promozioni(sc, negozi_interni).filter(soloCard);
        $scope.promozioni_esterne = determina_promozioni(sc, negozi_esterni).filter(soloCard);
        $scope.promozioni = $scope.promozioni_interne;
        $scope.ha_promozioni_esterne = scc_customizations.ha_promozioni_esterne;
        show_interface();
    }
]);
