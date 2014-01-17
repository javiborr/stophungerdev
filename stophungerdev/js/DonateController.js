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
    Constr.prototype.SetDonationManager = function (p) { mDonationManager = p; }
    Constr.prototype.SetDonateView = function (p) { mDonateView = p; }
    //
    // -----------------------------------------------
    // Show donations
    Constr.prototype.RefreshDonations = function () {
        _refreshDonations();
    }
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
        //_getDonateView().ShowError('ERROR');
        _getDonateView().DonationOK();
        //_refreshDonations();
    }
    function _handleError(perror) {
        _getDonateView().ShowError(perror);
    }
    //
    return Constr;
}(jQuery));