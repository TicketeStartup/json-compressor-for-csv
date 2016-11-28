var _ = require("underscore"),
    merge = require('object-merge'),
    async = require('async');
var json2csv = require('json2csv');

var GOOD = [],
    LABELS = [],
    LIMITER = "@",
    ORIGINALLABELS = [];

function split(cursor) {
    //console.log("cursor-->", cursor);
    //var cursor = array[1];
    var results = [];
    var groups = [];
    var masterBase = {};
    // find layers TODO
    var layers = 6; // 6:2
    var base = {};
    var map = [];
    for (var ly = 0; ly < layers + 1; ly += 2) {
        // console.log("[ TEST LAYER] :" + ly);
        // find Base
        for (var key in cursor) {
            if ((key.match(new RegExp(LIMITER, "g")) || []).length === ly) {
                if (ly === 0) {
                    masterBase[key] = cursor[key];
                } else {
                    base[key] = cursor[key];
                    map.push(key);
                }
            }
        }
    }
    //if (Object.keys(base).length > 0) groups.push(base);

    var groupForPos = {};

    for (var i = 0; i < map.length; i++) {
        var key = map[i];
        if ((key.match(new RegExp(LIMITER, "g")) || []).length === 2) {
            //console.log("key.split(LIMITER)", key.split(LIMITER));
            var keyPos = key.split(LIMITER)[1].split(LIMITER)[0];
        }
        if (!groupForPos[keyPos]) groupForPos[keyPos] = [];
        groupForPos[keyPos].push(key);
    }

    // try conversion
    var R_R = [];
    for (var i in groupForPos) {
        var tempObj = {};
        for (var j = 0; j < groupForPos[i].length; j++) {
            var key = groupForPos[i][j];
            //console.log("key-->" + key);
            var t = cursor[key];
            if ((key.match(new RegExp(LIMITER, "g")) || []).length === 2) {
                var l = key.split("-" + LIMITER + i + LIMITER).length;
                var newK = key.split("-" + LIMITER + i + LIMITER)[0] + key.split("-" + LIMITER + i + LIMITER)[1];
                tempObj[newK] = t;
            } else {
                var l = key.split("-" + LIMITER + i + LIMITER).length;
                var newK = key.split("-" + LIMITER + i + LIMITER)[0] + key.split("-" + LIMITER + i + LIMITER)[1];
                for (var k = 2; k < l; k++) {
                    newK += "-" + LIMITER + i + LIMITER + key.split("-" + LIMITER + i + LIMITER)[k]
                }
                tempObj[newK] = t;
            }
        }
        R_R.push(merge(masterBase, tempObj));
    }
    //    console.log("[Groups] : ", groups);
    //    console.log("[masterBase] : ", masterBase);
    //    console.log("[Map] : ", map);
    //    console.log("[groupForPos] : ", groupForPos);
    //    console.log("[R_R] : ", R_R);
    return R_R;
}

function start(array, superCallback) {
    var r = split(array);
    var AGAIN = [];
    // console.log("r--->", r)
    for (var i = 0; i < r.length; i++) {
        var present = false;
        for (var key in r[i]) {
            if (key.indexOf(LIMITER) >= 0) {
                present = true;
                // break;
            } else {
                LABELS.push(key);
            }
        }
        if (present) {
            AGAIN.push(r[i]);
        } else {
            GOOD.push(r[i]);
        }
        LABELS = _.unique(LABELS);
    }
    if (AGAIN.length > 0) start(AGAIN, superCallback);
    else superCallback(GOOD, LABELS);
}

function init(array, superCallback) {
    GOOD = [];
    LABELS = [];
    start(array, superCallback);
}

function externalInit(array, dadCallback, labels, limiter) {
    var JKQ = [],
        LLB = [],
        ORIGINALLABELS = labels;
    if (limiter) LIMITER = limiter;
    async.each(array, function (onearray, callback) {
        init(onearray, function (R, L) {
            JKQ = JKQ.concat(R);
            LLB = _.unique(LLB.concat(L));
            callback();
        });
    }, function () {
        //        console.log('finished processing item', p);
        //console.log("FINE:  \n", JKQ.length);
        //        console.log("FINE:  \n", JKQ);
        //        console.log("FINE:  \n", LLB);
        return dadCallback({
            partials: JKQ.length ? JKQ : array,
            allKeys: LLB.length ? LLB : ORIGINALLABELS
        });
    });
}
module.exports = {
    init: externalInit
}

//externalInit([{
//    firstName: 'andrea',
//    lastName: 'giglio',
//    phone: '340177662',
//    'games-@0@-id': 0,
//    'games-@0@-code': 'A',
//    'games-@1@-id': 1,
//    'games-@1@-code': 'B',
//    'games2-@0@-id': 0,
//    'games2-@0@-code': 'A',
//    'games2-@1@-id': 1,
//    'games2-@1@-code': 'B'
//}], function (results, lables) {
//    console.log("FINE", results);
//    console.log("FINE", lables);
//})
