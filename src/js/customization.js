// questo file contiene le personalizzazioni dell'app

var shopping_center_id = 1;

// TODO usate da pulse api, da rimuovere
var applicationId = "yT21dy2n69cXnwb3clEDaBBeaHSBaed6N4JTwxU5";
var clientKey = "GufaaI5ttmTqHNgqkf3zv8y39htDojN6RsRE4Ipj";
var channel = 'lecupole';

// TODO da inserire nelle api invece che qui
var scc_customizations = {
    nome: 'Bodio',
    show_logo_in_home: true,
    orario_default: '8:30-21:00',
    orario_messaggio: 'Alcuni negozi aprono prima! premi per dettagli',
    raggiungerci_titolo: 'Come raggiungerci',
    raggiungerci_sottotitolo: 'in auto o con i mezzi pubblici',
    ha_club: true,
    club_qr_code: true,
    ha_promozioni_esterne: false,
    orario_food: false,
    latitude: 45.4969789,
    longitude: 9.1669214,
    senderID: "381793796659",
    // orario_food:'<strong>Pranzo</strong> 11:00-15:00 <strong> Cena</strong> 19:00-22:30<br><strong> Bar e Take Away</strong> 9:00-22:30',
    privacy_policy: 'http://www.bodiocenter.com/sito/pagine/privacy.php',
    servizi : {},
    //server_club_url : 'http://192.168.10.105:8000',
    server_club_url : 'http://app.bodiocenter.com',
    scontrini_server : 'http://www.grupromo.it/totem/'
};

// TODO da inserire nelle api invece che qui
var posizioniNegozi = {};
