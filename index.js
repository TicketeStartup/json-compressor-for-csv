"use strict";
const _ = require('underscore');
let compatted = [],
    _splitter = "-",
    allKeys = [];

function compatct(arrayJsonObjs) {
    var partials = [],
        foundOneArray = false;
    for (var i = 0; i < arrayJsonObjs.length; i++) {
        var jsonObj = new Object(arrayJsonObjs[i]),
            notNestedArrayParams = [],
            partialsPush = false;

        // find for NOT Array and NOT Object
        for (var lbl in jsonObj) {
            if (jsonObj[lbl] != undefined && !Array.isArray(jsonObj[lbl]) && jsonObj[lbl].constructor !== Object) {
                // console.log("lbl", lbl);
                notNestedArrayParams.push(lbl); // PUSH propery not Array or Object
                continue;
            }
            partialsPush = true;
        }
        /*
            Create base model with all params and values for NOT OBJ OR NOR ARRAY params
        */
        var partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams);

        if (!partialsPush) {
            // Add element
            partials.push(partial);
        } else {
            // find for Array nested
            var NestedArrayParams = {} // Variable with nester params 
                /*
                    FOR into ONE JSON OBJECT FROM ARRAY LIST[...]
                */
            for (var lbl in jsonObj) {
                if (jsonObj[lbl] && jsonObj[lbl].constructor === Object) {
                    jsonObj[lbl] = new Array(jsonObj[lbl]);
                }
                if (Array.isArray(jsonObj[lbl])) {
                    foundOneArray = true;
                    if (jsonObj[lbl].length >= 1 && jsonObj[lbl][0] && jsonObj[lbl][0].constructor === String) {
                        partial[lbl] = jsonObj[lbl][0]
                    } else {
                        for (let sub_doc_index = 0; sub_doc_index < jsonObj[lbl].length; sub_doc_index++) {
                            partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams); // 2
                            for (let sub_doc_2 in jsonObj[lbl][sub_doc_index]) {
                                if (jsonObj[lbl][sub_doc_index]) {
                                    if (jsonObj[lbl][sub_doc_index][sub_doc_2] && jsonObj[lbl][sub_doc_index][sub_doc_2].constructor === Object) {
                                        jsonObj[lbl][sub_doc_index][sub_doc_2] = new Array(jsonObj[lbl][sub_doc_index][sub_doc_2])
                                    }
                                }
                                if (jsonObj[lbl][sub_doc_index]) {
                                    partial[lbl + _splitter + sub_doc_2] = jsonObj[lbl][sub_doc_index][sub_doc_2];
                                }
                                if (partial[lbl + _splitter + sub_doc_2] != undefined && !Array.isArray(partial[lbl + _splitter + sub_doc_2]) && partial[lbl + _splitter + sub_doc_2].constructor !== Object) {
                                    NestedArrayParams[lbl + _splitter + sub_doc_2] = true;
                                } else {
                                    NestedArrayParams[lbl + _splitter + sub_doc_2] = false;
                                }
                            }
                            partials.push(partial);
                        }
                    }
                }
            }
            //console.log("partial", partial);
            partialsPush == true;
        }
        /*
            CREATE all params array fot outuput 
        */
        for (var l in NestedArrayParams) {
            if (NestedArrayParams[l] === true) allKeys.push(l);
        }
        for (var n in notNestedArrayParams) {
            allKeys.push(notNestedArrayParams[n]);
        }
    }
    return {
        again: foundOneArray,
        partials: partials,
        allKeys: _.uniq(allKeys)
    };
};

function getFromNestedArray(jsonObj, notNestedArrayParams) {
    var obj = {};
    for (var k = 0; k < notNestedArrayParams.length; k++) {
        obj[notNestedArrayParams[k] + ""] = new String(jsonObj[notNestedArrayParams[k] + ""]);
    }
    return obj;
}

// Run
function start(array, callback) {
    var test = compatct(array);
    if (test.again === true) {
        start(test.partials, callback);
    } else {
        return callback(test);
    }
}

function init(obj, callback) {
    // console.log("obj", obj);
    allKeys = [];
    _splitter = obj.splitter !== undefined ? obj.splitter : "-";
    start(obj.list, callback);
}
exports.compress = init;
