function onError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

if (/iemobile/i.test(navigator.userAgent)) {
    $('html').addClass('windowsPhone');
}

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS !== true) {
    // var viewportScale = 1 / window.devicePixelRatio;
    // document.getElementsByName("viewport")[0].setAttribute("content","user-scalable=no, initial-scale="+viewportScale+", minimum-scale=0.2, maximum-scale=3, width=device-width, height=device-height, target-densitydpi=device-dpi");
}

var onDeviceReady = function($http, $scope, $interval) {
    console.log("primo event listener");

    try {
        StatusBar.hide();
        console.log('nascondo la status bar');
    } catch (e) {
        console.log(e);
    }

    var push = PushNotification.init({
        android: {
            senderID: scc_customizations.senderID,
            clearNotifications: "true"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true",
            clearBadge: "true"
        },
        windows: {}
    });



    // push.on('notification', function(data) {
    //     // data.message,
    //     // data.title,
    //     // data.count,
    //     // data.sound,
    //     // data.image,
    //     // data.additionalData
    //     // if ($.inArray(device.platform, ['iOS', 'iPhone', 'iPad', 'iPhone Simulator', 'iPad Simulator']) >= 0) {
    //     //     if (typeof(push) !== 'undefined') {
    //     //         push.setApplicationIconBadgeNumber(function(n) {
    //     //             console.log('acquisito il numero di badge attivi');
    //     //             push.setApplicationIconBadgeNumber(function() {
    //     //                 console.log('numero di badge aggiornato');
    //     //             }, function() {
    //     //                 console.log('error');
    //     //             }, n);
    //     //         })
    //     //
    //     //     } else {
    //     //         console.log('push badges non abilitato al di fuori di ios');
    //     //     }
    //     // }
    // });
    //
    push.on('error', function(e) {
        console.log(e.message);
    });

    locationService = navigator.geolocation; // cordova geolocation plugin
    if (typeof(device) !== 'undefined') {
        $scope.$apply(function() {

            $scope.soloiOS = ($.inArray(device.platform, ['iOS',
                'iPhone', 'iPad', 'iPhone Simulator',
                'iPad Simulator'
            ]) >= 0);

        });

        $('html').addClass(device.platform);

        if (($.inArray(device.platform, ['iOS', 'iPhone', 'iPad',
                'iPhone Simulator', 'iPad Simulator'
            ]) >= 0) && (parseInt(device.version.split('.')[0]) >= 7)) {
            console.log("sto utilizzando iOS7");
            console.log(device.platform);
            console.log(device.version);
            $('html').addClass('ios7');
        }

        if (($.inArray(device.platform, ['Android']) >= 0) && (parseInt(
                device.version.split('.')[0]) <= 4) && (parseInt(device.version
                .split('.')[1]) <= 4)) {
            // console.log("sto utilizzando un vecchio android");
            $('html').addClass('androidBrowser');
        }


        if ($.inArray(device.platform, ['WinCE', 'Win32NT']) >= 0) {
            // console.log("sto utilizzando un vecchio android");
            $('html').addClass('windowsPhone');
            window.alert = navigator.notification.alert; // serve a windows phones
        }
    }

    var onSuccess = function(position) {
        gpsModule.positionChanged(position.coords, $scope);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message +
            '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    // https://github.com/christocracy/cordova-plugin-background-geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
        gpsModule.positionChanged(position.coords, $scope);
    }, onError);

    document.addEventListener("resume", function() {
        console.log("app resumes");
    }, false);

    console.log("inizializzazione terminata");
    if (typeof(navigator.splashscreen) !== 'undefined') {
        navigator.splashscreen.hide();
    }

};
