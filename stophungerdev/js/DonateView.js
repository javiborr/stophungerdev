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
    // Users
    var mAdminUserListPage = null;
    function _getAdminUserListPage() {
        mAdminUserListPage = (mAdminUserListPage || $("#adminUserListPage"));
        return mAdminUserListPage;
    }
    var mAdminUserPage = null;
    function _getAdminUserPage() {
        mAdminUserPage = (mAdminUserPage || $("#adminUserFormPage"));
        return mAdminUserPage;
    }
    // Sites
    var mAdminSiteListPage = null;
    function _getAdminSiteListPage() {
        mAdminSiteListPage = (mAdminSiteListPage || $("#adminSiteListPage"));
        return mAdminSiteListPage;
    }
    var mAdminSitePage = null;
    function _getAdminSitePage() {
        mAdminSitePage = (mAdminSitePage || $("#adminSiteFormPage"));
        return mAdminSitePage;
    }
    // -----------------------------------------------------
    // Admin user form Rol checkboxes
    var mAdminUserRolAdminCheck = null;
    function _getAdminUserRolAdminCheck() {
        mAdminUserRolAdminCheck = (mAdminUserRolAdminCheck || $("#radioRolAdmin"));
        return mAdminUserRolAdminCheck;
    }
    var mAdminUserRolGivesCheck = null;
    function _getAdminUserRolGivesCheck() {
        mAdminUserRolGivesCheck = (mAdminUserRolGivesCheck || $("#radioRolGives"));
        return mAdminUserRolGivesCheck;
    }
    var mAdminUserRolTakesCheck = null;
    function _getAdminUserRolTakesCheck() {
        mAdminUserRolTakesCheck = (mAdminUserRolTakesCheck || $("#radioRolTakes"));
        return mAdminUserRolTakesCheck;
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
    function _volverDonateButtonClick(pevt) {
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
    // --------- USERS --------------------
    function _backToUserListButtonClick(pevt) {
        _getDonateController().ShowPageAdminUserList();
        pevt.preventDefault();
    }
    //
    function _adminUserFormSaveButtonClick(pevt) {
        var udata = {};
        // TODO other fields
        var r1 = _getAdminUserRolAdminCheck();
        var r2 = _getAdminUserRolGivesCheck();
        var r3 = _getAdminUserRolTakesCheck();
        udata.Admin = false;
        udata.Gives = false;
        udata.Takes = false;
        // SEGUN rol
        if (r1.prop('checked') === true) {
            udata.Admin = true;
        } else
            if (r2.prop('checked') === true) {
                udata.Gives = true;
            } else
                if (r3.prop('checked') === true) {
                    udata.Takes = true;
                }
        _getDonateController().SaveUser(udata, _getDonateController().ShowPageAdminUserList, null);
        pevt.preventDefault();
    }
    //
    function _adminUsersButtonClick(pevt) {
        _getDonateController().ShowPageAdminUserList();
        pevt.preventDefault();
    }
    // --------- SITES --------------------
    function _backToSiteListButtonClick(pevt) {
        _getDonateController().ShowPageAdminSiteList();
        pevt.preventDefault();
    }
    //
    function _adminSiteFormSaveButtonClick(pevt) {
        // TODO form validation
        $.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        var f = $("#adminSiteForm");
        f.validate();
        if ( f.valid() ) {
            var data = {};
            data.name = $('#SiteNameText').val();
            data.Address1 = $('#Address1Text').val();
            data.ZIP = $('#ZIPText').val();
            data.City = $('#CityText').val();
            data.Longitud = $('#LongitudText').val();
            data.Latitud = $('#LatitudText').val();
            // TODO other fields
            _getDonateController().SaveSite(data, _getDonateController().ShowPageAdminSiteList, _adminSiteFormError);
        }
        pevt.preventDefault();
    }
    //
    function _adminSitesButtonClick(pevt) {
        _getDonateController().ShowPageAdminSiteList();
        pevt.preventDefault();
    }
    //
    function _adminSiteFormError(perror) {
        $('#siteFormError').text(perror);
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
        // Users
        $("#adminUserFormSaveButton").button().click(_adminUserFormSaveButtonClick);
        $("#adminUsers").button().click(_adminUsersButtonClick);
        $(".ui-btn.back-to-userlist").button().click(_backToUserListButtonClick);
        // Sites
        $("#adminSiteFormSaveButton").button().click(_adminSiteFormSaveButtonClick);
        $("#adminSites").button().click(_adminSitesButtonClick);
        $(".ui-btn.back-to-sitelist").button().click(_backToSiteListButtonClick);
        // Donations
        $("#adminDonate").button().click(_adminDonateButtonClick);
        $("#addDonationButton").button().click(_addDonationButtonClick);
        $("#volverDonateButton").button().click(_volverDonateButtonClick);
        // Admin
        $("#requestAccess").button().click(_requestAccessButtonClick);
        $(".ui-btn.logout").button().click(_logoutButtonClick);
        $(".ui-btn.back-to-menu").button().click(_backToMenuButtonClick);
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
    // -----------------------------------------------
    // Muestra la lista de usuarios
    Constr.prototype.ShowPageAdminUserList = function (presponse) {
        var template = $('#personListItemTpl').html();
        var html = Mustache.to_html(template, presponse);
        var ui = $('#adminUserList');
        ui.html(html);
        _showPage(_getAdminUserListPage());
        ui.listview('refresh');
    }
    // Muestra un usuario
    Constr.prototype.ShowPageAdminUser = function (pudata) {
        if (pudata !== null && pudata.length > 0) {
            var template = $('#personTpl').html();
            var html = Mustache.to_html(template, pudata[0]);
            var ui = $('#adminUserData');
            ui.html(html);
            //
            var r1 = _getAdminUserRolAdminCheck();
            var r2 = _getAdminUserRolGivesCheck();
            var r3 = _getAdminUserRolTakesCheck();
            r1.prop('checked', false);
            r2.prop('checked', false);
            r3.prop('checked', false);
            //r1.checkboxradio('refresh');
            //r2.checkboxradio('refresh');
            //r3.checkboxradio('refresh');
            // SI es Admin
            if (pudata[0].Admin == true) {
                r1.prop('checked', true);
            } else
                if (pudata[0].Gives == true) {
                    r2.prop('checked', true);
                } else
                    if (pudata[0].Takes == true) {
                        r3.prop('checked', true);
                    }
            //
            _showPage(_getAdminUserPage());
            r1.checkboxradio('refresh');
            r2.checkboxradio('refresh');
            r3.checkboxradio('refresh');
        }
    }
    //
    // -----------------------------------------------
    // Muestra la lista de sitios
    Constr.prototype.ShowPageAdminSiteList = function (presponse) {
        var template = $('#siteListItemTpl').html();
        var html = Mustache.to_html(template, presponse);
        var ui = $('#adminSiteList');
        ui.html(html);
        _showPage(_getAdminSiteListPage());
        ui.listview('refresh');
    }
    // Muestra un sitio
    Constr.prototype.ShowPageAdminSite = function (pudata) {
        if (pudata !== null && pudata.length > 0) {
            var template = $('#siteTpl').html();
            var html = Mustache.to_html(template, pudata[0]);
            var ui = $('#adminSiteData');
            ui.html(html);
            //
            _showPage(_getAdminSitePage());
            //
            var long = $('#LongitudText').val();
            var lat = $('#LatitudText').val();
            var mapOptions = {
                center: new google.maps.LatLng(long, lat),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                callback: function () {
                    var self = this;
                    self.addMarker({ 'position': this.get('map').getCenter() }).click(function () {
                        self.openInfoWindow({ 'content': 'Hello World!' }, this);
                    });
                }
            };
            var map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);
            //
            //var mobileDemo = { 'center': [long, lat].join(','), 'zoom': 10 };
            //var map = $('#mapcanvas').gmap({
            //    'center': mobileDemo.center,
            //    'zoom': mobileDemo.zoom,
            //    'disableDefaultUI': false,
            //    'callback': function () {
            //        var self = this;
            //        self.addMarker({ 'position': this.get('map').getCenter() }).click(function () {
            //            self.openInfoWindow({ 'content': 'Hello World!' }, this);
            //        });
            //    }
            //});
            google.maps.event.addListenerOnce(map, 'idle', function () {
                setTimeout(function () {
                    google.maps.event.trigger(map, 'resize');
                }, 500);
            });
            //
        }
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