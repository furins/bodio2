function onError(error) {
  console.log(
    "code: " + error.code + "\n" + "message: " + error.message + "\n"
  );
}

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

var onDeviceReady = function($http, $scope, $interval) {
  console.log("primo event listener");

  try {
    StatusBar.hide();
    console.log("nascondo la status bar");
  } catch (e) {
    console.log(e);
  }

  document.addEventListener(
    "resume",
    function() {
      console.log("app resumes");
    },
    false
  );
  window.open = cordova.InAppBrowser.open;
  console.log("inizializzazione terminata");
  if (typeof navigator.splashscreen !== "undefined") {
    navigator.splashscreen.hide();
  }
};
