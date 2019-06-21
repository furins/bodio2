
app.controller('parcheggiMappaController', ['$scope', '$http', '$state', '$stateParams', '$rootScope',
    function($scope, $http, $state, $stateParams, $rootScope) {
        var image_width;
        var image_height;

        image_width = 320;
        image_height = 532;

        var pos = {
            top: 0,
            left: 0
        };
        $(".punto-mappa").css(pos);

        $scope.aggiorna_mappa = function(piano) {
            if (piano == -1) {
                $('.pesterno').removeClass('yellow');
                $('.pinterrato').addClass('yellow');
                image_width = 320;
                image_height = 532;
                $('.mappa-zoomabile').attr('src', 'img/parcheggi_sotto@2x.png');
                //TODO mostra la mappa giusta
            } else {
                image_width = 320;
                image_height = 294;
                $('.pesterno').addClass('yellow');
                $('.pinterrato').removeClass('yellow');
                //TODO mostra la mappa giusta
                $('.mappa-zoomabile').attr('src', 'img/parcheggi_sopra@2x.png');
            }


            if ($stateParams['editable'] == 'true') {
                localStorage.setItem('piano', piano);
            }
        };


        var posizione_auto = localStorage.getItem('posizione_auto');
        $scope.piano = $stateParams['piano'];
        // il piano viene sempre passato. attivo il bottone e la mappa giusti
        $scope.aggiorna_mappa($stateParams['piano']);


        $scope.editabile = $stateParams['editable'];
        var image_ratio = image_width / image_height;

        var myScroll = new IScroll('.mappa', {
            zoom: true,
            scrollY: true,
            scrollX: true,
            freeScroll: true,
            click: true,
        });


        // mostra il punto sulla mappa
        if (posizione_auto !== null) {
            posizione_auto = posizione_auto.split('-');
            pos = {
                left: parseInt(posizione_auto[0]),
                top: parseInt(posizione_auto[1])
            }
            // pos.left = myScroll.scrollerWidth * pos.left / image_width + 5 * myScroll.scrollerWidth / image_width - 5;
            // pos.top = (myScroll.scrollerWidth / image_ratio) * pos.top / image_height + 5 * (myScroll.scrollerWidth / image_width) - 5; //riferito alla dimensione dell'immagine, in proporzione a 320

            $('.punto-mappa').css(pos);
        } else {
            console.log("posizione non nota");
        }



        if ($stateParams['editable'] == 'true') {
            $rootScope.titolo = "Premi sul posto auto";
            //rileva dove clicchi
            $scope.editable = true;
            $('.mappa').click(function(e) {
                pos = {
                    left: ((myScroll.pointX - myScroll.absStartX - 22) / myScroll.scale),
                    top: ((myScroll.pointY - myScroll.absStartY - 103) / myScroll.scale)
                }
                // pos.left = myScroll.scrollerWidth * pos.left / image_width + 5 * myScroll.scrollerWidth / image_width - 5;
                // pos.top = (myScroll.scrollerWidth / image_ratio) * pos.top / image_height + 5 * (myScroll.scrollerWidth / image_width) - 5; //riferito alla dimensione dell'immagine, in proporzione a 320
                console.log('image_width: '+image_width);
                console.log('image_height: '+image_height);
                console.log('myScroll.absStartX: '+myScroll.absStartX);
                console.log('myScroll.absStartY: '+myScroll.absStartY);
                console.log('myScroll.pointX: '+myScroll.pointX);
                console.log('myScroll.pointY: '+myScroll.pointY);
                console.log('myScroll.scale: '+myScroll.scale);
                console.log('posizione_auto '+ pos.left + ' … ' + pos.top);
                localStorage.setItem('posizione_auto', pos.left + '-' + pos.top);

                $(".punto-mappa").css(pos);
            });
        } else {
            $scope.editable = false;
            $rootScope.titolo = "Dove ho parcheggiato?";
        }

        show_interface();

    }
]);
