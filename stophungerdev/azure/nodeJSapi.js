// broadcast
exports.post = function (request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;
    var broadcasturl = ['https://webservices.appmobi.com/pushmobi.aspx?CMD=SendBroadcastMessage'
        , 'authuser=javiborr@gmail.com'
        , 'authpw=Perla2009'
        , 'appname=8u5sOwE8oC5QpRn1xf0J2I5l4i6LLV18Pis0XDrlY2Y'
        , 'msg=Nueva+donación'
        , 'data='
        , 'attributes='].join('&');
    var https = require('https');
    https.get(broadcasturl, function (res) {
        console.log("statusCode: ", res.statusCode);
    }).on('error', function (e) {
        console.error(e);
    });
    response.send(statusCodes.OK, { message: 'Hello World!' });
};

exports.get = function (request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};

// makereservationifavailable
exports.post = function (request, response) {
    var httpReq = require("request");
    var donateid = request.query.donateid;
    var siteid = request.query.siteid;
    var takerid = request.query.takerid;
    //
    var mssql = request.service.mssql;
    var sql = ["UPDATE donations SET [ReservedFor] = '" + takerid + "'"
        , ",[Reserved] = 1"
        , ",[ReservedWhen] = GETUTCDATE()"
        , ",[__updatedAt] = GETUTCDATE()"
        , "WHERE id = '" + donateid + "'"
        , "AND [Site] = '" + siteid + "'"
        , "AND [ReservedFor] IS NULL;"
        , "SELECT @@ROWCOUNT as count"].join(' ');
    //console.log('Make reservation con SQL\n' + sql);
    mssql.query(sql, {
        // invoca success 3 veces
        success: function (results) {
            //console.log('success results[' + results + ']');
            //console.log('results.length[' + results.length + ']');
            if (results.length == 1) {
                //console.log('results[0][' + results[0] + ']');
                response.send(statusCodes.OK, { code: statusCodes.OK, message: results[0], error: '' });
                //} else {
                //    response.send(statusCodes.OK, { code: statusCodes.OK, message: '0', error: 'results.length[' + results.length + ']' });
            }
        }
    })
};

exports.get = function (request, response) {
    response.send(statusCodes.OK, { message: 'Hello World!' });
};

// peopleextra
exports.post = function (request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    response.send(statusCodes.OK, { message: 'Hello World!' });
};

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

// peopleoneextra
exports.post = function (request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    response.send(statusCodes.OK, { message: 'Hello World!' });
};

exports.get = function (request, response) {
    var httpReq = require("request");
    var fbid = request.query.fbid;
    var sql = "SELECT [FirstName], [LastName],[Email],[UserName],[FBID],p.id as [UserID],[Admin],[Gives],[Takes],s.name as [Site], s.id as [SiteID], s.Address1, s.ZIP, s.City,p.[__createdAt],p.[__updatedAt],p.[__version] FROM [stophunger].[People] as p left outer join [stophunger].[Sites] as s on s.Id = p.SiteID where FBID='" + fbid + "'";
    var mssql = request.service.mssql;
    mssql.query(sql, {

        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log("sql is: " + sql);
            console.log("error is: " + err);
        }

    });
};

// sitebyidwithdonations
exports.post = function (request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    response.send(statusCodes.OK, { message: 'Hello World!' });
};

exports.get = function (request, response) {
    var httpReq = require("request");
    var siteid = request.query.siteid;
    var sql = "SELECT  s.name as [Name], s.Address1, s.ZIP, s.City, s.Longitud, s.Latitud, ISNULL(x.Bread,0) as Bread, ISNULL(x.Cake,0) as Cake, ISNULL(x.Sandwich,0) as Sandwich, ISNULL(x.Salad,0) as Salad, s.id as [SiteID], x.[DonatedWhen],ISNULL(x.Reserved,0) as Reserved, x.ReservedFor, x.ReservedWhen, DonationID  FROM [stophunger].[Sites] as s left outer join (select d.Bread, d.Cake, d.Sandwich, d.Salad, d.Site as SiteID, d.[__updatedAt] as [DonatedWhen], ISNULL(d.Reserved,0) as Reserved, d.ReservedFor, d.ReservedWhen, d.id as DonationID from [stophunger].[Donations] as d where d.[Current] = 1) as x on x.SiteID = s.id WHERE s.id = '" + siteid + "'";
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log(["sql is: " + sql, "error is: " + err].join('\n'));
        }
    });
};

// siteswithdonations
exports.post = function (request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    response.send(statusCodes.OK, { message: 'Hello World!' });
};

// SitesWithDonations
exports.get = function (request, response) {
    var httpReq = require("request");
    var sql = ["SELECT [Name],[Address1],[ZIP],[City],[Longitud],[Latitud]"
        , ",[Bread],[Cake],[Sandwich],[Salad],[SiteID],[DonatedWhen]"
        , ",[Reserved],[ReservedFor],[ReservedWhen],[FirstName],[LastName],[DonationID]"
        , "  FROM [stophunger].[vSitesWithDonations]"
    ].join(' ');
    var mssql = request.service.mssql;
    mssql.query(sql, {
        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log(["sql is: " + sql, "error is: " + err].join('\n'));
        }

    });
};


// peoplelogin
exports.get = function (request, response) {
    var httpReq = require("request");
    var username = request.query.user;
    var password = request.query.pass;
    var sql = "SELECT FBID FROM [stophunger].People WHERE Email = '" + username + "' AND Password = '" + password + "'";
    var mssql = request.service.mssql;
    mssql.query(sql, {

        success: function (results) {
            request.respond(200, results);
        }, error: function (err) {
            console.log("sql is: " + sql);
            console.log("error is: " + err);
        }

    });
};