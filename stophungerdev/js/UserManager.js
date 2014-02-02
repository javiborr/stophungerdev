UserManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    // AppManager
    var mAppManager = null;
    function _getAppManager() {
        if (typeof (mAppManager) == 'undefined' || mAppManager === null) {
            throw Exception('UserManager error! mAppManager is null');
        }
        return mAppManager;
    }
    // FB user data
    var mFBManager = null;
    function _getFBManager() {
        if (mFBManager === null) {
            throw 'UserManager mFBManager is null';
        }
        return mFBManager;
    }
    // DB user data
    var mPeopleManager = null;
    function _getPeopleManager() {
        if (mPeopleManager === null) {
            throw 'UserManager mPeopleManager is null';
        }
        return mPeopleManager;
    }
    // User data
    var mCurrentUserDBData = null;
    var mCurrentUserFBData = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
    }
    Constr.prototype.SetFBManager = function (p) { mFBManager = p; }
    Constr.prototype.SetPeopleManager = function (p) { mPeopleManager = p; }
    //
    Constr.prototype.SetAppManager = function (p) { mAppManager = p; }
    //
    Constr.prototype.Init = function () {
        var fbman = _getFBManager();
        fbman.Init();
    }
    //
    Constr.prototype.SetLogged = function (pislogged) {
        _getAppManager().SetLogged(pislogged);
    }
    // -----------------------------------------------
    // Get current user data
    Constr.prototype.CurrentUserIsValid = function () {
        var res = false;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = (mCurrentUserDBData.valid === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsAdmin = function () {
        var res = false;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = (mCurrentUserDBData.Admin === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsGiver = function () {
        var res = false;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = (mCurrentUserDBData.Gives === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserIsTaker = function () {
        var res = false;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = (mCurrentUserDBData.Takes === true);
        }
        return res;
    }
    Constr.prototype.CurrentUserData = function () { return mCurrentUserDBData; }
    //
    // FB logado seguro
    // DB puede existir o no. Si no existe NO crea el usuario en DB
    Constr.prototype.GetCurrentUserFromFBDB = function (pcbkok, pcbkerr) {
        var fbman = _getFBManager();
        // Debemos estar logados en FB asi que debemos poder recuperar los datos FB
        fbman.GetCurrentUserFromFB(
            function (pfbdata) {
                var pman = _getPeopleManager();
                // Got FB data
                mCurrentUserFBData = pfbdata;
                // Get DB data maybe there is not
                pman.GetUserDataFromDB(pfbdata.id,
                    function (presponse) {
                        // SI hay datos en DB
                        if (presponse && presponse.length > 0) {
                            // Got DB data
                            mCurrentUserDBData = {
                                valid: true,
                                id: presponse[0].UserID,
                                FBID: pfbdata.id,
                                UserName: presponse[0].UserName,
                                Admin: presponse[0].Admin,
                                Gives: presponse[0].Gives,
                                Takes: presponse[0].Takes,
                                SiteID: presponse[0].SiteID,
                                Site: presponse[0].Site,
                                Address1: presponse[0].Address1,
                                ZIP: presponse[0].ZIP,
                                City: presponse[0].City
                            };
                        }
                        if (pcbkok) pcbkok();
                    }, pcbkerr
                );
            }, pcbkerr
        );
    }
    //
    // -----------------------------------------------
    // Gets user from DB
    Constr.prototype.GetUserDataFromCacheOrDB = function (pfbid, pcbkok, pcbkerr) {
        _getPeopleManager().GetUserDataFromCacheOrDB(pfbid, pcbkok, pcbkerr);
    }
    // Gets all users from DB
    Constr.prototype.GetAllUsersFromDB = function (pcbkok, pcbkerr) {
        _getPeopleManager().GetAllUsersFromDB(pcbkok, pcbkerr);
    }
    // -----------------------------------------------
    //
    Constr.prototype.Logout = function () {
        _getFBManager().Logout(function () {
            _getAppManager().LogoutEnd();
        });
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
    Constr.prototype.Create = function (pcbkok, pcbkerr) {
        var cudata = _getFBManager().GetCurrentUserFBData();
        _getPeopleManager().Create(cudata, pcbkok, pcbkerr);
    }
    Constr.prototype.Save = function (pdata, pcbkok, pcbkerr) {
        _getPeopleManager().Save(pdata, pcbkok, pcbkerr);
    }
    //
    return Constr;
}(jQuery));