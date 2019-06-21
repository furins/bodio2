app.controller('posizioneController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        prepare_interface($rootScope);
        $rootScope.titolo = "Come raggiungerci";

        $rootScope.apriNavigatore = function() {
            if (typeof(launchnavigator) !== 'undefined') {
                launchnavigator.navigate([scc_customizations.latitude, scc_customizations.longitude]);
            } else {
                apriUrl("geo:" + scc_customizations.latitude + "," + scc_customizations.longitude);
            }
        };
        show_interface();
    }
]);
