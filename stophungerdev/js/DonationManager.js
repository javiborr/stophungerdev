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
    Constr.prototype.Create = function (pdata, pcbkok, pcbkerr) {
        // SI NO valen los datos
        if (typeof (pdata.Site) === 'undefined' || pdata.Site === null) {
            if (pcbkerr) pcbkerr('Faltan los datos del restaurante.\nPor favor sal y vuelve a entrar en la aplicacion.');
        } else 
            if (typeof (pdata.Donor) === 'undefined' || pdata.Donor === null) {
                if (pcbkerr) pcbkerr('Faltan tus datos.\nPor favor sal y vuelve a entrar en la aplicacion.');
            } else {
                var data = mMSClient.getTable('donations');
                data.insert(pdata).then(pcbkok, pcbkerr);
            }
    }
    //
    return Constr;
}(jQuery));
