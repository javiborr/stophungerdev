AppManager = (function ($) {
    //
    var me = null;
    var mDonateController = new DonateController();
    var mDonationManager = new DonationManager();
    var mDonateView = new DonateView();
    var mFBManager = new FBManager();
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
    Constr.prototype.SetLogged = function (pislogged) {
        if (pislogged === true) {
            // TODO state and user role
            mDonateView.SetLogged(true);
        } else {
            mDonateView.SetLogged(false);
        }
    }
    Constr.prototype.LogoutEnd = function () {
        mDonateView.SetLogged(false);
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
        // 
        mDonateController.SetDonationManager(mDonationManager);
        mDonateController.SetDonateView(mDonateView);
        mDonateController.SetFBManager(mFBManager);
        //
        mDonateView.SetDonateController(mDonateController);
        mDonateView.Setup();
        //
        // TODO page navigation
        mDonateView.SetLogged(false);
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