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
    // Gets all donations
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
    Constr.prototype.Create = function (pdata, pcallbok, pcallberr) {
        var data = mMSClient.getTable('people');
        data.insert(pdata).then(pcallbok, pcallberr);
    }
    //
    return Constr;
}(jQuery));