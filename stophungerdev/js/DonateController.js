﻿DonateController = (function ($) {
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
    var mPeopleManager;
    function _getPeopleManager() {
        if (mPeopleManager === null) {
            throw 'DonateController mPeopleManager is null';
        }
        return mPeopleManager;
    }
    // FB
    var mFBManager;
    function _getFBManager() {
        if (mFBManager === null) {
            throw 'DonateController mFBManager is null';
        }
        return mFBManager;
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
    // Constructor
    // -----------------------------------------------------
    var Constr = function () { }
    //
    Constr.prototype.SetFBManager = function (p) { mFBManager = p; }
    Constr.prototype.SetDonationManager = function (p) { mDonationManager = p; }
    Constr.prototype.SetPeopleManager = function (p) { mPeopleManager = p; }
    Constr.prototype.SetDonateView = function (p) { mDonateView = p; }
    //
    // -----------------------------------------------
    // Logout
    Constr.prototype.LogoutStart = function () {
        _getFBManager().Logout();
    }
    // RequestAccess
    Constr.prototype.RequestAccessStart = function () {
        _getDonateView().WaitingForServer();
        var cudata = _getFBManager().GetCurrentUserData();
        _getPeopleManager().Create(cudata, _requestAccessOK, _handleError);
    }
    function _requestAccessOK() {
        _getDonateView().AccessRequestedEnd();
    }
    // -----------------------------------------------
    // Show donations
    //Constr.prototype.RefreshDonations = function () {
    //    _refreshDonations();
    //}
    // -----------------------------------------------
    // Action create a donation
    Constr.prototype.CreateDonation = function () {
        var donationdata = _getDonateView().GetFormData();
        _getDonateView().Loading();
        _getDonationManager().Create(donationdata, _donationCreatedOK, _handleError);
    }
    // -----------------------------------------------
    //function _refreshDonations() {
    //    var donationdata = _getDonationManager().GetAllDonations();
    //    _getDonateView().RefreshDonations(donationdata);
    //}
    function _donationCreatedOK() {
        _getDonateView().DonationOK();
    }
    function _handleError(perror) {
        _getDonateView().ShowError(perror);
    }
    //
    return Constr;
}(jQuery));