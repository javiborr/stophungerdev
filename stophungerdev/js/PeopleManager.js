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
    //var mCurrentUserData = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL, mAppKey);
        me = this;
    }
    // -----------------------------------------------
    // Gets current user from DB
    Constr.prototype.GetUserDataFromDB = function (pfbid, pcbkok, pcbkerr) {
        _getUserDataFromDB(pfbid, pcbkok, pcbkerr);
    }
    // -----------------------------------------------
    // Sets current user FBID and gets all data from DB not FB
    Constr.prototype.SetCurrentUserFBID = function (pfbid, puname, pcbkok, pcbkerr) {
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
                    if (pcbkok) pcbkok(presponse);
                } else {
                    //var data = {id: pfbid, userName: puname};
                    //me.Create(data, pcbkok, pcbkerr);
                    pcbkok();
                }
            }
            , pcbkerr);
    }
    //
    function _getUserDataFromDB(pfbid, pcbkok, pcbkerr) {
        var filter = { FBID: pfbid };
        var data = mMSClient.getTable('people')
            .where(filter)
            .read()
            .done(
                function (pres) {
                    //var s = JSON.stringify(pres);
                    //alert(s);
                    if (pcbkok) pcbkok(pres);
                }
                , function (perr) {
                    //var s = JSON.stringify(perr);
                    //alert(s);
                    if (pcbkerr) pcbkerr(perr);
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
    Constr.prototype.Create = function (pdata, pcbkok, pcbkerr) {
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
                        if (pcbkok) pcbkok();
                    } else {
                        // SI NO existe lo crea
                        var table = mMSClient.getTable('people');
                        var data = {
                            UserName: pdata.userName,
                            FBID: pdata.id,
                            FirstName: pdata.firstName,
                            LastName: pdata.lastName,
                            Email: pdata.email
                        };
                        table.insert(data).then(pcbkok, pcbkerr);
                    }
                }
                , function (perr) {
                    var s = JSON.stringify(perr);
                    //alert(s);
                    if (pcbkerr) pcbkerr(perr);
                }
            );
    }
    //
    return Constr;
}(jQuery));