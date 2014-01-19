FBManager = (function ($) {
    //
    var mAppManager = null;
    function _getAppManager() {
        if ( typeof(mAppManager ) == 'undefined' || mAppManager === null ) {
            throw Exception('FBManager error! mAppManager is null');
        }
        return mAppManager;
    }
    // User data
    var mUserData = null;
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
    //
    Constr.prototype.GetCurrentUserData = function () {
        return mUserData;
    }
    //
    Constr.prototype.Logout = function () {
        if (FB) {
            FB.logout(function (presponse) {
                // Person is now logged out
                //if (pcbk) pcbk.apply();
                _getAppManager().LogoutEnd();
            });
        } else {
            alert('FBManager error! FB is null');
        }
    }
    // FB
    function _fbInit() {
        if (FB) {
            try {
                var azurerex = new RegExp('azurewebsites.net');
                var pro = azurerex.test(location.href);
                var appid = '326616007479104';
                if (pro === true) appid = '505756812872331';
                FB.init({
                    appId: appid, //'505756812872331', // '326616007479104',
                    status: true,
                    cookie: true,
                    xfbml: true
                });
                //$('#loginbutton,#feedbutton').removeAttr('disabled');
                // Whether or not they are logged into Facebook: 2 ways
                //1 Set status: true when you initialize the SDK and subscribe to the auth.authResponseChange event (recommended)
                //2 Specifically call the FB.getLoginStatus function
                //FB.getLoginStatus(function (presponse) { ... });
                FB.Event.subscribe('auth.authResponseChange', function (presponse) {
                    if (presponse.status === 'connected') {
                        _testAPI(presponse.authResponse.userID);
                    } else if (presponse.status === 'not_authorized') {
                        FB.login();
                    } else {
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
            mUserData = {
                name: presponse.name,
                id: presponse.id,
                userName: presponse.username,
                firstName: presponse.first_name,
                lastName: presponse.last_name,
            };
            // TODO can work
            _getAppManager().SetLogged(true);
        });
    }

    //
    return Constr;
}(jQuery));