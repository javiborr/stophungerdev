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
        //mMSClient.getTable('sites').read()
        mMSClient.invokeApi("siteswithdonations", {
                body: null,
                method: "get",
            }).done(
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
    // Update or Insert
    Constr.prototype.Save = function (pdata, pcbkok, pcbkerr) {
        // SI OK
        if (pdata !== null && pdata.name !== null && pdata.name.length > 0) {
            // SI UPDATE
            if ( typeof(pdata.id) !== 'undefined' && pdata.id !== null) {
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
            } else {
                mMSClient.getTable('sites')
                    .insert(pdata)
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
    }
    //
    return Constr;
}(jQuery));