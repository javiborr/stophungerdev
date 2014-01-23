PeopleManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mAppURL = 'https://stophunger.azure-mobile.net/';
    var mAppKey = 'MDRQPHGRJDbpeYDwLbFAYIVDZKIjHl37';
    //
    var mMSClient;
    var me = null;
    // User data
    var mCurrentUserData = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL, mAppKey);
        me = this;
    }
    // -----------------------------------------------
    // Get current user data
    Constr.prototype.CurrentUserIsValid = function () {
        var res = false;
        if (typeof (mCurrentUserData) !== 'undefined' && mCurrentUserData !== null) {
            res = (mCurrentUserData.valid === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsAdmin = function () {
        var res = false;
        if (typeof (mCurrentUserData) !== 'undefined' && mCurrentUserData !== null) {
            res = (mCurrentUserData.admin === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsGiver = function () {
        var res = false;
        if (typeof (mCurrentUserData) !== 'undefined' && mCurrentUserData !== null) {
            res = (mCurrentUserData.gives === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsTaker = function () {
        var res = false;
        if (typeof (mCurrentUserData) !== 'undefined' && mCurrentUserData !== null) {
            res = (mCurrentUserData.takes === true);
        }
        return res;
    }
    // -----------------------------------------------
    // Sets current user FBID and gets all data from DB not FB
    Constr.prototype.SetCurrentUserFBID = function (pfbid, puname, pcallbok, pcallberr) {
        _getUserDataFromDB(pfbid
            , function (presponse) {
                // SI ok
                if (presponse && presponse.length > 0) {
                    mCurrentUserData = {
                        valid: true,
                        id: presponse[0].id,
                        FBID: pfbid,
                        userName: presponse[0].UserName,
                        admin: presponse[0].Admin,
                        gives: presponse[0].Gives,
                        takes: presponse[0].Takes,
                        siteID: presponse[0].SiteID
                    };
                    if (pcallbok) pcallbok(presponse);
                } else {
                    //var data = {id: pfbid, userName: puname};
                    //me.Create(data, pcallbok, pcallberr);
                    pcallbok();
                }
            }
            , pcallberr);
    }
    // -----------------------------------------------
    // Gets user data from DB not from FB
    Constr.prototype.GetUserData = function (pfbid, pcallbok, pcallberr) {
        _getUserDataFromDB(pfbid, pcallbok, pcallberr);
    }
    //
    function _getUserDataFromDB(pfbid, pcallbok, pcallberr) {
        var filter = { FBID: pfbid };
        var data = mMSClient.getTable('people')
            .where(filter)
            .read()
            .done(
                function (pres) {
                    // SI encuentra el usuario 
                    //if ( pres && pres.c
                    var s = JSON.stringify(pres);
                    //alert(s);
                    if (pcallbok) pcallbok(pres);
                }
                , function (perr) {
                    var s = JSON.stringify(perr);
                    //alert(s);
                    if (pcallberr) pcallberr(perr);
                }
            );
    }
    // -----------------------------------------------
    // Creates user
    // FB data: {
    //name: presponse.name,
    //id: presponse.id,
    //userName: presponse.username,
    //firstName: presponse.first_name,
    //lastName: presponse.last_name,
    //}
    Constr.prototype.Create = function (pdata, pcallbok, pcallberr) {
        // Comprueba si ya existe por FBID
        var filter = { FBID: pdata.id };
        mMSClient.getTable('people')
            .where(filter)
            .read()
            .done(
                function (pres) {
                    // SI encuentra el usuario 
                    if (pres && pres.length > 0) {
                        var udata = pres[0];
                        alert('Ya existe tu usuario');
                    } else {
                        // SI NO existe lo crea
                        var table = mMSClient.getTable('people');
                        var data = {
                            UserName: pdata.userName,
                            FBID: pdata.id
                        };
                        table.insert(data).then(pcallbok, pcallberr);
                    }
                }
                , function (perr) {
                    var s = JSON.stringify(perr);
                    //alert(s);
                    if (pcallberr) pcallberr(perr);
                }
            );
    }
    //
    return Constr;
}(jQuery));