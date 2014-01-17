$(function () {
    //if (app.deviceIsReady === true) {
    //    initAll();
    //} else {
    //    document.addEventListener('deviceready', initAll, false);
    //    setTimeout(initAll, 1000);
    //}
    initAll();
    function initAll() {
        //if (app.appInitialized == true) {
        //    return;
        //}
        //app.appInitialized = true;
        console.log('initAll started');
        //alert('initAll started');
        var mDonateController = new DonateController();
        var mDonationManager = new DonationManager();
        var mDonateView = new DonateView();
        // 
        mDonateController.SetDonationManager(mDonationManager);
        mDonateController.SetDonateView(mDonateView);
        //
        mDonateView.SetDonateController(mDonateController);
        mDonateView.Setup();
        mDonateView.IsLogged(false);
        //
        // On initial load, start by fetching the current data
        //mDonateController.RefreshDonations();
        //alert('END init');
        //
        if (true) {
            mDonateView.IsLogged(true);
        } else {
            $.ajaxSetup({ cache: true });
            $.getScript('http://connect.facebook.net/es_ES/all.js', function () {
                try {
                    //alert('http://connect.facebook.net callback init');
                    //FB.init({
                    //    appId: '505756812872331',
                    //});
                    FB.init({
                        appId: '326616007479104',
                        status: true, // check login status
                        cookie: true, // enable cookies to allow the server to access the session
                        xfbml: true  // parse XFBML
                    });
                    //$('#loginbutton,#feedbutton').removeAttr('disabled');
                    // Whether or not they are logged into Facebook: 2 ways
                    //1 Set status: true when you initialize the SDK and subscribe to the auth.authResponseChange event (recommended)
                    //2 Specifically call the FB.getLoginStatus function
                    //alert('FB.getLoginStatus init');
                    //FB.getLoginStatus(function (presponse) {
                    //    //alert('FB.getLoginStatus presponse.status[' + presponse.status + ']');
                    //    if (presponse.status === 'connected') {
                    //        //var uid = presponse.authResponse.userID;
                    //        //var accessToken = presponse.authResponse.accessToken;
                    //        mDonateView.IsLogged(true);
                    //    } else if (presponse.status === 'not_authorized') {
                    //        // the user is logged in to Facebook, 
                    //        // but has not authenticated your app
                    //    } else {
                    //        // the user isn't logged in to Facebook.
                    //        FB.login();
                    //    }
                    //});
                    //alert('FB.Event.subscribe init');
                    FB.Event.subscribe('auth.authResponseChange', function (presponse) {
                        //alert('FB.Event.subscribe callback presponse.status[' + presponse.status + ']');
                        if (presponse.status === 'connected') {
                            // TODO can work
                            //alert('FB 1 presponse.status[' + presponse.status + ']');
                            mDonateView.IsLogged(true);
                            testAPI(presponse.authResponse.userID);
                        } else if (presponse.status === 'not_authorized') {
                            //alert('FB 2 presponse.status[' + presponse.status + ']');
                            FB.login();
                        } else {
                            //alert('FB 3 presponse.status[' + presponse.status + ']');
                            FB.login();
                        }
                    });
                } catch (ex) {
                    alert(ex);
                }
            });
        }

        function testAPI(puid) {
            // TODO
            //var badmin = (puid == '1445416267');
            //mDonateView.IsLogged(true);
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (presponse) {
                var sa = ['Good to see you, ' + presponse.name
                                , 'puid[' + puid + ']'
                                , 'id[' + presponse.id + ']'
                                , 'username[' + presponse.username + ']'
                                , 'first_name[' + presponse.first_name + ']'
                                , 'last_name[' + presponse.last_name + ']'
                ].join('\n');
                alert(sa);
            });
        }
    }

});