DonateController = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    // Gestor de datos en el servidor
    var mDonationManager;
    function _getDonationManager() {
        if (mDonationManager === null) {
            throw 'DonateController mDonationManager is null';
        }
        return mDonationManager;
    }
    // Gestor datos usuario
    var mUserManager;
    function _getUserManager() {
        if (mUserManager === null) {
            throw 'DonateController mUserManager is null';
        }
        return mUserManager;
    }
    // Gestor datos sites
    var mSiteManager;
    function _getSiteManager() {
        if (mSiteManager === null) {
            throw 'DonateController mSiteManager is null';
        }
        return mSiteManager;
    }
    // Maneja la UI
    var mDonateView;
    function _getDonateView() {
        if (mDonateView === null) {
            throw 'DonateController mDonateView is null';
        }
        return mDonateView;
    }
    // -----------------------------------------------------
    // User we are editing now
    var mUserEditingFBID = null;
    var mUserEditingID = null;
    // Site we are editing now
    var mSiteEditingID = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () { }
    //
    Constr.prototype.SetDonationManager = function (p) { mDonationManager = p; }
    Constr.prototype.SetUserManager = function (p) { mUserManager = p; }
    Constr.prototype.SetSiteManager = function (p) { mSiteManager = p; }
    Constr.prototype.SetDonateView = function (p) { mDonateView = p; }
    // -----------------------------------------------
    // Logout
    // -----------------------------------------------
    Constr.prototype.LogoutStart = function () {
        _getUserManager().Logout();
    }
    // -----------------------------------------------
    // RequestAccess
    // -----------------------------------------------
    Constr.prototype.RequestAccessStart = function () {
        _getDonateView().WaitingForServer();
        //var cudata = _getFBManager().GetCurrentUserFBData();
        _getUserManager().Create(_requestAccessOK, _handleError);
    }
    //
    function _requestAccessOK() {
        _getDonateView().AccessRequestedEnd();
    }
    // -----------------------------------------------
    // Users
    // -----------------------------------------------
    // Admin user list
    Constr.prototype.ShowPageAdminUserList = function () {
        var view = _getDonateView();
        view.WaitingForServer();
        _getUserManager().GetAllUsersFromDB(
            function (presponse) {
                var data = {'users':presponse};
                view.ShowPageAdminUserList(data);
            }
            , _handleError);
    }
    // Admin user
    Constr.prototype.ShowPageAdminUser = function (pfbid) {
        mUserEditingFBID = pfbid;
        var view = _getDonateView();
        view.WaitingForServer();
        _getUserManager().GetUserDataFromCacheOrDB(
            pfbid,
            function (pudata) {
                if (pudata !== null && pudata.length > 0) {
                    mUserEditingID = pudata[0].id;
                    view.ShowPageAdminUser(pudata);
                }
            }
            , _handleError);
    }
    // Save user
    Constr.prototype.SaveUser = function (pudata, pcbkok, pcbkerr) {
        if (pudata !== null && mUserEditingID !== null) {
            pudata.id = mUserEditingID;
            _getUserManager().Save(pudata, pcbkok, pcbkerr);
        }
    }
    // -----------------------------------------------
    // Sites
    // -----------------------------------------------
    // Admin site list
    Constr.prototype.ShowPageAdminSiteList = function () {
        var view = _getDonateView();
        view.WaitingForServer();
        _getSiteManager().GetAllSitesFromDB(
            function (presponse) {
                var data = { 'sites': presponse };
                view.ShowPageAdminSiteList(data);
            }
            , _handleError);
    }
    // Admin site
    Constr.prototype.ShowPageAdminSite = function (psiteid) {
        var view = _getDonateView();
        // SI psiteid es OK entonces editamos un site
        if (typeof (psiteid) !== 'undefined' && psiteid !== null) {
            mSiteEditingID = psiteid;
            view.WaitingForServer();
            _getSiteManager().GetSiteDataFromCacheOrDB(
                psiteid,
                function (pdata) {
                    if (pdata !== null && pdata.length > 0) {
                        view.ShowPageAdminSite(pdata);
                    }
                }
                , _handleError);
        } else {
            // SI psiteid es null entonces creamos un site nuevo
            view.ShowPageAdminSite();
        }
    }
    // Save site
    Constr.prototype.SaveSite = function (pdata, pcbkok, pcbkerr) {
        // SI OK
        if (pdata !== null) {
            // SI updating
            if (mSiteEditingID !== null) {
                pdata.id = mSiteEditingID;
            }
            // Insert or Update
            _getSiteManager().Save(pdata, pcbkok, pcbkerr);
        }
    }
    // Gets all sites from DB
    Constr.prototype.GetAllSitesFromDB = function (pcbkok, pcbkerr) {
        //_getDonateView().WaitingForServer();
        _getSiteManager().GetAllSitesFromDB(
            function (presponse) {
                var data = { 'sites': presponse };
                if (pcbkok) pcbkok(data);
            }
            , _handleError);
    }
    // -----------------------------------------------
    // Donations
    // -----------------------------------------------
    // Action create a donation
    Constr.prototype.CreateDonation = function () {
        var view = _getDonateView();
        var donationdata = view.GetDonateFormData();
        var userdata = _getUserManager().CurrentUserData();
        var o = { donation: donationdata, user: userdata };
        // TODO confirm donation page
        view.ShowPageDonateConfirm(o);
        //view.Loading();
        //_getDonationManager().Create(donationdata, _donationCreatedOK, _handleError);
    }
    //
    Constr.prototype.ConfirmDonation = function () {
        // TODO user and site ID
        var view = _getDonateView();
        view.Loading();
        var donationdata = view.GetDonateFormData();
        _getDonationManager().Create(donationdata, _donationCreatedOK, _handleError);
    }
    //
    Constr.prototype.ShowDonateFormPage = function() {
        var badmin = _getUserManager().CurrentUserIsAdmin();
        _getDonateView().ShowPageDonate(badmin);
    }
    //
    function _donationCreatedOK() {
        _getDonateView().DonationOK();
    }
    // -----------------------------------------------
    function _handleError(perror) {
        _getDonateView().ShowError(perror);
    }
    //
    return Constr;
}(jQuery));