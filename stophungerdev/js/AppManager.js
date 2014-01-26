AppManager = (function ($) {
    //
    var me = null;
    var mDonateController = null;
    var mDonationManager = null;
    var mDonateView = null;
    var mFBManager = null;
    var mPeopleManager = null;
    var mUserManager = null;
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
    Constr.prototype.ShowUserData = function (pfbid) {
        mDonateController.ShowPageAdminUser(pfbid);
    }
    // Si usuario no esta logado en FB muestra loginPage
    // Si usuario esta logado en FB consulta su rol
    // No rol: nouserPage
    // Admin: adminPage
    // Gives: donatePage
    // Takes: checkPage
    Constr.prototype.SetLogged = function (pislogged) {
        if (pislogged === true) {
            // Gets user data from FB and DB
            mDonateView.WaitingForServer('Datos de FaceBook...');
            mUserManager.GetCurrentUserFromFBDB(_showPageForRol, _showError);
        } else {
            this.LogoutEnd();
        }
    }
    // TODO
    function _showPageForRol() {
        // SI encuentra usuario registrado
        if (mUserManager.CurrentUserIsValid()) {
            // SI rol Giver
            if (mUserManager.CurrentUserIsAdmin()) {
                mDonateView.ShowPageAdminMenu();
            } else
                if (mUserManager.CurrentUserIsGiver()) {
                    mDonateView.ShowPageDonate(false);
                } else {
                    // TODO Receiver
                    mDonateView.ShowPageNoRol();
                }
        } else {
            mDonateView.ShowPageNoUser();
        }
    }
    function _showError(perror) {
        alert(perror);
    }
    //
    Constr.prototype.LogoutEnd = function () {
        mDonateView.ShowPageLogin();
        var url = location.href;
        location.href = url;
    }

    function _initAll() {
        console.log('_initAll started');
        //alert('_initAll started');
        mDonateController = new DonateController();
        mDonationManager = new DonationManager();
        mDonateView = new DonateView();
        mFBManager = new FBManager();
        mPeopleManager = new PeopleManager();
        mUserManager = new UserManager();
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
        //
        mDonateView.SetDonateController(mDonateController);
        mDonateView.Setup();
        //
        mDonateView.ShowPageLogin();
        //
        mUserManager.Init();
    }
    //
    return Constr;
}(jQuery));