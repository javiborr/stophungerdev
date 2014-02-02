// insert donation
function insert(item, user, request) {
    var donations = tables.getTable('donations');
    donations.where({ Site: item.Site }).orderByDescending('__updatedAt').read({ success: _checkTime, systemProperties: ['__updatedAt'] });

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
        }
    }
}
// backup
function insert(item, user, request) {
    var donations = tables.getTable('donations')
    donations.where({ Site: item.Site }).orderByDescending('__updatedAt').read({ success: _checkTime, systemProperties: ['__updatedAt'] });

    function _checkTime(presults) {
        var now = new Date();
        // SI ya hay una donacion en este sitio
        if (presults.length > 0) {
            //console.log("presults.length[" + presults.length + "]" + "presults[0].__updatedAt[" + presults[0].__updatedAt + "]" + "now.getFullYear()[" + now.getFullYear() + "]");
            var bsameyear = (presults[0].__updatedAt.getFullYear() === now.getFullYear());
            var bsamemonth = (presults[0].__updatedAt.getMonth() === now.getMonth());
            var bsameday = (presults[0].__updatedAt.getDate() === now.getDate());
            // SI el mismo dia
            if (bsameyear && bsamemonth && bsameday) {
                console.log("mismo dia " + presults[0].__updatedAt.getFullYear() + "/" + presults[0].__updatedAt.getMonth() + "/" + presults[0].__updatedAt.getDate());
                item.id = presults[0].id;
                donations.update(item, {
                    success: function () {
                        request.respond(statusCodes.OK);
                    }
                });
            } else {
                request.execute();
            }
        } else {
            request.execute();
        }
    }
}

// People extra
exports.get = function (request, response) {
    var sql = "SELECT [FirstName], [LastName],[Email],[UserName],[FBID],[Admin],[Gives],[Takes]	,s.name as [Site], s.id as [SiteID],p.[__createdAt],p.[__updatedAt],p.[__version] FROM [stophunger].[People] as p left outer join [stophunger].[Sites] as s on s.Id = p.SiteID";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            //console.log(results);
            request.respond(statusCodes.OK, results);
        },
        error: function (err) {
            //console.log("error is: " + err);
        }

    });
};
// People extra
exports.get = function (request, response) {
    var sql = "SELECT [FirstName], [LastName],[Email],[UserName],[FBID],p.id as [UserID],[Admin],[Gives],[Takes]	,s.name as [Site], s.id as [SiteID],p.[__createdAt],p.[__updatedAt],p.[__version] FROM [stophunger].[People] as p left outer join [stophunger].[Sites] as s on s.Id = p.SiteID";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            //console.log(results);
            request.respond(statusCodes.OK, results);
        },
        error: function (err) {
            //console.log("error is: " + err);
        }

    });
};
// PeopleOneExtra
exports.get = function (request, response) {
    var httpReq = require("request");
    var fbid = request.query.fbid;
    var sql = "SELECT [FirstName], [LastName],[Email],[UserName],[FBID],p.id as [UserID],[Admin],[Gives],[Takes],s.name as [Site], s.id as [SiteID], s.Address1, s.ZIP, s.City,p.[__createdAt],p.[__updatedAt],p.[__version] FROM [stophunger].[People] as p left outer join [stophunger].[Sites] as s on s.Id = p.SiteID where FBID='" + fbid + "'";
    var mssql = request.service.mssql;
    mssql.query(sql, {

        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log(["sql is: " + sql,"error is: " + err].join('\n'));
        }

    });
};


// SitesWithDonations
exports.get = function (request, response) {
    var httpReq = require("request");
    var sql = "SELECT  s.name as [Name], s.Address1, s.ZIP, s.City, s.Longitud, s.Latitud, ISNULL(x.Bread,0) as Bread, ISNULL(x.Cake,0) as Cake, ISNULL(x.Sandwich,0) as Sandwich, ISNULL(x.Salad,0) as Salad, s.id as [SiteID], x.[DonatedWhen],ISNULL(x.Reserved,0) as Reserved, x.ReservedFor, x.ReservedWhen, DonationID  FROM [stophunger].[Sites] as s left outer join (select d.Bread, d.Cake, d.Sandwich, d.Salad, d.Site as SiteID, d.[__updatedAt] as [DonatedWhen], ISNULL(d.Reserved,0) as Reserved, d.ReservedFor, d.ReservedWhen, d.id as DonationID from [stophunger].[Donations] as d where d.[Current] = 1) as x on x.SiteID = s.id";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log(["sql is: " + sql,"error is: " + err].join('\n'));
        }

    });
};
// sitebyidwithdonations
exports.get = function(request, response) {
    var httpReq = require("request");
    var siteid = request.query.siteid;
    var sql = "SELECT  s.name as [Name], s.Address1, s.ZIP, s.City, s.Longitud, s.Latitud, ISNULL(x.Bread,0) as Bread, ISNULL(x.Cake,0) as Cake, ISNULL(x.Sandwich,0) as Sandwich, ISNULL(x.Salad,0) as Salad, s.id as [SiteID], x.[DonatedWhen],ISNULL(x.Reserved,0) as Reserved, x.ReservedFor, x.ReservedWhen, DonationID  FROM [stophunger].[Sites] as s left outer join (select d.Bread, d.Cake, d.Sandwich, d.Salad, d.Site as SiteID, d.[__updatedAt] as [DonatedWhen], ISNULL(d.Reserved,0) as Reserved, d.ReservedFor, d.ReservedWhen, d.id as DonationID from [stophunger].[Donations] as d where d.[Current] = 1) as x on x.SiteID = s.id WHERE s.id = '" + siteid + "'";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log(["sql is: " + sql,"error is: " + err].join('\n'));
        }
    });
};




