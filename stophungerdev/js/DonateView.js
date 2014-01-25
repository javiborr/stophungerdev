DonateView = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mMobile = true;
    var me = null;
    //
    var mDonateController = null;
    function _getDonateController() {
        if (mDonateController === null) {
            throw 'DonateView mDonateController is null';
        }
        return mDonateController;
    }
    // 
    //var mBreadInput = null;
    //var mCakesInput = null;
    //var mSandwichesInput = null;
    //var mSaladsInput = null;
    //
    // -----------------------------------------------------
    // Pages 
    var mLoginPage = null;
    function _getLoginPage() {
        mLoginPage = (mLoginPage || $("#loginPage"));
        return mLoginPage;
    }
    var mNoUserPage = null;
    function _getNoUserPage() {
        mNoUserPage = (mNoUserPage || $("#nouserPage"));
        return mNoUserPage;
    }
    var mAccessRequestedPage = null;
    function _getAccessRequestedPage() {
        mAccessRequestedPage = (mAccessRequestedPage || $("#accessRequestedPage"));
        return mAccessRequestedPage;
    }
    var mNoRolPage = null;
    function _getNoRolPage() {
        mNoRolPage = (mNoRolPage || $("#norolPage"));
        return mNoRolPage;
    }
    var mWaitingServerPage = null;
    function _getWaitingServerPage() {
        mWaitingServerPage = (mWaitingServerPage || $("#waitingServerPage"));
        return mWaitingServerPage;
    }
    var mAdminMenuPage = null;
    function _getAdminMenuPage() {
        mAdminMenuPage = (mAdminMenuPage || $("#adminMenuPage"));
        return mAdminMenuPage;
    }
    var mDonatePage = null;
    function _getDonatePage() {
        mDonatePage = (mDonatePage || $("#donatePage"));
        return mDonatePage;
    }
    var mAdminUserListPage = null;
    function _getAdminUserListPage() {
        mAdminUserListPage = (mAdminUserListPage || $("#adminUserListPage"));
        return mAdminUserListPage;
    }
    // -----------------------------------------------------
    // Main form
    var mDonationFormHeader = null;
    var mDonationFormContent = null;
    var mDonationFormFooter = null;
    // Transition
    var mDonationFormTransition = null;
    // Confirmation
    var mDonationFormConfirmationHeader = null;
    var mDonationFormConfirmationContent = null;
    var mDonationFormConfirmationFooter = null;
    //
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        me = this;
        //if (mMobile) {
        //    mBreadInput = $('#BreadSlider');
        //    mCakesInput = $('#CakeSlider');
        //    mSandwichesInput = $('#SandwichSlider');
        //    mSaladsInput = $('#SaladSlider');
        //} else {
        //    mBreadInput = $('#breadinput');
        //    mCakesInput = $('#cakesinput');
        //    mSandwichesInput = $('#sandwichesinput');
        //    mSaladsInput = $('#saladsinput');
        //}
        // Main form
        mDonationFormHeader = $('#donationFormHeader');
        mDonationFormContent = $('#donationFormContent');
        mDonationFormFooter = $('#donationFormFooter');
        // Transition
        mDonationFormTransition = $('#donationFormTransition');
        // Confirmation
        mDonationFormConfirmationHeader = $('#donationFormConfirmationHeader');
        mDonationFormConfirmationContent = $('#donationFormConfirmationContent');
        mDonationFormConfirmationFooter = $('#donationFormConfirmationFooter');
    }
    // -----------------------------------------------------
    // jQuery Mobile
    // -----------------------------------------------------
    //
    function _hideDonationForm() {
        mDonationFormHeader.hide();
        mDonationFormContent.hide();
        mDonationFormFooter.hide();
    }
    function _showDonationForm() {
        mDonationFormHeader.show();
        mDonationFormContent.show();
        mDonationFormFooter.show();
    }
    function _hideContentTransition() {
        mDonationFormTransition.hide();
    }
    function _showContentTransition() {
        mDonationFormTransition.show();
    }
    function _hideConfirmation() {
        mDonationFormConfirmationHeader.hide();
        mDonationFormConfirmationContent.hide();
        mDonationFormConfirmationFooter.hide();
    }
    function _showConfirmation() {
        mDonationFormConfirmationHeader.show();
        mDonationFormConfirmationContent.show();
        mDonationFormConfirmationFooter.show();
    }
    // -----------------------------------------------------
    //
    function _adminDonateButtonClick(pevt) {
        me.ShowPageDonate(true);
        pevt.preventDefault();
    }
    //
    function _addDonationButtonClick(pevt) {
        _getDonateController().CreateDonation();
        pevt.preventDefault();
    }
    //
    function _logoutButtonClick(pevt) {
        _getDonateController().LogoutStart();
        pevt.preventDefault();
    }
    //
    function _volverButtonClick(pevt) {
        _showDonationForm();
        _hideContentTransition();
        _hideConfirmation();
        pevt.preventDefault();
    }
    //
    function _requestAccessButtonClick(pevt) {
        _getDonateController().RequestAccessStart();
        pevt.preventDefault();
    }
    //
    function _backToMenuButtonClick(pevt) {
        me.ShowPageAdminMenu();
        pevt.preventDefault();
    }
    //
    function _adminUsersButtonClick(pevt) {
        _getDonateController().ShowPageAdminUserList();
        pevt.preventDefault();
    }
    //
    //function _refreshButtonClick(pevt) {
    //    _getDonateController().RefreshDonations();
    //    pevt.preventDefault();
    //}
    //
    function _setup() {
        //$.mobile.toolbar.prototype.options.addBackBtn = true;
        //$.mobile.toolbar.prototype.options.backBtnText = "Volver";
        // 
        $("#adminUsers").button().click(_adminUsersButtonClick);
        $("#adminDonate").button().click(_adminDonateButtonClick);
        $("#requestAccess").button().click(_requestAccessButtonClick);
        $("#addDonationButton").button().click(_addDonationButtonClick);
        $(".ui-btn.logout").button().click(_logoutButtonClick);
        $(".ui-btn.back-to-menu").button().click(_backToMenuButtonClick);
        $("#volverButton").button().click(_volverButtonClick);
        //$("#refreshButton").button().click(_refreshButtonClick);
    }
    Constr.prototype.SetDonateController = function (p) { mDonateController = p; }
    Constr.prototype.Setup = function () { _setup(); }
    // -----------------------------------------------
    Constr.prototype.AccessRequestedEnd = function() {
        var p = _getAccessRequestedPage();
        _showPage(p);
    }
    //
    function _showPage(p) {
        $.mobile.pageContainer.pagecontainer("change", p, { transition: 'fade' });
    }
    //
    Constr.prototype.ShowPageDonate = function (pisadmin) {
        if (pisadmin === true) {
            $('#donateBackButton').parent().show();
            $('#donateFormLogout').parent().hide();
        } else {
            $('#donateBackButton').parent().hide();
            $('#donateFormLogout').parent().show();
        }
        _showDonationForm();
        _hideConfirmation();
        _hideContentTransition();
        _showPage(_getDonatePage());
    }
    Constr.prototype.ShowPageLogin = function () {
        _showPage(_getLoginPage());
    }
    Constr.prototype.ShowPageNoRol = function () {
        _showPage(_getNoRolPage());
    }
    Constr.prototype.ShowPageNoUser = function () {
        _showPage(_getNoUserPage());
    }
    Constr.prototype.ShowPageAdminMenu = function () {
        _showPage(_getAdminMenuPage());
    }
    Constr.prototype.ShowPageAdminUserList = function (presponse) {
        var template = $('#personListItemTpl').html();
        var html = Mustache.to_html(template, presponse);
        $('#adminUserList').html(html).listview('refresh');
        _showPage(_getAdminUserListPage());
    }
    //
    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    //Constr.prototype.RefreshDonations = function (pdata) {
    // -----------------------------------------------
    // Gets form data for a donation
    Constr.prototype.GetFormData = function () {
        // TODO validate numbers
        var bread = $('#BreadSlider').val();
        var cakes = $('#CakeSlider').val();
        var sandwiches = $('#SandwichSlider').val();
        var salads = $('#SaladSlider').val();
        var o = { Bread: bread, Cake: cakes, Sandwich: sandwiches, Salad: salads };
        return o;
    }
    // -----------------------------------------------
    Constr.prototype.Loading = function () {
        _hideDonationForm();
        _showContentTransition();
        $.mobile.loading('show', {
            text: 'Enviando datos...',
            textVisible: true,
            theme: 'b',
            textonly: false
            //html: html
        });
    }
    Constr.prototype.WaitingForServer = function (pmsg) {
        var p = _getWaitingServerPage();
        _showPage(p);
        $.mobile.loading('show', {
            text: pmsg,
            textVisible: true,
            theme: 'b',
            textonly: false
            //html: html
        });
    }
    // -----------------------------------------------
    Constr.prototype.DonationOK = function () {
        _hideDonationForm();
        _hideContentTransition();
        $.mobile.loading("hide");
        _showConfirmation();
    }
    // -----------------------------------------------
    function _showError(perror) {
        var text = perror + (perror.request ? ' - ' + perror.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }
    Constr.prototype.ShowError = function (perror) {
        _showDonationForm();
        _hideContentTransition();
        _hideConfirmation();
        $.mobile.loading("hide");
        //_showConfirmation();
        //alert(perror);
        _showError(perror);
        $.mobile.changePage("#dialogPage", { role: "dialog" });
    }
    //
    return Constr;
}(jQuery));