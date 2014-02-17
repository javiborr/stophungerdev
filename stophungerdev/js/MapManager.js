MapManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    var me = null;
    //
    var mMapDivID = null;
    var mMapDiv = null;
    function _getMapDiv() {
        // SI empezamos
        if (typeof (mMapDiv) === 'undefined' || mMapDiv === null) {
            // SI NO OK
            if (typeof (mMapDivID) === 'undefined' || mMapDivID === null) {
                throw Exception('MapManager mMapDivID not valid');
            } else {
                mMapDiv = document.getElementById(mMapDivID);
            }
        }
        return mMapDiv;
    }
    var mSiteMap = null;
    var mMapMarkerDest = null;
    var mMapMarkerMyPos = null;
    //
    var mLon = null;
    var mLat = null;
    //
    function _resetSiteMap(plong, plat) {
        var latlngDest = _validateLonLat(plong, plat);
        var map = _getSiteMap(plong, plat);
        // SI OK
        //tengo la posicion destino
        if (latlngDest !== null) {
            // SI hay un marcador previo
            if (mMapMarkerDest !== null) {
                mMapMarkerDest.setMap(null);
            }
            map.panTo(latlngDest);
            mMapMarkerDest = new google.maps.Marker({
                position: latlngDest,
                map: map
            });
        }
        return map;
    }
    //
    function _getSiteMap(plong, plat) {
        if (mSiteMap === null) {
            mSiteMap = _createSiteMap(plong, plat);
        }
        return mSiteMap;
    }
    //
    function _createSiteMap(plong, plat) {
        var map = null;
        var md = _getMapDiv();
        var latlngDest = _validateLonLat(plong, plat);
        // SI OK
        if (md && latlngDest) {
            var mapOptions = {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // SI param OK
            if (latlngDest !== null) {
                mapOptions.center = latlngDest;
            }
            map = new google.maps.Map(md, mapOptions);
            //
            // SI tengo la posicion destino
            if (latlngDest !== null) {
                mMapMarkerDest = new google.maps.Marker({
                    position: latlngDest,
                    map: map
                });
            }
            // SI browser usa HTML5 geolocation
            // Muy impreciso, cualquier sitio de Madrid
            if (false && navigator.geolocation) {
                // Try HTML5 geolocation
                navigator.geolocation.getCurrentPosition(
                    function (pposition) {
                        var pos = new google.maps.LatLng(pposition.coords.latitude,
                                                         pposition.coords.longitude);
                        mMapMarkerMyPos = new google.maps.Marker({
                            position: pos,
                            map: map
                        });
                        var infowindow = new google.maps.InfoWindow({
                            map: map,
                            position: pos,
                            content: 'Estoy aqui'
                        });
                        //map.setCenter(pos);
                    }, function () {
                        //alert(navigator.appName + ' geolocation ha fallado');
                    });
            }
        }
        return map;
    }
    //
    function _validateLonLat(plong, plat) {
        var lonlat = null;
        var patt = new RegExp("[\-]*[0-9]+\.[0-9]+");
        // SI param OK
        if ((typeof (plong) !== 'undefined') && (typeof (plat) !== 'undefined')
            && patt.test(plong) && patt.test(plat))
        {
            lonlat = new google.maps.LatLng(plong, plat);
        }
        return lonlat;
    }
    // -----------------------------------------------------
    // -----------------------------------------------------
    // Constructor
    // -----------------------------------------------------
    var Constr = function (p) {
        me = this;
        mMapDivID = p;
    }
    //
    Constr.prototype.SetMapDivID = function (p) { mMapDivID = p; }
    //
    Constr.prototype.SetLonLat = function (plon, plat) { mLon = plon; mLat = plat; }
    //
    //Constr.prototype.SetUpMap = function (plon, plat) {
    //    _getSiteMap(plon, plat);
    //}
    //
    //Constr.prototype.PanTo = function (plon, plat) {
    //    _resetSiteMap(plon, plat);
    //}
    //
    Constr.prototype.Refresh = function (plon, plat) {
        // SI NO valen los parametros
        if (undefined === plon || undefined === plat) {
            plon = mLon;
            plat = mLat;
        }
        var map = _resetSiteMap(plon, plat);
        if (map && google) {
            google.maps.event.addListenerOnce(map, 'idle', function () {
                setTimeout(function () {
                    center = map.getCenter();
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(center);
                }, 1000);
            });
        }
        //setTimeout(function () {
        //    var center = map.getCenter();
        //    google.maps.event.trigger(map, 'resize');
        //    map.setCenter(center);
        //}, 300);

        //}
    }
    
    return Constr;
}(jQuery));