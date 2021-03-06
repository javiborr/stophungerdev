﻿UserManager = (function ($) {
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
    //var mFBManager = null;
    //function _getFBManager() {
    //    if (mFBManager === null) {
    //        throw 'UserManager mFBManager is null';
    //    }
    //    return mFBManager;
    //}
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
    // Login alternativo a FB
    var mCurrentUserID = null;
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
        //var fbman = _getFBManager();
        //fbman.Init();
    }
    //
    Constr.prototype.SetLogged = function (pislogged, puserid) {
        _getAppManager().SetLogged(pislogged, puserid);
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
    Constr.prototype.CurrentUserID = function () {
        var res = false;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = mCurrentUserDBData.id;
        }
        return res;
    }
    Constr.prototype.CurrentUserRole = function () {
        var res = Role.None;
        if (typeof (mCurrentUserDBData) !== 'undefined' && mCurrentUserDBData !== null) {
            res = mCurrentUserDBData.Role;
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
    Constr.prototype.CurrentUserData = function () {
        return mCurrentUserDBData;
    }
    //
    // FB logado seguro
    // DB puede existir o no. Si no existe NO crea el usuario en DB
    Constr.prototype.GetCurrentUserFromFBDB = function (pcbkok, pcbkerr, puserid) {
        var pman = _getPeopleManager();
        // Get DB data maybe there is not
        pman.GetUserDataFromDB(puserid,
            function (presponse) {
                // SI hay datos en DB
                if (presponse && presponse.length > 0) {
                    // Got DB data
                    var role = Role.None;
                    // SEGUN role
                    if (presponse[0].Admin === true) {
                        role = Role.Admin;
                    } else 
                        if (presponse[0].Gives === true) {
                            role = Role.Donor;
                        } else
                            if (presponse[0].Takes === true) {
                                role = Role.Taker;
                            }
                    mCurrentUserDBData = {
                        valid: true,
                        id: presponse[0].UserID,
                        FBID: puserid,
                        UserName: presponse[0].UserName,
                        Admin: presponse[0].Admin,
                        Gives: presponse[0].Gives,
                        Takes: presponse[0].Takes,
                        Role: role,
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
    // -----------------------------------------------
    // Login from DB
    Constr.prototype.Login = function (pusername, ppassword, pcbkok, pcbkerr) {
        _getPeopleManager().LoginFromDB(pusername, ppassword, pcbkok, pcbkerr);
    }
    //
    Constr.prototype.Logout = function () {
        //_getFBManager().Logout(function () {
        //    _getAppManager().LogoutEnd();
        //});
        // TODO logout?
        _getAppManager().LogoutEnd();
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
        alert('TODO Create no FB!');
        if (pcbkerr) pcbkerr();
        //var cudata = _getFBManager().GetCurrentUserFBData();
        //_getPeopleManager().Create(cudata, pcbkok, pcbkerr);
    }
    Constr.prototype.Save = function (pdata, pcbkok, pcbkerr) {
        _getPeopleManager().Save(pdata, pcbkok, pcbkerr);
    }
    //
    return Constr;
}(jQuery));