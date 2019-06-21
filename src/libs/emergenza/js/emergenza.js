function toggleEmergenza(event) {
    console.log("ricevuto click/tap 2");
    event.preventDefault();
    event.stopPropagation();
    var e = $('#emergenzawrapper');
    var ch = $('#content').height();
    if (e.hasClass("aperto")) {
        e.velocity({
            height: 0
        }, {
            easing: "linear",
            complete: function() {
                e.removeClass("aperto");
            }
        });
    } else {
        e.scrollTop(0).velocity({
            height: ch
        }, {
            easing: "linear",
            complete: function() {
                e.addClass("aperto");
            }
        });
    }
}

function chiama(event, conferma) {
    var numero = this.dataset.telefono;
    if (conferma === true) {
        navigator.notification.confirm(
            //TODO tradurre
            //TODO il pulante chiudi deve essere in alto a destra, una croce
            'Vuoi veramente chiamare il numero\n' + numero + '?', // message
            function(index) {
                if (index === 1) {
                    console.log("chiama " + numero);
                    window.open(numero, '_system')
                } else {
                    console.log("premuto bottone " + index);
                }
            }, // callback to invoke with index of button pressed
            'CONFERMA', // title
            ['OK', 'ANNULLA'] // buttonLabels
        );
    } else {
        window.open(numero, '_system')
    }
}
