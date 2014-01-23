AppManager = (function ($) {
    //
    var me = null;
    var mDonateController = null;
    var mDonationManager = null;
    var mDonateView = null;
    var mFBManager = null;
    var mPeopleManager = null;
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
    // Si usuario no esta logado en FB muestra loginPage
    // Si usuario esta logado en FB consulta su rol
    // No rol: nouserPage
    // Admin: adminPage
    // Gives: donatePage
    // Takes: checkPage
    Constr.prototype.SetLogged = function (pislogged) {
        if (pislogged === true) {
            // TODO state and user role
            //mDonateView.WaitingForServer();
            var udata = mFBManager.GetCurrentUserFBData();
            mPeopleManager.SetCurrentUserFBID(udata.id, udata.userName, _showPageForRol, _showError);
        } else {
            this.LogoutEnd();
        }
    }
    // TODO
    function _showPageForRol() {
        // SI encuentra usuario registrado
        if (mPeopleManager.CurrentUserIsValid()) {
            // SI rol Giver
            if (mPeopleManager.CurrentUserIsGiver()) {
                // TODO SI admin etc
                mDonateView.ShowPageDonate();
            } else {
                mDonateView.ShowPageNoRol();
            }
        } else {
            mDonateView.ShowPageNoUser();
        }
    }
    function _showError(perr) {
        alert(perr);
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
        // 
        mDonateController.SetDonationManager(mDonationManager);
        mDonateController.SetDonateView(mDonateView);
        mDonateController.SetFBManager(mFBManager);
        mDonateController.SetPeopleManager(mPeopleManager);
        //
        mDonateView.SetDonateController(mDonateController);
        mDonateView.Setup();
        //
        // TODO page navigation
        mDonateView.ShowPageLogin();
        //
        mFBManager.SetAppManager(me);
        mFBManager.Init();
        //
        // On initial load, start by fetching the current data
        //mDonateController.RefreshDonations();
        //alert('END init');
        //
    }
    //
    return Constr;
}(jQuery));