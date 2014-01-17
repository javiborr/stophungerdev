DonationManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mAppURL = 'https://stophunger.azure-mobile.net/';
    var mAppKey = 'MDRQPHGRJDbpeYDwLbFAYIVDZKIjHl37';
    //
    var mMSClient;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL,mAppKey);
    }
    // -----------------------------------------------
    // Gets all donations
    Constr.prototype.GetAllDonations = function () {
        var data = mMSClient.getTable('donations');
        return data;
    }
    // -----------------------------------------------
    // Creates donation
    Constr.prototype.Create = function (pdata, pcallbok, pcallberr) {
        var data = mMSClient.getTable('donations');
        data.insert(pdata).then(pcallbok, pcallberr);
    }
    //
    return Constr;
}(jQuery));

    // Handle insert
    // Handle update
    // Handle delete
