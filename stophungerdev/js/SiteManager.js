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
    // Current
    var mCurrentSite = null;
    // User ID
    var mUserID = null;
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function () {
        mMSClient = new WindowsAzure.MobileServiceClient(mAppURL, mAppKey);
        me = this;
    }
    // -----------------------------------------------
    // Get Current
    Constr.prototype.GetCurrentSite = function () {
        return mCurrentSite;
    }
    // Set user id
    Constr.prototype.SetUserID = function (p) {
        mUserID = p;
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
                    var i = 0;
                    // PARA CADA site
                    for (i = 0; i < presponse.result.length; i++) {
                        var data = presponse.result[i];
                        // SI reservado para mi
                        if (data.ReservedFor === mUserID) {
                            presponse.result[i].Reserved4Me = true;
                        } else {
                            presponse.result[i].Reserved4Me = false;
                        }
                    }
                    mCacheAllSites = presponse.result;
                    if (pcbkok) pcbkok(presponse.result);
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
        mCurrentSite = null;
        // SI hay cache
        if (mCacheAllSites !== null && mCacheAllSites.length > 0) {
            // PARA CADA site
            for (var i = 0; i < mCacheAllSites.length; i++) {
                // SI found
                if (psiteid === mCacheAllSites[i].SiteID) {
                    data = mCacheAllSites[i];
                    break;
                }
            }
        }
        // SI NO cache
        if (data == null) {
            me.GetSiteDataFromDB(psiteid, pcbkok, pcbkerr);
        } else {
            //var res = [data];
            mCurrentSite = data;
            if (pcbkok) pcbkok(data);
        }
    }
    // -----------------------------------------------
    // Gets site from DB
    Constr.prototype.GetSiteDataFromDB = function (psiteid, pcbkok, pcbkerr) {
        mCurrentSite = null;
        //var filter = { id: psiteid };
        //var data = mMSClient.getTable('sites').where(filter).read()
        mMSClient.invokeApi("sitebyidwithdonations?siteid="+psiteid, {
                body: null,
                method: "get",
            }).done(
                function (presponse) {
                    if (presponse !== null && presponse.result !== null && presponse.result.length > 0) {
                        mCurrentSite = data;
                        if (pcbkok) pcbkok(presponse.result[0]);
                    }
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