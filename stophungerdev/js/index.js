/**
 * @author: Chris Hjorth, www.chrishjorth.com
 * http://www.chrishjorth.com/blog/phonegap-and-jquery-mobile-initialization/
 */
var jqmReady = $.Deferred();
var pgReady = $.Deferred();

var app = {
    //Callback for when the app is ready
    callback: null,
    //Flag for separating web and PhoneGap environments
    isWeb: true,

    // Application Constructor
    initialize: function (pcbk) {
        this.callback = pcbk;
        var ripple = document.URL.match(/^http:\/\/localhost:4400/);
        var browser = !ripple && document.URL.match(/^https?:/);
        if (browser) {
            isWeb = true;
            console.log("Is web.");
            //In case of web we ignore PG but resolve the Deferred Object to trigger initialization
            //We are testing using web not PG so we will NOT get a deviceready event
            pgReady.resolve();
        }
        else {
            isWeb = false;
            console.log("Is not web.");
            //PG loads index.html using file:// protocol so we will get a deviceready event
            //when we get the deviceready event we will call pgReady.resolve();
            this.bindEvents();
        }
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        // The scope of 'this' is the event, hence we need to use app.
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (event) {
        switch (event) {
            case 'deviceready':
                pgReady.resolve();
                app._splashScreenEnds();
                break;
        }
    },
    _splashScreenEnds: function () {
        var parentElement = document.getElementById('deviceready');
        if (parentElement) {
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }
    }
};
$(document).on("pageinit", function (event, ui) {
    jqmReady.resolve();
});
/**
* General initialization.
*/
$.when(jqmReady, pgReady).then(function () {
    //Initialization code here
    if (app.callback) {
        app.callback();
    }
    console.log("Frameworks ready.");
});
