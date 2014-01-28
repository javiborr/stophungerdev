SiteManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var mAppURL = 'https://stophunger.azure-mobile.net/';
    var mAppKey = 'MDRQPHGRJDbpeYDwLbFAYIVDZKIjHl37';
    //
    var mMSClient;
    var me = null;
    // Cache all sites
    var mCacheAllSites = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL, mAppKey);
        me = this;
    }
    // -----------------------------------------------
    // Gets all sites from DB
    Constr.prototype.GetAllSitesFromDB = function (pcbkok, pcbkerr) {
        mCacheAllSites = null;
        mMSClient.getTable('sites').read().done(
                function (presponse) {
                    mCacheAllSites = presponse;
                    if (pcbkok) pcbkok(presponse);
                }
                , function (perror) {
                    if (pcbkerr) pcbkerr(perror);
                }
            );
    }
    // -----------------------------------------------
    // Gets site from DB
    Constr.prototype.GetSiteDataFromCacheOrDB = function (psiteid, pcbkok, pcbkerr) {
        var data = null;
        // SI hay cache
        if (mCacheAllSites !== null && mCacheAllSites.length > 0) {
            // PARA CADA site
            for (var i = 0; i < mCacheAllSites.length; i++) {
                // SI found
                if (psiteid === mCacheAllSites[i].id) {
                    data = mCacheAllSites[i];
                    break;
                }
            }
        }
        // SI NO cache
        if (data == null) {
            me.GetSiteDataFromDB(psiteid, pcbkok, pcbkerr);
        } else {
            var res = [data];
            if (pcbkok) pcbkok(res);
        }
    }
    // -----------------------------------------------
    // Gets site from DB
    Constr.prototype.GetSiteDataFromDB = function (psiteid, pcbkok, pcbkerr) {
        var filter = { id: psiteid };
        var data = mMSClient.getTable('sites')
            .where(filter)
            .read()
            .done(
                function (presponse) {
                    if (pcbkok) pcbkok(presponse);
                }
                , function (perror) {
                    if (pcbkerr) pcbkerr(perror);
                }
            );
    }
    // -----------------------------------------------
    // Creates site
    // pdata {name, Address1, ZIP, City, Longitud, Latitud}
    Constr.prototype.Create = function (pdata, pcbkok, pcbkerr) {
        // SI OK
        if (pdata !== null && pdata.name !== null && pdata.name.length > 0) {
            // Comprueba si ya existe por name
            var filter = { name: pdata.name };
            mMSClient.getTable('sites')
                .where(filter)
                .read()
                .done(
                    function (presponse) {
                        var table = mMSClient.getTable('sites');
                        // SI encuentra el site lo actualiza 
                        if (presponse && presponse.length > 0) {
                            alert('Ya existe este sitio');
                            if (pcbkok) pcbkok();
                            //var data = presponse[0];
                            //data.Address1 = pdata.Address1;
                            //data.ZIP = pdata.Address1;
                            //data.City = pdata.Address1;
                            //data.Longitud = pdata.Address1;
                            //data.Latitud = pdata.Address1;
                            //table.update(data).done(pcbkok, pcbkerr);
                        } else {
                            // SI NO existe lo crea
                            table.insert(pdata).then(pcbkok, pcbkerr);
                        }
                    }
                    , function (perror) {
                        var s = JSON.stringify(perror);
                        //alert(s);
                        if (pcbkerr) pcbkerr(perror);
                    }
                );
        }
    }
    //
    Constr.prototype.Save = function (pdata, pcbkok, pcbkerr) {
        // SI OK
        if (pdata !== null && pdata.name !== null && pdata.name.length > 0) {
            mMSClient.getTable('sites')
                .update(pdata)
                .done(
                    function (presponse) {
                        if (pcbkok) pcbkok();
                    }
                    , function (perror) {
                        if (pcbkerr) pcbkerr(perror);
                    }
                );
        }
    }
    //
    return Constr;
}(jQuery));