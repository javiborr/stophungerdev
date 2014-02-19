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
    // -----------------------------------------------
    // Makes a reservation
    // {Site, TakerID, DonationID}
    Constr.prototype.MakeReservation = function (pdata, pcbkok, pcbkerr) {
        // SI NO valen los datos
        if (typeof (pdata.Site) === 'undefined' || pdata.Site === null) {
            if (pcbkerr) pcbkerr('Faltan los datos del restaurante.\nPor favor sal y vuelve a entrar en la aplicacion.');
        } else
            if (typeof (pdata.TakerID) === 'undefined' || pdata.TakerID === null) {
                if (pcbkerr) pcbkerr('Faltan tus datos.\nPor favor sal y vuelve a entrar en la aplicacion.');
            } else {
                if (typeof (pdata.DonationID) === 'undefined' || pdata.DonationID === null) {
                    if (pcbkerr) pcbkerr('Faltan los datos de la donacion.\nPor favor sal y vuelve a entrar en la aplicacion.');
                } else {
                    var apistr = ["makereservationifavailable?donateid=" + pdata.DonationID
                        , "&siteid=" + pdata.Site
                        , "&takerid=" + pdata.TakerID
                        ].join('');
                    mMSClient.invokeApi(apistr, {
                        body: null,
                        method: "post",
                    }).done(
                            function (presponse) {
                                if (presponse !== null && presponse.result !== null && presponse.result.code !== null) {
                                    var result = presponse.result;
                                    // SI operacion OK
                                    if (200 === result.code) {
                                        var msg = (typeof (result.message) !== 'undefined' && result.message) ? result.message : '';
                                        // SI ha hecho la reserva
                                        if (msg !== '0') {
                                            if (pcbkok) pcbkok(msg);
                                        } else {
                                            if (pcbkerr) pcbkerr(msg);
                                        }
                                    } else {
                                        if (pcbkerr) pcbkerr(result.error);
                                    }
                                }
                            }
                            , function (perror) {
                                if (pcbkerr) pcbkerr(perror);
                            }
                        );
                }
            }
    }
    // TODO cancel reservation
    //
    return Constr;
}(jQuery));
