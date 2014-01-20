DonateView = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mUserLoggedIn = false;
    var mMobile = true;
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
    var mDonatePage = null;
    function _getDonatePage() {
        mDonatePage = (mDonatePage || $("#donatePage"));
        return mDonatePage;
    }
    var mNoRolPage = null;
    function _getNoRolPage() {
        mNoRolPage = (mNoRolPage || $("#norolPage"));
        return mNoRolPage;
    }
    var mAccessRequestedPage = null;
    function _getAccessRequestedPage() {
        mAccessRequestedPage = (mAccessRequestedPage || $("#accessRequestedPage"));
        return mAccessRequestedPage;
    }
    var mWaitingServerPage = null;
    function _getWaitingServerPage() {
        mWaitingServerPage = (mWaitingServerPage || $("#waitingServerPage"));
        return mWaitingServerPage;
    }
    var mLoginPage = null;
    function _getLoginPage() {
        mLoginPage = (mLoginPage || $("#loginPage"));
        return mLoginPage;
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
    //function _refreshButtonClick(pevt) {
    //    _getDonateController().RefreshDonations();
    //    pevt.preventDefault();
    //}
    //
    function _setup() {
        $("#requestAccess").button().click(_requestAccessButtonClick);
        $("#addDonationButton").button().click(_addDonationButtonClick);
        $(".ui-btn.logout").button().click(_logoutButtonClick);
        $("#volverButton").button().click(_volverButtonClick);
        //$("#refreshButton").button().click(_refreshButtonClick);
    }
    Constr.prototype.SetDonateController = function (p) { mDonateController = p; }
    Constr.prototype.Setup = function () { _setup(); }
    // -----------------------------------------------
    Constr.prototype.AccessRequestedEnd = function() {
        var page = _getAccessRequestedPage();
        $.mobile.pageContainer.pagecontainer("change", page, { transition: 'slide' });
    }
    // Sets logged in status
    Constr.prototype.SetLogged = function (p) {
        var ko = (p !== true);
        mUserLoggedIn = (p === true);
        //mBreadInput.prop('disabled', ko);
        //mCakesInput.prop('disabled', ko);
        //mSandwichesInput.prop('disabled', ko);
        //mSaladsInput.prop('disabled', ko);
        //$("input").prop('disabled', ko);
        //$("#addDonationButton").button("option", "disabled", ko);
        //$("#refreshButton").button("option", "disabled", ko);
        // jQuery Mobile
        // SI logado
        if (mUserLoggedIn) {
            //$.mobile.pageContainer.change($("#mainPage"));
            var page = _getDonatePage();
            $.mobile.pageContainer.pagecontainer("change", page, {transition: 'slide'});
            _showDonationForm();
            _hideConfirmation();
            _hideContentTransition();
        } else {
            // TODO
            var page = _getLoginPage();
            //$.mobile.changePage(page);
            //$.mobile.pageContainer.change(page);
            $.mobile.pageContainer.pagecontainer("change", page, { transition: 'slide' });
        }
    }
    Constr.prototype.ShowPageNoRol = function () {
        var page = _getNoRolPage();
        $.mobile.pageContainer.pagecontainer("change", page, { transition: 'slide' });
    }
    //
    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    Constr.prototype.RefreshDonations = function (pdata) {
        //var query = donationsTable;
        if (mUserLoggedIn === true) {
            pdata.read().then(function (donations) {
                var listItems = $.map(donations, function (item) {
                    return $('<li>')
                        .attr('data-todoitem-id', item.id)
                        .append($('<span>').append($('<input class="donationNumber">').val(item.Bread)))
                        .append($('<span>').append($('<input class="donationNumber">').val(item.Cake)))
                        .append($('<span>').append($('<input class="donationNumber">').val(item.Sandwich)))
                        .append($('<span>').append($('<input class="donationNumber">').val(item.Salad)))
                    ;
                });
                $('#donationsList').empty().append(listItems).toggle(listItems.length > 0);
                $('#summary').html('<strong>' + donations.length + '</strong> item(s)');
            }, _showError);
        }
    }
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
        var page = _getWaitingServerPage();
        $.mobile.pageContainer.pagecontainer("change", page, { transition: 'slide' });
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