MapManager = (function ($) {
    // -----------------------------------------------------
    // Privado
    // -----------------------------------------------------
    //var me = null;
    //
    //var mMapDivID = null;
    //var mMapDiv = null;
    //var mSiteMap = null;
    //var mMapMarkerDest = null;
    //var mMapMarkerMyPos = null;
    //
    //var mLon = null;
    //var mLat = null;
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
        var me = this;
        this.mMapDivID = p;
        this.mMapDiv = null;
        this.mSiteMap = null;
        this.mMapMarkerDest = null;
        //this.mMapMarkerMyPos = null;
        this.mLon = null;
        this.mLat = null;
        this.mSites = null;
        this.mMarkers = null;
    }
    Constr.prototype._getMapDiv = function () {
        // SI empezamos
        if (typeof (this.mMapDiv) === 'undefined' || this.mMapDiv === null) {
            // SI NO OK
            if (typeof (this.mMapDivID) === 'undefined' || this.mMapDivID === null) {
                throw Exception('MapManager mMapDivID not valid');
            } else {
                this.mMapDiv = document.getElementById(this.mMapDivID);
            }
        }
        return this.mMapDiv;
    }
    //
    Constr.prototype._resetSiteMap = function (plong, plat) {
        var latlngDest = _validateLonLat(plong, plat);
        var map = this._getSiteMap(plong, plat);
        // SI OK
        //tengo la posicion destino
        if (latlngDest !== null) {
            // SI hay un marcador previo
            if (this.mMapMarkerDest !== null) {
                this.mMapMarkerDest.setMap(null);
            }
            map.panTo(latlngDest);
            this.mMapMarkerDest = new google.maps.Marker({
                position: latlngDest,
                map: map
            });
        }
        return map;
    }
    //
    Constr.prototype._getSiteMap = function(plong, plat) {
        if (this.mSiteMap === null) {
            this.mSiteMap = this._createSiteMap(plong, plat);
        }
        return this.mSiteMap;
    }
    //
    Constr.prototype._createSiteMap = function(plong, plat) {
        var map = null;
        var md = this._getMapDiv();
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
            //if (latlngDest !== null) {
            //    mMapMarkerDest = new google.maps.Marker({
            //        position: latlngDest,
            //        map: map
            //    });
            //}
            // SI browser usa HTML5 geolocation
            // Muy impreciso, cualquier sitio de Madrid
            //if (false && navigator.geolocation) {
            //    // Try HTML5 geolocation
            //    navigator.geolocation.getCurrentPosition(
            //        function (pposition) {
            //            var pos = new google.maps.LatLng(pposition.coords.latitude,
            //                                             pposition.coords.longitude);
            //            mMapMarkerMyPos = new google.maps.Marker({
            //                position: pos,
            //                map: map
            //            });
            //            var infowindow = new google.maps.InfoWindow({
            //                map: map,
            //                position: pos,
            //                content: 'Estoy aqui'
            //            });
            //            //map.setCenter(pos);
            //        }, function () {
            //            //alert(navigator.appName + ' geolocation ha fallado');
            //        });
            //}
        }
        return map;
    }
    //
    Constr.prototype.SetMapDivID = function (p) { this.mMapDivID = p; }
    //
    Constr.prototype.SetLonLat = function (plon, plat) { this.mLon = plon; this.mLat = plat; }
    //
    Constr.prototype.SetSites = function (p) { this.mSites = p; }
    // Refresh site list
    Constr.prototype.RefreshList = function () {
        // SI tengo la lista de sitios
        if (this.mSites !== undefined && this.mSites !== null) {
            // SI tengo markers
            if (this.mMarkers !== undefined && this.mMarkers !== null && this.mMarkers.length > 0) {
                // PARA CADA marker
                for (i = 0; i < this.mMarkers.length; i++) {
                    this.mMarkers[i].setMap(null);
                }
            }
            this.mMarkers = [];
            var map = null;
            //  Make an array of the LatLng's of the markers you want to show
            //var LatLngList = [];
            //  Create a new viewpoint bound
            var bounds = new google.maps.LatLngBounds();
            // PARA CADA sitio
            for (i = 0; i < this.mSites.length; i++) {
                var s = this.mSites[i];
                map = this._getSiteMap(s.Longitud, s.Latitud);
                var myLatlng = new google.maps.LatLng(s.Longitud, s.Latitud);
                //LatLngList.push(myLatlng);
                //  And increase the bounds to take this point
                bounds.extend(myLatlng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    title: "Hello World!"
                });
                marker.setMap(map);
                this.mMarkers.push(marker);
            }
            if (map && google) {
                //  Fit these bounds to the map
                map.fitBounds(bounds);
                google.maps.event.addListenerOnce(map, 'idle', function () {
                    setTimeout(function () {
                        center = map.getCenter();
                        google.maps.event.trigger(map, 'resize');
                        map.setCenter(center);
                    }, 1000);
                });
            }
        }
        //_getSiteMap(plon, plat);
    }
    //Constr.prototype.PanTo = function (plon, plat) {
    //    _resetSiteMap(plon, plat);
    //}
    //
    Constr.prototype.Refresh = function (plon, plat) {
        // SI NO valen los parametros
        if (undefined === plon || undefined === plat) {
            plon = this.mLon;
            plat = this.mLat;
        }
        var map = this._resetSiteMap(plon, plat);
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