"use strict";
const _ = require('underscore'),
    async = require('async'),
    merge = require('object-merge');

let compatted = [],
    _splitter = "-",
    allKeys = [];

function compatctFull(array) {
    var f = false,
        lables = [];
    for (var i = 0; i < array.length; i++) {
        var jsonObj = array[i];
        for (var key in jsonObj) {
            if (!_.isArray(jsonObj[key]) && !_.isObject(jsonObj[key])) {
                lables.push(key);
            }
        }
    }
    for (var i = 0; i < array.length; i++) {
        var jsonObj = array[i];
        for (var key in jsonObj) {
            if (_.isArray(jsonObj[key])) {
                f = true;
                for (var subKey in jsonObj[key]) {
                    if (_.isObject(jsonObj[key][subKey]) && !_.isString(jsonObj[key][subKey]) && !_.isArray(jsonObj[key][subKey])) {
                        for (var subSubKey in jsonObj[key][subKey]) {
                            jsonObj[key + _splitter + "@" + subKey + "@" + _splitter + subSubKey] = jsonObj[key][subKey][subSubKey];
                            lables.push(key + _splitter + "@" + subKey + "@" + _splitter + subSubKey);
                        }
                    } else {
                        jsonObj[key + _splitter + "@" + subKey + "@"] = jsonObj[key][subKey];
                        lables.push(key + _splitter + "@" + subKey + "@");
                    }
                }
                delete jsonObj[key];
            }
        }
    }
    // console.log("|--STEP 3 compatctFull");
    return {
        lables: _.unique(lables),
        partials: array,
        again: f
    }
}

function compress(array, callback) {
    var f = false;
    do {
        f = false;
        for (var i = 0; i < array.length; i++) {
            var jsonObj = array[i],
                modelObj = {},
                compressedArray = [];
            for (var key in jsonObj) {
                if (_.isObject(jsonObj[key]) && !_.isArray(jsonObj[key])) {
                    for (var subKey in jsonObj[key]) {
                        if (_.isObject(jsonObj[key][subKey]) && !_.isString(jsonObj[key][subKey]) && !_.isArray(jsonObj[key][subKey])) {
                            f = true;
                        }
                        modelObj[key + _splitter + subKey] = jsonObj[key][subKey];
                    }
                } else {
                    modelObj[key] = jsonObj[key];
                }
            }
            array[i] = modelObj;
        }
    }
    while (f)
    //  console.log("|--STEP 2 compress");
    callback(null, array);
}

function sizing(array, callback) {
    var f = false;
    var origin = array;
    do {
        for (var i = 0; i < array.length; i++) {
            var f = false;
            var jsonObj = array[i];
            for (var key in jsonObj) {
                if (jsonObj[key].length === 1 && !_.isString(jsonObj[key]) && _.isArray(jsonObj[key])) {
                    jsonObj[key] = jsonObj[key][0];
                    f = true;
                } else {
                    for (var key_sub in jsonObj[key]) {
                        if (_.isArray(jsonObj[key][key_sub]) && jsonObj[key][key_sub].length === 1 && !_.isString(jsonObj[key][key_sub]) && _.isArray(jsonObj[key][key_sub])) {
                            jsonObj[key][key_sub] = jsonObj[key][key_sub][0];
                            f = true;
                        }
                    }
                }
            }
        }
    }
    while (f);
    // console.log("|--STEP 1 sizing");
    callback(null, array);
}

// Run
function start(array, superCallback) {
    async.waterfall([async.apply(sizing, array), compress], (err, array) => {
        var test = compatctFull(array);
        if (test.again === true) {
            start(test.partials, superCallback);
        } else {
            delete test.again;
            return superCallback(test);
        }
    });
}

function init(obj, callback) {
    var _splitter = obj.splitter !== undefined ? obj.splitter : "-";
    start(obj.list || [], function (r) {
        //console.log("====> REQUIRING WITH  \n", r.partials);
        //  console.log("====> REQUIRING WITH  \n", r.lables);
        require("./convertToSplittedItems.js").init(r.partials, callback, r.lables);
    });
}
module.exports = {
    compress: init
}
