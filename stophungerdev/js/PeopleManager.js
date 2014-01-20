PeopleManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mAppURL = 'https://stophunger.azure-mobile.net/';
    var mAppKey = 'MDRQPHGRJDbpeYDwLbFAYIVDZKIjHl37';
    //
    var mMSClient;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL, mAppKey);
    }
    // -----------------------------------------------
    // Gets user data from DB not from FB
    Constr.prototype.GetUserData = function (pfbid, pcallbok, pcallberr) {
        var filter = {FBID : pfbid};
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