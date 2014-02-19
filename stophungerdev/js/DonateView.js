DonateView = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mMobile = true;
    var me = null;
    // DonateController
    var mDonateController = null;
    function _getDonateController() {
        if (mDonateController === null) {
            throw 'DonateView mDonateController is null';
        }
        return mDonateController;
    }
    // MapManager
    var mMapManager = null;
    function _getMapManager() {
        if (mMapManager === null) {
            throw 'DonateView mMapManager is null';
        }
        return mMapManager;
    }
    // UserManager
    var mUserManager = null;
    function _getUserManager() {
        if (mUserManager === null) {
            throw 'DonateView mUserManager is null';
        }
        return mUserManager;
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
    // Donations
    var mDonatePage = null;
    function _getDonatePage() {
        mDonatePage = (mDonatePage || $("#donatePage"));
        return mDonatePage;
    }
    var mDonateConfirmPage = null;
    function _getDonateConfirmPage() {
        mDonateConfirmPage = (mDonateConfirmPage || $("#donateConfirmPage"));
        return mDonateConfirmPage;
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
    // dialogPage
    var mDialogPage = null;
    function _getDialogPage() {
        mDialogPage = (mDialogPage || $("#dialogPage"));
        return mDialogPage;
    }
    // -----------------------------------------------------
    // Maps
    // -----------------------------------------------------
    //var mSiteMap = null;
    //var mMapMarkerDest = null;
    //var mMapMarkerMyPos = null;
    //function _getSiteMap() {
    //function _resetSiteMap(plong, plat) {
    //function _createSiteMap(plong, plat) {

    // -----------------------------------------------------
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
    // Button click handlers
    // -----------------------------------------------------
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
    function _confirmDonationButtonClick(pevt) {
        _getDonateController().ConfirmDonation();
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
        _getDonateController().ShowDonateFormPage();
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
    // -----------------------------------------------------
    // --------- USERS --------------------
    // -----------------------------------------------------
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
        var siteid = null;
        // SEGUN rol
        // SI es admin
        if (r1.prop('checked') === true) {
            udata.Admin = true;
            siteid = $("#select-site option:selected").val();
        } else
            // SI es donante
            if (r2.prop('checked') === true) {
                udata.Gives = true;
                siteid = $("#select-site option:selected").val();
            } else
                // SI es receptor
                if (r3.prop('checked') === true) {
                    udata.Takes = true;
                }
        // Sites
        udata.SiteID = siteid;
        //
        _getDonateController().SaveUser(udata, _getDonateController().ShowPageAdminUserList, null);
        pevt.preventDefault();
    }
    //
    function _adminUsersButtonClick(pevt) {
        _getDonateController().ShowPageAdminUserList();
        pevt.preventDefault();
    }
    // -----------------------------------------------------
    // --------- SITES --------------------
    // -----------------------------------------------------
    // Muestra la lista de sites
    function _adminSitesButtonClick(pevt) {
        _getDonateController().ShowPageAdminSiteList();
        pevt.preventDefault();
    }
    //
    function _adminSitesNewButtonClick(pevt) {
        _getDonateController().ShowPageAdminSite();
        pevt.preventDefault();
    }
    //
    function _adminSiteFormSaveButtonClick(pevt) {
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
    function _adminSiteFormError(perror) {
        $('#siteFormError').text(perror);
    }
    //
    function _makeReservationError(perror) {
        var msg = ['No ha sido posible hacer la reserva'
            , perror
        ].join('\n');
        alert(msg);
        _getDonateController().ShowPageAdminSiteList();
    }
    //
    function _makeReservationButtonClick(pevt) {
        _getDonateController().MakeReservationCurrent(_getDonateController().ShowPageAdminSiteList, _makeReservationError);
        pevt.preventDefault();
    }
    // -----------------------------------------------------
    // Initialize
    // -----------------------------------------------------
    function _setup() {
        // Todavía no sabe los datos del usuario
        //var bisadmin = _getUserManager().CurrentUserIsAdmin();
        //$.mobile.toolbar.prototype.options.addBackBtn = true;
        //$.mobile.toolbar.prototype.options.backBtnText = "Volver";
        // 
        // Users
        $("#adminUsers").button().click(_adminUsersButtonClick);
        $("#adminUserFormSaveButton").click(_adminUserFormSaveButtonClick);
        $(".ui-btn-left.back-to-userlist").click(_backToUserListButtonClick);
        // Sites 
        $("#adminSites").button().click(_adminSitesButtonClick);
        $("#adminSiteFormSaveButton").button().click(_adminSiteFormSaveButtonClick);
        $(".ui-btn-left.back-to-sitelist").click(_adminSitesButtonClick);
        $("#makeReservationButton").button().click(_makeReservationButtonClick);
        // Donations
        $("#adminDonate").button().click(_adminDonateButtonClick);
        $("#addDonationButton").click(_addDonationButtonClick);
        $("#confirmDonationButton").click(_confirmDonationButtonClick);
        $("#volverDonateButton").click(_volverDonateButtonClick);
        $(".ui-btn-left.back-to-donate").click(_volverDonateButtonClick);
        // Admin
        $("#requestAccess").button().click(_requestAccessButtonClick);
        $(".ui-btn.logout").button().click(_logoutButtonClick);
        // SI es Admin
        //if (bisadmin) {
        //    $("#adminSitesNewButton").click(_adminSitesNewButtonClick);
        //    $(".ui-btn-left.back-to-menu").click(_backToMenuButtonClick);
        //} else {
        //    $("#adminSitesNewButton").hide();
        //    $(".ui-btn-left.back-to-menu").hide();
        //}
        //$(".ui-btn.back-to-menu").button().click(_backToMenuButtonClick);
        //$("#refreshButton").button().click(_refreshButtonClick);
        // ------------------------------------------------------
        // Form user
        // ------------------------------------------------------
        $(document).on('change', 'input:radio.selectSite', function () {
            // SI es Giver muestra el control
            var bvisible = ((this.id === 'radioRolGives') || (this.id === 'radioRolAdmin'));
            if ( bvisible ) {
                $("#adminUserSelectSite").show();
            } else {
                $("#adminUserSelectSite").hide();
            }
        });
        // ------------------------------------------------------
        // Form site
        // ------------------------------------------------------
        $(document).on("pageshow", "#adminSiteFormPage", function () {
            $.validator.addMethod(
                "ZIP"
                , function (p) {
                    var patt = new RegExp("[0-9]{5}");
                    return patt.test(p);
                }
                , 'Debe ser 5 d&iacute;gitos'
                );
            $.validator.addMethod(
                "Geodata"
                , function (p) {
                    var patt = new RegExp("[\-]*[0-9]+\.[0-9]+");
                    return patt.test(p);
                }
                , 'Debe ser parecido a 40.51325 o -3.67158'
                );
            $("#adminSiteForm").validate();
        });
        var mapman = _getMapManager();
        $('#siteMapTabLink').on('click', function (pev) {
            // TODO
            // Obtener lonlat cuando no hay form???
            var long = $('#LongitudText').val();
            var lat = $('#LatitudText').val();
            mapman.Refresh(long, lat);
        });
    }
    //
    Constr.prototype.SetRole = function (p) {
        var bisadmin = (p === Role.Admin);
        if (bisadmin) {
            $("#adminSitesNewButton").click(_adminSitesNewButtonClick);
            $(".ui-btn-left.back-to-menu").click(_backToMenuButtonClick);
            $(".noadmin.logout").parent().hide();
        } else {
            $("#adminSitesNewButton").hide();
            $(".ui-btn-left.back-to-menu").hide();
        }
    }
    //
    Constr.prototype.SetDonateController = function (p) { mDonateController = p; }
    //
    Constr.prototype.SetUserManager = function (p) { mUserManager = p; }
    // MapManager
    Constr.prototype.SetMapManager = function (p) {
        mMapManager = p;
        if (mMapManager !== null) {
            mMapManager.SetMapDivID('map-canvas');
        }
    }
    //
    Constr.prototype.Setup = function () { _setup(); }
    // -----------------------------------------------
    Constr.prototype.AccessRequestedEnd = function() {
        var p = _getAccessRequestedPage();
        _showPage(p);
    }
    //
    // -----------------------------------------------------
    // Show pages
    // -----------------------------------------------------
    function _showPage(p) {
        $.mobile.pageContainer.pagecontainer("change", p, { transition: 'fade' });
    }
    //
    Constr.prototype.ShowPageDonate = function (pisadmin) {
        if (pisadmin === true) {
            $('#donateBackButton').show();
            $('#donateFormLogout').hide();
        } else {
            $('#donateBackButton').hide();
            $('#donateFormLogout').show();
        }
        _showDonationForm();
        _hideConfirmation();
        _hideContentTransition();
        _showPage(_getDonatePage());
    }
    //
    Constr.prototype.ShowPageDonateConfirm = function (p) {
        // TODO template
        var template = $('#donateConfirmTpl').html();
        var html = Mustache.to_html(template, p);
        var ui = $('#donateConfirm');
        ui.html(html);
        //
        _showPage(_getDonateConfirmPage());
    }
    //
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
            var udata = pudata[0];
            var template = $('#personTpl').html();
            var html = Mustache.to_html(template, udata);
            var ui = $('#adminUserData');
            ui.html(html);
            //
            var r1 = _getAdminUserRolAdminCheck();
            var r2 = _getAdminUserRolGivesCheck();
            var r3 = _getAdminUserRolTakesCheck();
            r1.prop('checked', false);
            r2.prop('checked', false);
            r3.prop('checked', false);
            // SI es Admin
            if (udata.Admin == true) {
                r1.prop('checked', true);
                $("#adminUserSelectSite").show();
            } else
                if (udata.Gives == true) {
                    r2.prop('checked', true);
                    $("#adminUserSelectSite").show();
                } else
                    if (udata.Takes == true) {
                        r3.prop('checked', true);
                        $("#adminUserSelectSite").hide();
                    }
            // Obtiene la lista de todos los restaurantes
            _getDonateController().GetAllSitesFromDB(
                function (presponse) {
                    template = $('#selectSiteListItemTpl').html();
                    html = Mustache.to_html(template, presponse);
                    ui = $('#select-site');
                    ui.html(html);
                    // Selecciona el restaurante del usuario
                    var s = ["#select-site option[value='",udata.SiteID,"']"].join('');
                    $(s).attr('selected', 'selected');
                    _showPage(_getAdminUserPage());
                    ui.selectmenu('refresh');
                    r1.checkboxradio('refresh');
                    r2.checkboxradio('refresh');
                    r3.checkboxradio('refresh');
                });
        }
    }
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
    Constr.prototype.ShowPageAdminSite = function (pdata) {
        var data = null;
        // SI nuevo
        if (typeof (pdata) === 'undefined' || pdata === null) {
            data = [];
        } else {
            data = pdata;
        }
        //
        var uman = _getUserManager();
        var bisadmin = uman.CurrentUserIsAdmin();
        // Hay donativo?
        var bhaydon = ((data.Bread > 0) || (data.Cake > 0) || (data.Sandwich > 0) || (data.Salad > 0));
        // Reservado?
        // pdata.Reserved
        // pdata.ReservedFor
        // TODO nombre reservador para
        var breserved = (data.Reserved === true);
        var breserved4me = (uman.CurrentUserID() === data.ReservedFor);
        // SI NO reservada
        if (!breserved) {
            var template = $('#donationAvailableTpl').html();
            var html = Mustache.to_html(template, data);
            var ui = $('#siteAndDonationInfo');
            ui.html(html);
            $("#makeReservationButton").parent().show();
        } else {
            // SI reservada para mi
            if (breserved4me) {
                var template = $('#donationReserved4MeTpl').html();
                var html = Mustache.to_html(template, data);
                var ui = $('#siteAndDonationInfo');
                ui.html(html);
                // TODO cancelar reserva
                $("#makeReservationButton").parent().hide();
            } else {
                // Reservado para otro
                var template = $('#donationReservedOtherTpl').html();
                var html = Mustache.to_html(template, data);
                var ui = $('#siteAndDonationInfo');
                ui.html(html);
                $("#makeReservationButton").parent().hide();
            }
        }
        // SI NO hay donativo
        if (!bhaydon) {
            $("#makeReservationButton").parent().hide();
        }
        // SI admin muestra el form site
        if (bisadmin) {
            // Form site
            var template = $('#siteTpl').html();
            var html = Mustache.to_html(template, data);
            var ui = $('#adminSiteData');
            ui.html(html);
            //
            _showPage(_getAdminSitePage());
            $("#tabs").tabs("option", "active", 0);
            $("#siteFormTabLink").addClass('ui-btn-active');
        } else {
            // No puede consultar el form site
            _getMapManager().SetLonLat(data.Longitud, data.Latitud);
            //
            _showPage(_getAdminSitePage());
            setTimeout(function () {
                $("#siteFormTabLI").hide();
                $("#siteFormTab").hide();
                $("#siteDonationTab").show();
                //
                $("#tabs").tabs("option", "active", 2);
                $("#siteDonationTabLink").addClass('ui-btn-active');
            }, 500);
        }
    }
    //
    // -----------------------------------------------
    // Donate forms data
    // -----------------------------------------------
    // Gets form data for a donation
    Constr.prototype.GetDonateFormData = function () {
        // TODO validate numbers
        var bread = $('#BreadSlider').val();
        var cakes = $('#CakeSlider').val();
        var sandwiches = $('#SandwichSlider').val();
        var salads = $('#SaladSlider').val();
        var o = { Bread: bread, Cake: cakes, Sandwich: sandwiches, Salad: salads };
        return o;
    }
    // -----------------------------------------------
    //Constr.prototype.Loading = function () {
    //    _hideDonationForm();
    //    _showContentTransition();
    //    $.mobile.loading('show', {
    //        text: 'Enviando datos...',
    //        textVisible: true,
    //        theme: 'b',
    //        textonly: false
    //        //html: html
    //    });
    //}
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
        _showPage(_getDonatePage());
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
        _showPage(_getDialogPage());
        //$.mobile.changePage("#dialogPage", { role: "dialog" });
    }
    //
    return Constr;
}(jQuery));