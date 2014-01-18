FBManager = (function ($) {
    //
    var mAppManager = null;
    function _getAppManager() {
        if ( typeof(mAppManager ) == 'undefined' || mAppManager === null ) {
            throw Exception('FBManager error! mAppManager is null');
        }
        return mAppManager;
    }
    //
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
    }
    //
    Constr.prototype.Init = function () {
        $.ajaxSetup({ cache: true });
        $.getScript('//connect.facebook.net/en_UK/all.js',_fbInit);
    }
    //
    Constr.prototype.SetAppManager = function (p) {
        mAppManager = p;
    }
    // FB
    function _fbInit() {
        if (FB) {
            try {
                FB.init({
                    appId: '326616007479104',
                    status: true,
                    cookie: true,
                    xfbml: true
                });
                $('#loginbutton,#feedbutton').removeAttr('disabled');
                // Whether or not they are logged into Facebook: 2 ways
                //1 Set status: true when you initialize the SDK and subscribe to the auth.authResponseChange event (recommended)
                //2 Specifically call the FB.getLoginStatus function
                //alert('FB.getLoginStatus init');
                //FB.getLoginStatus(function (presponse) {
                //    //alert('FB.getLoginStatus presponse.status[' + presponse.status + ']');
                //    if (presponse.status === 'connected') {
                //        //var uid = presponse.authResponse.userID;
                //        //var accessToken = presponse.authResponse.accessToken;
                //        mDonateView.SetLogged(true);
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
                        //mDonateView.SetLogged(true);
                        var appman = _getAppManager();
                        appman.SetLogged(true);
                        _testAPI(presponse.authResponse.userID);
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
        } else {
            alert('FBManager error! FB is null');
        }
    }
    //
    function _testAPI(puid) {
        // TODO
        //var badmin = (puid == '1445416267');
        //mDonateView.SetLogged(true);
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

    //
    return Constr;
}(jQuery));