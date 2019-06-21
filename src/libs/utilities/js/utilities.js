/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function() {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function(val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

  // Regexes and supporting functions are cached through closure
  return function(date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d),
        ddd: dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

    return mask.replace(token, function($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

// Some common format strings
dateFormat.masks = {
  "default": "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab",
    "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"
  ],
  monthNames: [
    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ]
};

function prepara_punti_vicini(d) {
  var risultato = [];
  for (var tipo in d) {
    for (var i = 0; i < d[tipo].length; i++) {
      var el = {};
      el.icona = convertToIcon[tipo] || 'nulla';
      el.tipo = tipo;
      el.id = d[tipo][i].id;
      el.latitude = d[tipo][i].latitude;
      el.longitude = d[tipo][i].longitude;
      el.url = tipo + 'Detail({id:' + d[tipo][i].id + '})';
      el.comune = (getByValue(comuni, 'id', d[tipo][i].comune.id)).nome;
      if (d[tipo][i].hasOwnProperty('nome_' + lang)) {
        el.nome = d[tipo][i]['nome_' + lang];
      } else {
        el.nome = d[tipo][i].nome;
      }
      el.distanza = d[tipo][i].distanza;
      risultato.push(el);
    }
  }
  return risultato;
}

function prepara_archivio_punti(d) {
  var risultato = {};
  for (var tipo in d) {
    if (d[tipo].length > 0) {
      risultato[tipo] = [];
      for (var i = 0; i < d[tipo].length; i++) {
        risultato[tipo].push(d[tipo][i].id);
      }
    }
  }

  return risultato;
}


//
// restituisce il primo elemento dell'array arr che è caratterizzato dalla coppia key=value
//

function getByValue(arr, key, value) {
  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    if (arr[i][key] == value) return arr[i];
  }
}


function getAllByValue(arr, key, value) {
  var results = [];
  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    if (arr[i][key] == value) {
      results.push(arr[i]);
    }
  }
  return results;
}

function getAllByComuneId(arr, value, campo) {
  campo = campo || 'comune';
  var results = [];
  console.log(arr);
  if (campo === 'area_di_produzione') {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
      for (var j = 0, jLen = arr[i][campo].length; j < jLen; j++) {
        //console.log(arr[i][campo][j]['id'] + "<>" + value);
        if (arr[i][campo][j]['id'] == value) {
          //console.log("trovato");
          results.push(arr[i]);
        }
      }
    }
  } else {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
      //console.log(arr[i][campo]['id'] + "<>" + value);
      if (arr[i][campo]['id'] == value) {
        //console.log("trovato");
        results.push(arr[i]);
      }
    }
  }
  return results;
}

function getAllByComuneIdItinerari(arr, value) {
  var results = [];
  console.log(arr);

  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    for (var j = 0, jLen = arr[i]['comuni_interessati'].length; j < jLen; j++) {
      console.log(arr[i]['comuni_interessati'][j]['id'] + "<>" + value);
      if (arr[i]['comuni_interessati'][j]['id'] == value) {
        console.log("trovato");
        results.push(arr[i]);
      }
    }
  }

  return results;
}

function toTitleCase(str) {
return str.replace(/\w\S*/g, function(txt) {
	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});
}


// check if an element exists in array using a comparer function
// comparer : function(currentElement)
function inArray(arr, comparer) {
  for (var i = 0; i < arr.length; i++) {
    if (comparer(arr[i])) return i;
  }
  return -1;
};


// http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript

function obj_equals(object1, object2) {
  //For the first loop, we only check for types
  for (propName in this) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      console.log("err f");
      return false;
    }
    //Check instance type
    else if (typeof object1[propName] != typeof object2[propName]) {
      console.log("err g");
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for (propName in object2) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not

    if (typeof(object2[propName]) === 'undefined')
      continue; // la proprietà c'è, ma è vuota e non mi interessa

    if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      console.log("err h: " + propName);
      console.log(object1, object2);
      return false;
    } else if (typeof object1[propName] != typeof object2[propName]) {
      console.log("err i");
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!object1.hasOwnProperty(propName))
      continue;

    //Now the detail check and recursion

    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
      // recurse into the nested arrays
      if (!array_equals(object1[propName], object2[propName])) {
        console.log("err j");
        return false;
      }
    } else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
      // recurse into another objects
      //console.log("Recursing to compare ", object1[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!obj_equals(object1[propName], object2[propName])) {
        console.log("err k");
        return false;
      }
    }
    //Normal value comparison for strings and numbers
    else if (object1[propName] != object2[propName]) {
      console.log("err l");
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
}

// attach the .equals method to Array's prototype to call it on any array
function array_equals(array1, array2) {
  // if the other array2 is a falsy value, return
  if ((!array2) || (!array1)) {
    console.log("err a");
    return false;
  }


  // compare lengths - can save a lot of time
  if (array1.length != array2.length) {
    console.log("err b");
    return false;
  }

  for (var i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array_equals(array1[i], array2[i])) {
        console.log("err c");
        return false;
      }
    } else if (array1[i] instanceof Object && array2[i] instanceof Object) {
      // recurse into another objects
      //console.log("Recursing to compare ", array1[i],"with",array2[i], " both named \""+i+"\"");
      if (!obj_equals(array1[i], array2[i])) {
        console.log("err d");
        return false;
      }
    } else if (array1[i] != array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}

      console.log("err e");
      return false;

    }
  }
  return true;
}


// adds an element to the array if it does not already exist using a comparer
// function
function pushIfNotExist(arr, element, comparer, add) {
  var posizione = inArray(arr, comparer);
  if (posizione === -1) {
    console.log("l'elemento non è tra i preferiti");
    if (add) {
      console.log("lo aggiungo");
      arr.push(element);
    }
    return true;
  } else {
    console.log("l'elemento è tra i preferiti");
    if (add) {
      console.log("lo tolgo");
      arr.splice(posizione, 1);
    }
    return false;
  }
};


function isPreferito(id) {
  var preferiti = getPreferiti();
  for (var i = 0; i < preferiti.length; i++) {
    if (preferiti[i] === id) {
      return true;
    }
  }
  return false;
}


function setPreferito(id) {
  var preferiti = getPreferiti();
  var inserito = pushIfNotExist(preferiti, id, function(e) {
    return e === id
  }, true);
  localStorage.setItem('preferitiSH', JSON.stringify(preferiti));
  return inserito;
}

function getPreferiti() {
  var preferiti = localStorage.getItem('preferitiSH') || '[]';
  return JSON.parse(preferiti);
}



// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }
//
// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//     lat1 = parseFloat(lat1);
//     lat2 = parseFloat(lat2);
//     lon1 = parseFloat(lon1);
//     lon2 = parseFloat(lon2);
//
//   var R = 6383.5; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1);
//   var a =
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ;
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   var d = R * c; // Distance in km
//   console.log(lat1, lat2, dLat);
//   return d;
// }


//
// filtra punti sulla base della distanza
//

var myK1 = Math.PI / 180;
var myK2 = Math.PI / 2;

function distanza(lat1, lon1, lat2, lon2) {
  var a = myK2 - parseFloat(lat1) * myK1;
  var b = myK2 - parseFloat(lat2) * myK1;
  var c = 6383.5 * Math.sqrt(Math.abs(a * a + b * b - 2 * a * b * Math.cos(myK1 * (parseFloat(lon2) - parseFloat(lon1)))));
  //console.log(c);
  return c;
}

function aggiungi_distanza(el, idx, lista) {
  el.distanza = distanza(this[0], this[1], el.latitude, el.longitude) * 1000;
  return el;
}

function filtraDistanza(lat, lon, lista, distanzaKm) {
  if (lista !== null) {
    var lista_d = lista.map(aggiungi_distanza, [lat, lon]);
    return lista_d.filter(function(el) {
      return el.distanza < distanzaKm
    });
  } else {
    return [];
  }

}





// creo una configurazione sulla base della sola categoria
function crea_configurazione(titolo, categoria, sottogruppo, sfondi, customTemplate, customController) {
  customTemplate = customTemplate || 'standard';
  customController = customController || 'standard';
  var template_subpage = 'content';
  if (sottogruppo === 'detail') {
    template_subpage = sottogruppo;
  }
  if (sottogruppo === 'mappa') {
    template_subpage = sottogruppo;
  }
  var suburl = '/';
  if (sottogruppo !== 'content') {
    suburl = '/' + sottogruppo + '/:id/';
  }
  if (sottogruppo === 'mappa') {
    suburl = '/' + sottogruppo + '/:tipo/:id/';
  }
  return {
    url: "/" + categoria + suburl,
    resolve: {
      elements: function($http) {
        //   if (categoria == 'itinerari') {
        //       return itinerariModel.lista($http, categoria);
        //   } else {
        return genericModel.lista($http, categoria);
        //   };

      },
      opzioni: function() {
        return {
          mappaDetailPage: categoria + "MappaDetail",
          detailPage: categoria + "Detail",
          testoCategoria: titolo,
          tipo: categoria
        };
      }
    },
    views: {
      "viewHeader": {
        templateUrl: "pages/" + categoria + ".header.html"
      },
      "viewContent": {
        templateUrl: "pages/" + customTemplate + "." + template_subpage + ".html",
        controller: customController + toTitleCase(sottogruppo) + 'Controller',
      },
    },
    onEnter: function() {
      if (typeof(bkfade) !== undefined) {
        bkfade.update(sfondi);
      }
    }
  }
}
