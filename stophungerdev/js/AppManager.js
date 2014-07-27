AppManager = (function ($) {
    //
    var me = null;
    var mDonateController = null;
    var mDonationManager = null;
    var mDonateView = null;
    var mFBManager = null;
    var mPeopleManager = null;
    var mUserManager = null;
    var mSiteManager = null;
    var mMapManager = null;
    var mListMapManager = null;
    //
    var mActivePage = 'start';
    //
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        me = this;
    }
    Constr.prototype.Init = function () {
        _initAll();
    }
    Constr.prototype.WaitingForServer = function (pmsg) {
        mDonateView.WaitingForServer(pmsg);
    }
    // -----------------------------------------------------
    // Es global porque el enlace está en una plantilla en index.html
    Constr.prototype.ShowUserData = function (pfbid) {
        mDonateController.ShowPageAdminUser(pfbid);
    }
    // -----------------------------------------------------
    // Es global porque el enlace está en una plantilla en index.html
    Constr.prototype.ShowSiteData = function (pid) {
        mDonateController.ShowPageAdminSite(pid);
    }
    // -----------------------------------------------------
    // Si usuario no esta logado en FB muestra loginPage
    // Si usuario esta logado en FB consulta su rol
    // No rol: nouserPage
    // Admin: adminPage
    // Gives: donatePage
    // Takes: checkPage
    Constr.prototype.SetLogged = function (pislogged, puserid) {
        if (pislogged === true) {
            // Gets user data from FB and DB
            mDonateView.WaitingForServer('Espera por favor...');
            mUserManager.GetCurrentUserFromFBDB(_showPageForRol, _showError, puserid);
        } else {
            this.LogoutEnd();
        }
    }
    // TODO
    function _showPageForRol() {
        // SI encuentra usuario registrado
        if (mUserManager.CurrentUserIsValid()) {
            var role = mUserManager.CurrentUserRole();
            mDonateView.SetRole(role);
            mSiteManager.SetUserID(mUserManager.CurrentUserID());
            // SI rol Admin
            if (role === Role.Admin) {
                mDonateView.ShowPageAdminMenu();
            } else
            // SI rol Giver
            if (role === Role.Donor) {
                // TODO use role
                mDonateView.ShowPageDonate(false);
            } else
            // SI rol Taker
            if (role === Role.Taker) {
                mDonateController.ShowPageAdminSiteList();
            } else {
                mDonateView.ShowPageNoRol();
            }
        } else {
            mDonateView.ShowPageNoUser();
        }
    }
    //
    function _showError(perror) {
        alert(perror);
    }
    //
    Constr.prototype.LogoutEnd = function () {
        mDonateView.ShowPageLogin();
        var url = location.href;
        location.href = url;
    }
    //
    function _initAll() {
        console.log('_initAll started');
        //alert('_initAll started');
        mDonateController = new DonateController();
        mDonationManager = new DonationManager();
        mDonateView = new DonateView();
        mFBManager = new FBManager();
        mPeopleManager = new PeopleManager();
        mUserManager = new UserManager();
        mSiteManager = new SiteManager();
        mMapManager = new MapManager();
        mListMapManager = new MapManager();
        //
        mFBManager.SetUserManager(mUserManager);
        // 
        mUserManager.SetFBManager(mFBManager);
        mUserManager.SetPeopleManager(mPeopleManager);
        mUserManager.SetAppManager(me);
        //
        mDonateController.SetDonationManager(mDonationManager);
        mDonateController.SetDonateView(mDonateView);
        mDonateController.SetUserManager(mUserManager);
        mDonateController.SetSiteManager(mSiteManager);
        //
        mDonateView.SetDonateController(mDonateController);
        mDonateView.SetMapManager(mMapManager);
        mDonateView.SetListMapManager(mListMapManager);
        mDonateView.SetUserManager(mUserManager);
        mDonateView.Setup();
        //
        mDonateView.ShowPageLogin();
        //
        mUserManager.Init();
        //
    }
    //
    return Constr;
}(jQuery));