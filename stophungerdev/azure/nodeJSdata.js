// Donations
// insert
function insert(item, user, request) {
    // Get all donations for this site order by updated descending
    var donations = tables.getTable('donations');
    donations.where({ Site: item.Site }).orderByDescending('__updatedAt').read({ success: _checkTime, systemProperties: ['__updatedAt'] });
    // BROADCAST
    function _broadcast() {
        var broadcasturl = ['https://webservices.appmobi.com/pushmobi.aspx?CMD=SendBroadcastMessage'
            , 'authuser=javiborr@gmail.com'
            , 'authpw=Perla2009'
            , 'appname=8u5sOwE8oC5QpRn1xf0J2I5l4i6LLV18Pis0XDrlY2Y'
            , 'msg=Nueva%20donacion'
            , 'data='
            , 'attributes='].join('&');
        var https = require('https');
        https.get(broadcasturl, function (res) {
            console.log("statusCode: ", res.statusCode);
        }).on('error', function (e) {
            console.error(e);
        });
    }
    // Process all donations for this site
    function _checkTime(plsdonatsite) {
        var now = new Date();
        // SI ya hay una donacion en este sitio
        if (plsdonatsite.length > 0) {
            //console.log("plsdonatsite.length[" + plsdonatsite.length + "]" + "plsdonatsite[0].__updatedAt[" + plsdonatsite[0].__updatedAt + "]" + "now.getFullYear()[" + now.getFullYear() + "]");
            var bsameyear = (plsdonatsite[0].__updatedAt.getFullYear() === now.getFullYear());
            var bsamemonth = (plsdonatsite[0].__updatedAt.getMonth() === now.getMonth());
            var bsameday = (plsdonatsite[0].__updatedAt.getDate() === now.getDate());
            // SI la mas reciente es el mismo dia
            if (bsameyear && bsamemonth && bsameday) {
                console.log("mismo dia " + plsdonatsite[0].__updatedAt.getFullYear() + "/" + plsdonatsite[0].__updatedAt.getMonth() + "/" + plsdonatsite[0].__updatedAt.getDate());
                // update la donacion más reciente con los datos de item y FIN
                item.Current = true;
                item.id = plsdonatsite[0].id;
                donations.update(item, {
                    success: function () {
                        request.respond(statusCodes.OK);
                    }
                });
            } else {
                // Las donaciones existentes ya no son current
                var index = 0;
                var _updateNotCurrent = function () {
                    // SI ya hemos actualizado todas las donaciones existentes
                    if (index >= plsdonatsite.length) {
                        // Inserta la donacion nueva como current
                        item.Current = true;
                        request.execute();
                        // TODO BROADCAST
                        _broadcast();
                        //request.respond(201, { id: 1, status: 'Table updated successfully' });
                    } else {
                        var old = plsdonatsite[index];
                        old.Current = false;
                        donations.update(old, {
                            success: function () {
                                index++;
                                console.log('Updated %d items', index);
                                //if ((index % 20) === 0) {
                                //    console.log('Updated %d items', index);
                                //}
                                _updateNotCurrent();
                            }
                        });
                    }
                };
                _updateNotCurrent();
            }
        } else {
            // NO hay ninguna donacion en este sitio
            item.Current = true;
            request.execute();
            // TODO BROADCAST
            _broadcast();
        }
    }
}


// People
// insert
function insert(item, user, request) {

    function _broadcast() {
        var broadcasturl = ['https://webservices.appmobi.com/pushmobi.aspx?CMD=SendBroadcastMessage'
            , 'authuser=javiborr@gmail.com'
            , 'authpw=Perla2009'
            , 'appname=8u5sOwE8oC5QpRn1xf0J2I5l4i6LLV18Pis0XDrlY2Y'
            , 'msg=Nuevo%20usuario'
            , 'data='
            , 'attributes='].join('&');
        var https = require('https');
        https.get(broadcasturl, function (res) {
            console.log("statusCode: ", res.statusCode);
        }).on('error', function (e) {
            console.error(e);
        });
    }
    request.execute();
    _broadcast();
}

// PeopleExtra
// read
function read(query, user, request) {
    var sql = "SELECT [UserName],[FBID],[Admin],[Gives],[Takes]	,s.name as [Site], s.id as [SiteID], p.[__createdAt], p.[__updatedAt], p.[__version]  FROM  [People] as p left outer join  [Sites] as s on s.Id = p.SiteID";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            request.respond(200, results);
        }
    });
}

// Sites
// insert
function insert(item, user, request) {
    function _broadcast() {
        var broadcasturl = ['https://webservices.appmobi.com/pushmobi.aspx?CMD=SendBroadcastMessage'
            , 'authuser=javiborr@gmail.com'
            , 'authpw=Perla2009'
            , 'appname=8u5sOwE8oC5QpRn1xf0J2I5l4i6LLV18Pis0XDrlY2Y'
            , 'msg=Nuevo%20restaurante'
            , 'data='
            , 'attributes='].join('&');
        var https = require('https');
        https.get(broadcasturl, function (res) {
            console.log("statusCode: ", res.statusCode);
        }).on('error', function (e) {
            console.error(e);
        });
    }
    request.execute();
    _broadcast();
}


