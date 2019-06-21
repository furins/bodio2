$('.sidebar').sidebar('attach events', '.toggle_sidebar'); // attivo la sidebar in tutte le pagine

function date_format(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var anno = date.getFullYear();
    var mese = date.getMonth() + 1;
    var giorno = date.getDate();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    mese = mese < 10 ? '0' + mese : mese;
    giorno = giorno < 10 ? '0' + giorno : giorno;
    return "" + anno + mese + giorno + hours + minutes + seconds;
}

function json_encode(mixed_val) {
    //       discuss at: http://phpjs.org/functions/json_encode/
    //      original by: Public Domain (http://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Michael White
    //         input by: felix
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //        example 1: json_encode('Kevin');
    //        returns 1: '"Kevin"'

    /*
         http://www.JSON.org/json2.js
         2008-11-19
         Public Domain.
         NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
         See http://www.JSON.org/js.html
       */
    var retVal, json = this.window.JSON;
    try {
        if (typeof json === 'object' && typeof json.stringify === 'function') {
            // Errors will not be caught here if our own equivalent to resource
            retVal = json.stringify(mixed_val);
            //  (an instance of PHPJS_Resource) is used
            if (retVal === undefined) {
                throw new SyntaxError('json_encode');
            }
            return retVal;
        }

        var value = mixed_val;

        var quote = function(string) {
            var escapable =
                /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var meta = {
                // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
                        .toString(16))
                    .slice(-4);
            }) + '"' : '"' + string + '"';
        };

        var str = function(key, holder) {
            var gap = '';
            var indent = '    ';
            // The loop counter.
            var i = 0;
            // The member key.
            var k = '';
            // The member value.
            var v = '';
            var length = 0;
            var mind = gap;
            var partial = [];
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value);

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null';
                    }
                    if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&
                            value instanceof window.PHPJS_Resource)) {
                        throw new SyntaxError('json_encode');
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [];

                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind +
                            ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                        '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                case 'undefined':
                    // Fall-through
                case 'function':
                    // Fall-through
                default:
                    throw new SyntaxError('json_encode');
            }
        };

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        });

    } catch (err) {
        // Todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if (!(err instanceof SyntaxError)) {
            throw new Error('Unexpected error type in json_encode()');
        }
        this.php_js = this.php_js || {};
        // usable by json_last_error()
        this.php_js.last_error_json = 4;
        return null;
    }
}


function strtr(str, from, to) {
    //  discuss at: http://phpjs.org/functions/strtr/
    // original by: Brett Zamir (http://brett-zamir.me)
    //    input by: uestla
    //    input by: Alan C
    //    input by: Taras Bogach
    //    input by: jpfle
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  depends on: krsort
    //  depends on: ini_set
    //   example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
    //   example 1: strtr('hi all, I said hello', $trans)
    //   returns 1: 'hello all, I said hi'
    //   example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
    //   returns 2: 'aaabaaccasdeooo'
    //   example 3: strtr('ääääääää', 'ä', 'a');
    //   returns 3: 'aaaaaaaa'
    //   example 4: strtr('http', 'pthxyz','xyzpth');
    //   returns 4: 'zyyx'
    //   example 5: strtr('zyyx', 'pthxyz','xyzpth');
    //   returns 5: 'http'
    //   example 6: strtr('aa', {'a':1,'aa':2});
    //   returns 6: '2'

    var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;

    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
        // Not thread-safe; temporarily set to true
        tmpStrictForIn = this.ini_set('phpjs.strictForIn', false);
        from = this.krsort(from);
        this.ini_set('phpjs.strictForIn', tmpStrictForIn);

        for (fr in from) {
            if (from.hasOwnProperty(fr)) {
                tmpFrom.push(fr);
                tmpTo.push(from[fr]);
            }
        }

        from = tmpFrom;
        to = tmpTo;
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = from.length;
    fromTypeStr = typeof from === 'string';
    toTypeStr = typeof to === 'string';

    for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
            istr = str.charAt(i);
            for (j = 0; j < lenFrom; j++) {
                if (istr == from.charAt(j)) {
                    match = true;
                    break;
                }
            }
        } else {
            for (j = 0; j < lenFrom; j++) {
                if (str.substr(i, from[j].length) == from[j]) {
                    match = true;
                    // Fast forward
                    i = (i + from[j].length) - 1;
                    break;
                }
            }
        }
        if (match) {
            ret += toTypeStr ? to.charAt(j) : to[j];
        } else {
            ret += str.charAt(i);
        }
    }

    return ret;
}

function base64_decode(data) {
    //  discuss at: http://phpjs.org/functions/base64_decode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    // bugfixed by: Pellentesque Malesuada
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: base64_decode('YQ===');
    //   returns 2: 'a'
    //   example 3: base64_decode('4pyTIMOgIGxhIG1vZGU=');
    //   returns 3: '✓ à la mode'

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');

    return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
}

function base64_encode(data) {
    //  discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafał Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    //   example 1: base64_encode('Kevin van Zonneveld');
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a');
    //   returns 2: 'YQ=='
    //   example 3: base64_encode('✓ à la mode');
    //   returns 3: '4pyTIMOgIGxhIG1vZGU='

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = unescape(encodeURIComponent(data));

    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


/*
 * ricerca_fulltext_negozi è una funzione pensata per integrarsi con Angular e filtrare i negozi non solo sulla base del nome ma anche della categoria degli stessi
 */
var ricerca_fulltext_negozi = function($scope, negozio) {
    var query = $scope.query.toLowerCase(),
        fullsearch = negozio.nome;
    for (var i = 0; i < negozio.categorie.length; i++) {
        fullsearch += ' ' + negozio.categorie[i].nome;
    }

    fullsearch = fullsearch.toLowerCase();
    if (fullsearch.indexOf(query) != -1) {
        return true;
    }
    return false;
};

/*
 * show_interface rimuove il loading e mostra l'interfaccia utente
 */
function show_interface() {
    $('.caricamento').dimmer('hide');
    $('body').removeClass('not-loaded');
}

/*
 * prepare_interface azzera alcuni elementi dell'interfaccia. Da chiamare all'avvio di un controller di pagina
 */

function prepare_interface($rootScope) {
    $rootScope.titolo = '';
    $rootScope.negozio = {};
}



/*
 * mostra solo gli elementi la cui categoria ha @attributo con valore pari a @valore
 */
function verifica_attributo(elemento, attributo, valore) {
    for (var i = 0, iLen = elemento.categorie.length; i < iLen; i++) {
        if (elemento.categorie[i][attributo] == valore) {
            return true;
        }
    }
    return false;
}

/* determino quali negozi sono dentro al centro */
function dentroAlCentro(elemento) {
    return elemento.area >= 0;
}



/* determino quali negozi NON sono dentro al centro */
function fuoriCentro(elemento) {
    return !dentroAlCentro(elemento);
}


/* determino quali promozioni sono esclusive per i possessori della card */
function soloCard(elemento) {
    return elemento.solo_per_possessori_card == true;
}

// /* determino quali negozi sono dentro al centro */
// function soloCard(elemento) {
//     console.log(elemento);
//     return ((elemento.cat_promo === 'Solo per totem') || (elemento.solo_per_possessori_card == true))
// }

function formattaData(da) {
    var m_names = new Array("gennaio", "febbraio", "marzo",
        "aprile", "maggio", "giugno", "luglio", "agosto", "settembre",
        "ottobre", "novembre", "dicembre");

    var d = new Date(da);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return curr_date + " " + m_names[curr_month] + " " + curr_year;
}

function opacizzaPallini(current, l) {
    for (var i = 0, iLen = l; i < iLen; i++) {
        if (i !== current) {
            $("#puntatore_" + i).css('opacity', "0.4");
        } else {
            $("#puntatore_" + i).css('opacity', "1");
        }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 * Pagina vuota: viene utilizzata esclusivamente per predisporre lo splash screen, quindi di fatto l'unica funzione è show_interface
 */
app.controller('emptyController', [show_interface]);


// controllers

app.controller('homeController', ['$scope', '$http', '$state', 'sc', '$sce', '$rootScope',
    function($scope, $http, $state, sc, $sce, $rootScope) {
        if (typeof $rootScope.negozio !== 'undefined'){
            $rootScope.negozio.logo = null;
        }
        var oggi = new Date();
        var n = oggi.getDay();
        if (n == 0) {
            n = 6; // domenica
        } else {
            n = n - 1;
        }
        if (sc) {
            if (sc.orario && sc.orario.length) {
                $scope.orario = sc.orario[n].orario;
            } else {
                console.log("orario non recuperato");
                $scope.orario = scc_customizations.orario_default;
            }
        } else {
            console.log("dati non disponibili");
            $scope.orario = scc_customizations.orario_default;
        }
        $rootScope.titolo = "";
        $scope.mostra_logo = scc_customizations.show_logo_in_home;
        $scope.orario_messaggio = scc_customizations.orario_messaggio;
        $scope.raggiungerci_titolo = scc_customizations.raggiungerci_titolo;
        $scope.raggiungerci_sottotitolo = scc_customizations.raggiungerci_sottotitolo;

        show_interface();
        if ($('body').hasClass('first-run')) {
            setTimeout(function() {
                $('.bottoni_sotto').transition({
                    'duration': '1s',
                    'animation': 'fly up in'
                });
                $('body').removeClass('first-run');
            }, 500);
        }
    }
]);


app.controller('orariController', ['$scope', '$http', '$state', 'sc', '$rootScope', '$sce',
    function($scope, $http, $state, sc, $rootScope, $sce) {
        $rootScope.titolo = "Orari e aperture";
        $scope.aperture_straordinarie = sc.aperture_straordinarie;
        $scope.chiusure = sc.chiusure;
        if (sc.dettagli_orario.length > 0) {
            $scope.dettagli_orario = sc.dettagli_orario[0].testo;
        }
        console.log(sc);
        show_interface();

    }
]);

app.controller('sulwebController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Scopri cosa c'è di nuovo";
        show_interface();

    }
]);

app.controller('emergenzeController', ['$rootScope', '$http', '$state',
    function($rootScope, $http, $state) {
        prepare_interface($rootScope);
        $rootScope.titolo = "Hai bisogno di aiuto?";
        show_interface();
    }
]);




app.controller('parcheggiController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Dove ho parcheggiato?";
        $scope.fotoUrl = localStorage.getItem('foto');
        $scope.posizione_auto = localStorage.getItem('posizione_auto');
        $scope.piano = localStorage.getItem('piano');
        if ($scope.piano == null) {
            $scope.piano = 0;
        }
        if (typeof(Camera) !== 'undefined') {
            var cameraSuccess = function(imageData) {
                console.log("photo taken: " + imageData);
                localStorage.setItem('foto', imageData);
                $scope.$apply(function() {
                    $scope.fotoUrl = imageData;
                });
            };

            var cameraError = function(message) {
                console.log("an error occurred: " + message);
            };


            $scope.scattaFoto = function() {
                console.log("take photo...");
                console.log(cameraSuccess);
                navigator.camera.getPicture(cameraSuccess, cameraError, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    saveToPhotoAlbum: false
                });
            }
        } else {
            $scope.scattaFoto = function() {
                if (navigator.notification) {
                    navigator.notification.alert(
                        "Fotocamera non disponibile", // message
                        function() {}, // callback
                        'Errore', // title
                        'OK' // buttonName
                    );
                } else {
                    alert('Fotocamera non disponibile');
                }

            }
        }

        $scope.cleanup = function() {
            localStorage.removeItem('foto');
            localStorage.removeItem('posizione_auto');
            localStorage.removeItem('piano');
            $scope.posizione_auto = null;
            $scope.fotoUrl = null;
            if (navigator.camera) {
                navigator.camera.cleanup(function() {
                    console.log("Camera cleanup success.")
                }, function(message) {});
            }
            if (navigator.notification) {
                navigator.notification.alert(
                    'Posizione dimenticata!', // message
                    function() {}, // callback
                    'Dati rimossi', // title
                    'OK' // buttonName
                );
            } else {
                alert('posizione dimenticata');
            }
        }

        show_interface();

    }
]);

app.controller('parcheggiFotoController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Dove ho parcheggiato?";
        $scope.fotoUrl = localStorage.getItem('foto');
        var myScroll = new IScroll('.zoomable', {
            zoom: true,
            scrollY: true,
            scrollX: true,
            freeScroll: true,
            click: false,
            zoomMin: 0.0675,
            zoomStart: 0.125
        });
        show_interface();
    }
]);

app.controller('listaController', ['$scope', '$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope) {
        $rootScope.titolo = "Lista della spesa";
        $scope.lista = JSON.parse(localStorage.getItem('spesa'));

        $scope.removeProdotto = function(elemento) {
            console.log("elimino " + elemento);
            var index = $.inArray(elemento, $scope.lista);
            if (index >= 0) {
                $scope.lista.splice(index, 1);
                localStorage.setItem('spesa', JSON.stringify($scope.lista));
            }
        }

        $scope.addProdotto = function() {
            if ($scope.lista !== null) {
                var index = $.inArray($scope.formProdotto, $scope.lista);
                if (index >= 0) {
                    console.log("articolo già presente");
                } else {
                    $scope.lista.push($scope.formProdotto);
                    localStorage.setItem('spesa', JSON.stringify($scope.lista));
                }
            } else {
                $scope.lista = [$scope.formProdotto];
                localStorage.setItem('spesa', JSON.stringify($scope.lista));
            }

            $scope.formProdotto = '';
        };
        show_interface();
    }
]);





app.controller('VolantiniDetailController', [
    '$scope', '$http', '$state', 'sc', '$stateParams', '$timeout', '$rootScope',
    function($scope, $http, $state, sc, $stateParams, $timeout, $rootScope) {
        $scope.volantino = sc.volantini[$stateParams.id];
        $rootScope.titolo = "Volantino";
        var pswpElement = document.querySelectorAll('.pswp')[0];

        var index;
        var items = [];
        for (index = 1; index <= $scope.volantino['pagine']; ++index) {
            var el = {
                src: 'http://www.shoppingcenterconnect.it' + $scope.volantino['dir'] + index + '.jpg',
                w: $scope.volantino['thumbnail_width'],
                h: $scope.volantino['thumbnail_height'],
                msrc: 'http://www.shoppingcenterconnect.it' + $scope.volantino['dir'] + index + '.t.jpg'
            };
            items.push(el);
        }

        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: 0, // start at first slide
            modal: false,
            closeOnScroll: false,
            closeOnVerticalDrag: false,
            pinchToClose: false,
            history: false,
            tapToClose: false,
            maxSpreadZoom: 3,
            tapToToggleControls: false,
            clickToCloseNonZoomable: false,
            closeElClasses: [],
            closeEl: false,
            captionEl: false,
            fullscreenEl: true,
            shareEl: false,
            arrowEl: true,
            preloaderEl: true,
            zoomEl: true
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        gallery.toggleDesktopZoom(30, 30);
        show_interface();
    }
]);

app.controller('VolantiniListController', ['$scope', '$http', '$state', 'sc', '$stateParams', '$timeout', '$rootScope',
    function($scope, $http, $state, sc, $stateParams, $timeout, $rootScope) {
        $rootScope.titolo = "Volantini";
        $scope.volantini = sc.volantini;
        show_interface();
    }
]);

app.controller('eventiController', ['$scope', '$http', '$state', 'sc', '$rootScope',
    function($scope, $http, $state, sc, $rootScope) {
        prepare_interface($rootScope);
        $rootScope.titolo = "Eventi";
        var oggi = new Date();
        $scope.eventi = sc.eventi.filter(function(e) {
            var scadenza = new Date(e.termine_evento);
            scadenza.setDate(scadenza.getDate() + 1);
            var inizio = new Date(e.data_pubblicazione);
            if ((scadenza > oggi) && (inizio <= oggi)) {
                return true;
            }
            return false;
        });

        $("#scroller").width($scope.eventi.length * $(window).width());
        $("<style>")
            .prop("type", "text/css")
            .html("\
            .evento {\
                width: " + $(window).width() + "px;\
            }")
            .appendTo("head");
        var myScroll = new IScroll('#eventiWrapper', {
            zoom: false,
            scrollY: false,
            scrollX: true,
            freeScroll: false,
            click: true,
            snap: true
        });

        opacizzaPallini(0, $scope.eventi.length);

        myScroll.on('scrollEnd', function() {
            opacizzaPallini(myScroll.currentPage.pageX, $scope.eventi.length);
        });
        show_interface();

    }
]);



// mie direttive e filtri

app.filter('pulisciTelefono', function() {
    return function(text) {
        var newText = text.replace(/[^0-9]+/g, '');
        return newText;
    };
});

app.filter('formattaData', function() {
    return function(text) {
        return formattaData(text);
    };
});


app.directive('testolinkato', ['$document', function($document) {
    return function($scope, element, attr) {
        console.log(element);
    }
}]);

app.directive('sfData', ['$interval', 'dateFilter', function($interval, dateFilter) {
    // return the directive link function. (compile function not needed)
    function link(scope, element, attrs) {
        var format, // date format
            timeoutId; // timeoutId, so that we can cancel the time updates

        // used to update the UI
        function updateTime() {
            element.text(dateFormat(new Date(), format));
        }

        // watch the expression, and update the UI on change.
        scope.$watch(attrs.sfData, function(value) {
            format = value;
            updateTime();
        });

        timeoutId = $interval(function() {
            updateTime(); // update DOM
        }, 1000);

        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time after the DOM element was removed.
        element.bind('$destroy', function() {
            $interval.cancel(timeoutId);
        });

    }

    return {
        link: link
    };
}]);
