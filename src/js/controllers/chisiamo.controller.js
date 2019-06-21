app.controller('chisiamoController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Chi siamo";
        if (typeof $rootScope.negozio !== 'undefined') {
            $rootScope.negozio.logo = null;
        }
        show_interface();
    }
]);
