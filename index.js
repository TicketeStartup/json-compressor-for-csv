"use strict";
const _ = require('underscore'),
    async = require('async'),
    merge = require('merge');

let compatted = [],
    _splitter = "-",
    allKeys = [];

//function compatct(arrayJsonObjs) {
//    var partials = [],
//        foundOneArray = false;
//    for (var i = 0; i < arrayJsonObjs.length; i++) {
//        var jsonObj = new Object(arrayJsonObjs[i]),
//            notNestedArrayParams = [],
//            partialsPush = false;
//
//        // find for NOT Array and NOT Object
//        for (var lbl in jsonObj) {
//            if (jsonObj[lbl] != undefined && !Array.isArray(jsonObj[lbl]) && jsonObj[lbl].constructor !== Object) {
//                // console.log("lbl", lbl);
//                notNestedArrayParams.push(lbl); // PUSH propery not Array or Object
//                continue;
//            }
//            partialsPush = true;
//        }
//        /*
//            Create base model with all params and values for NOT OBJ OR NOR ARRAY params
//        */
//        var partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams);
//
//        if (!partialsPush) {
//            // Add element
//            partials.push(partial);
//        } else {
//            // find for Array nested
//            var NestedArrayParams = {} // Variable with nester params
//                /*
//                    FOR into ONE JSON OBJECT FROM ARRAY LIST[...]
//                */
//            for (var lbl in jsonObj) {
//                if (jsonObj[lbl] && jsonObj[lbl].constructor === Object) {
//                    jsonObj[lbl] = new Array(jsonObj[lbl]);
//                }
//                if (Array.isArray(jsonObj[lbl])) {
//                    foundOneArray = true;
//                    if (jsonObj[lbl].length >= 1 && jsonObj[lbl][0] && jsonObj[lbl][0].constructor === String) {
//                        partial[lbl] = jsonObj[lbl][0]
//                    } else {
//                        for (let sub_doc_index = 0; sub_doc_index < jsonObj[lbl].length; sub_doc_index++) {
//                            partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams); // 2
//                            for (let sub_doc_2 in jsonObj[lbl][sub_doc_index]) {
//                                if (jsonObj[lbl][sub_doc_index]) {
//                                    if (jsonObj[lbl][sub_doc_index][sub_doc_2] && jsonObj[lbl][sub_doc_index][sub_doc_2].constructor === Object) {
//                                        jsonObj[lbl][sub_doc_index][sub_doc_2] = new Array(jsonObj[lbl][sub_doc_index][sub_doc_2])
//                                    }
//                                }
//                                if (jsonObj[lbl][sub_doc_index]) {
//                                    partial[lbl + _splitter + sub_doc_2] = jsonObj[lbl][sub_doc_index][sub_doc_2];
//                                }
//                                if (partial[lbl + _splitter + sub_doc_2] != undefined && !Array.isArray(partial[lbl + _splitter + sub_doc_2]) && partial[lbl + _splitter + sub_doc_2].constructor !== Object) {
//                                    NestedArrayParams[lbl + _splitter + sub_doc_2] = true;
//                                } else {
//                                    NestedArrayParams[lbl + _splitter + sub_doc_2] = false;
//                                }
//                            }
//                            partials.push(partial);
//                        }
//                    }
//                }
//            }
//            //console.log("partial", partial);
//            partialsPush == true;
//        }
//        /*
//            CREATE all params array fot outuput
//        */
//        for (var l in NestedArrayParams) {
//            if (NestedArrayParams[l] === true) allKeys.push(l);
//        }
//        for (var n in notNestedArrayParams) {
//            allKeys.push(notNestedArrayParams[n]);
//        }
//    }
//    return {
//        again: foundOneArray,
//        partials: partials,
//        allKeys: _.uniq(allKeys)
//    };
//};

//function getFromNestedArray(jsonObj, notNestedArrayParams) {
//    var obj = {};
//    for (var k = 0; k < notNestedArrayParams.length; k++) {
//        obj[notNestedArrayParams[k] + ""] = new String(jsonObj[notNestedArrayParams[k] + ""]);
//    }
//    return obj;
//}


function compatctFull(array, callback) {
    var f = false;
    do {
        for (var i = 0; i < array.length; i++) {
            //console.log("[i] " + array[i]);
            var jsonObj = array[i];
            for (var key in jsonObj) {
                if (_.isArray(jsonObj[key])) {
                    for (var subKey in jsonObj[key]) {
                        if (_.isObject(jsonObj[key][subKey]) && !_.isString(jsonObj[key][subKey]) && !_.isArray(jsonObj[key][subKey])) {
                            for (var subSubKey in jsonObj[key][subKey]) {
                                jsonObj[key + _splitter + subKey + _splitter + subSubKey] = jsonObj[key][subKey][subSubKey];
                            }
                        } else {
                            jsonObj[key + _splitter + subKey] = jsonObj[key][subKey];
                        }
                    }
                    delete jsonObj[key];
                }
            }
            //   array[i] = modelObj;
        }
    } while (f);
    console.log("|--STEP 3 compatct \n " + JSON.stringify(array, 0, 2));
    callback(null, array);
}

function compatct(array, callback) {
    var f = false,
        base = {},
        lables = [],
        results = [];
    // indetify Base model
    for (var i = 0; i < array.length; i++) {
        var jsonObj = array[i];
        for (var key in jsonObj) {
            if (!_.isArray(jsonObj[key]) && !_.isObject(jsonObj[key])) {
                if (!base[i]) base[i] = {};
                base[i][key] = jsonObj[key];
                lables.push(key);
            }
        }
    }

    //    do {                                                      // TODO
    for (var i = 0; i < array.length; i++) {
        //console.log("[i] " + array[i]);
        var jsonObj = array[i];
        for (var key in jsonObj) {
            if (_.isArray(jsonObj[key])) {
                console.log("key-->" + key);
                for (var subKey in jsonObj[key]) {
                    console.log("subKey-->" + subKey);
                    var tempObj = {};
                    if (_.isObject(jsonObj[key][subKey]) && !_.isString(jsonObj[key][subKey]) && !_.isArray(jsonObj[key][subKey])) {
                        for (var subSubKey in jsonObj[key][subKey]) {
                            tempObj[key + _splitter + subSubKey] = jsonObj[key][subKey][subSubKey];
                            lables.push(key + _splitter + subSubKey);
                        }
                    } else {
                        tempObj[key + _splitter + subKey] = jsonObj[key][subKey];
                        lables.push(key + _splitter + subKey);
                    }
                    console.log("[tempObj]", tempObj);
                    results.push(merge(base[i], tempObj));
                }

            }
        }
        //        //   array[i] = modelObj;
    }
    //    } while (f);

    // find for arrays
    console.log("lables ", _.unique(lables));
    console.log("base ", base);
    console.log("|--STEP 3 compatct \n " + JSON.stringify(results, 0, 2));
    callback(null, array);
}

function compress(array, callback) {
    var f = false;
    do {
        f = false;
        for (var i = 0; i < array.length; i++) {
            console.log("[i] " + array[i]);
            var jsonObj = array[i],
                modelObj = {},
                compressedArray = [];
            for (var key in jsonObj) {
                console.log("--> " + key);
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
        console.log("FOUND: " + f);
    }
    while (f)
    console.log("|--STEP 2 compress \n " + JSON.stringify(array, 0, 2));
    callback(null, array);
}

function sizing(array, callback) {
    var origin = array;
    do {
        console.log("--- DO");
        for (var i = 0; i < array.length; i++) {
            var f = false;
            var jsonObj = array[i];
            for (var key in jsonObj) {
                //console.log("--> " + key);
                if (jsonObj[key].length === 1 && !_.isString(jsonObj[key])) {
                    jsonObj[key] = jsonObj[key][0];
                    f = true;
                } else {
                    for (var key_sub in jsonObj[key]) {
                        // console.log("--2--> " + key_sub)
                        if (jsonObj[key][key_sub].length === 1 && !_.isString(jsonObj[key])) {
                            jsonObj[key][key_sub] = jsonObj[key][key_sub][0];
                            f = true;
                        }
                    }
                }
            }
        }
    } while (f);
    console.log("|--STEP 1 sizing \n " + JSON.stringify(array, 0, 2));
    callback(null, array);
}

// Run
function start(array, callback) {
    //    var test = compatct(array);
    //    if (test.again === true) {
    //        start(test.partials, callback);
    //    } else {
    //        return callback(test);
    //    }
    async.waterfall([async.apply(sizing, array), compress, compatct], callback);
}

function init(obj, callback) {
    // console.log("obj", obj);
    allKeys = [];
    _splitter = obj.splitter !== undefined ? obj.splitter : "-";
    start(obj.list, callback);
}

module.exports = {
    compress: init,
    sizing: sizing
}
