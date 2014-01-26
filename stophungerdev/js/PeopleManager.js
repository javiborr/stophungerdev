PeopleManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mAppURL = 'https://stophunger.azure-mobile.net/';
    var mAppKey = 'MDRQPHGRJDbpeYDwLbFAYIVDZKIjHl37';
    //
    var mMSClient;
    var me = null;
    // Cache all users
    var mCacheAllUsers = null;
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
    // Gets all users from DB
    Constr.prototype.GetAllUsersFromDB = function (pcbkok, pcbkerr) {
        mCacheAllUsers = null;
        mMSClient.getTable('people')
            .read()
            .done(
                function (presponse) {
                    mCacheAllUsers = presponse;
                    if (pcbkok) pcbkok(presponse);
                }
                , function (perror) {
                    if (pcbkerr) pcbkerr(perror);
                }
            );
    }
    // -----------------------------------------------
    // Gets user from DB
    Constr.prototype.GetUserDataFromCacheOrDB = function (pfbid, pcbkok, pcbkerr) {
        var udata = null;
        // SI hay cache
        if (mCacheAllUsers !== null && mCacheAllUsers.length > 0) {
            // PARA CADA user
            for (var i = 0; i < mCacheAllUsers.length; i++) {
                // SI found
                if (pfbid === mCacheAllUsers[i].FBID) {
                    udata = mCacheAllUsers[i];
                    break;
                }
            }
        }
        // SI NO cache
        if (udata == null) {
            me.GetUserDataFromDB(pfbid, pcbkok, pcbkerr);
        } else {
            var res = [udata];
            if (pcbkok) pcbkok(res);
        }
    }
    // -----------------------------------------------
    // Gets current user from DB
    Constr.prototype.GetUserDataFromDB = function (pfbid, pcbkok, pcbkerr) {
        var filter = { FBID: pfbid };
        var data = mMSClient.getTable('people')
            .where(filter)
            .read()
            .done(
                function (presponse) {
                    if (pcbkok) pcbkok(presponse);
                }
                , function (perror) {
                    if (pcbkerr) pcbkerr(perror);
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
                function (presponse) {
                    // SI encuentra el usuario 
                    if (presponse && presponse.length > 0) {
                        var udata = presponse[0];
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
                , function (perror) {
                    var s = JSON.stringify(perror);
                    //alert(s);
                    if (pcbkerr) pcbkerr(perror);
                }
            );
    }
    Constr.prototype.Save = function (pdata, pcbkok, pcbkerr) {
        mMSClient.getTable('people')
            .update(pdata)
            .done(
                function (presponse) {
                    //var s = JSON.stringify(presponse);
                    //alert(s);
                    if (pcbkok) pcbkok();
                }
                , function (perror) {
                    //var s = JSON.stringify(perror);
                    //alert(s);
                    if (pcbkerr) pcbkerr(perror);
                }
            );
    }
    //
    return Constr;
}(jQuery));