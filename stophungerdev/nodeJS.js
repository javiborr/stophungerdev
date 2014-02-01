function insert(item, user, request) {
    var donations = tables.getTable('donations')
    donations.where({ Site: item.Site }).orderByDescending('__updatedAt').read({ success: _checkTime, systemProperties: ['__updatedAt'] });

    function _checkTime(presults) {
        var now = new Date();
        // SI ya hay una donacion en este sitio
        if (presults.length > 0) {
            console.log("presults.length[" + presults.length + "]" + "presults[0].__updatedAt[" + presults[0].__updatedAt + "]" + "now.getFullYear()[" + now.getFullYear() + "]");
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
