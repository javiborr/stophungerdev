FBManager = (function ($) {
    //
    //var mAppManager = null;
    //function _getAppManager() {
    //    if ( typeof(mAppManager ) == 'undefined' || mAppManager === null ) {
    //        throw Exception('FBManager error! mAppManager is null');
    //    }
    //    return mAppManager;
    //}
    var mUserManager = null;
    function _getUserManager() {
        if ( typeof(mUserManager ) == 'undefined' || mUserManager === null ) {
            throw Exception('FBManager error! mUserManager is null');
        }
        return mUserManager;
    }
    // User data
    var mCurrentUserFBData = null;
    //
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
    }
    //
    Constr.prototype.Init = function () {
        //$.ajaxSetup({ cache: true });
        //$.getScript('//connect.facebook.net/en_UK/all.js',_fbInit);
        _fbInit();
    }
    //
    Constr.prototype.SetUserManager = function (p) {
        mUserManager = p;
    }
    //
    Constr.prototype.GetCurrentUserFBData = function () {
        return mCurrentUserFBData;
    }
    //
    Constr.prototype.GetCurrentUserFromFB = function (pcbkok, pcbkerr) {
        _getCurrentUserFBDataFromFB(pcbkok, pcbkerr);
    }
    //
    Constr.prototype.Logout = function (pcbk) {
        if (FB) {
            FB.logout(function (presponse) {
                // Person is now logged out
                if (pcbk) pcbk();
                //_getAppManager().LogoutEnd();
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
                        _getUserManager().SetLogged(true);
                        //_getCurrentUserFBDataFromFB(presponse.authResponse.userID);
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
    function _getCurrentUserFBDataFromFB(pcbkok, pcbkerr) {
        //var appman = _getAppManager();
        //appman.WaitingForServer('Datos de FaceBook...');
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', { fields: 'id,username,first_name,last_name,email' }, function (presponse) {
            // SI KO
            if (!presponse || presponse.error) {
                if (pcbkerr) pcbkerr(presponse.error);
            } else {
                //var sa = ['Good to see you, ' + presponse.name
                //                , 'id[' + presponse.id + ']'
                //                , 'username[' + presponse.username + ']'
                //                , 'first_name[' + presponse.first_name + ']'
                //                , 'last_name[' + presponse.last_name + ']'
                //].join('\n');
                //alert(sa);
                mCurrentUserFBData = {
                    name: presponse.name,
                    id: presponse.id,
                    userName: presponse.username,
                    firstName: presponse.first_name,
                    lastName: presponse.last_name,
                    email: presponse.email
                };
                // TODO can work
                //appman.SetLogged(true);
                if (pcbkok) pcbkok(mCurrentUserFBData);
            }
        });
    }

    //
    return Constr;
}(jQuery));