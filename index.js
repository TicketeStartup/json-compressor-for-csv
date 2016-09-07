"use strict";
const _ = require('underscore');
let compatted = [],
    _splitter = "-",
    allKeys = [];

function compatct(arrayJsonObjs) {
    var partials = [];
    for (var i = 0; i < arrayJsonObjs.length; i++) {
        var jsonObj = new Object(arrayJsonObjs[i]),
            notNestedArrayParams = [],
            foundOneArray = false,
            partialsPush = false;

        // find for NOT Array and NOT Object
        for (var lbl in jsonObj) {
            if (jsonObj[lbl] != undefined && !Array.isArray(jsonObj[lbl]) && jsonObj[lbl].constructor !== Object) {
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
                    if (jsonObj[lbl].length >= 1 && jsonObj[lbl][0].constructor === String) {
                        partial[lbl] = jsonObj[lbl][0]
                    } else {
                        foundOneArray = true;
                        for (var sub_doc_index = 0; sub_doc_index < jsonObj[lbl].length; sub_doc_index++) {
                            partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams); // 2
                            for (sub_doc_2 in jsonObj[lbl][sub_doc_index]) {
                                if (jsonObj[lbl][sub_doc_index]) {
                                    if (jsonObj[lbl][sub_doc_index][sub_doc_2] && jsonObj[lbl][sub_doc_index][sub_doc_2].constructor === Object) {
                                        jsonObj[lbl][sub_doc_index][sub_doc_2] = new Array(jsonObj[lbl][sub_doc_index][sub_doc_2])
                                    }
                                }
                                if (jsonObj[lbl][sub_doc_index]) {
                                    partial[lbl + _splitter + sub_doc_2] = jsonObj[lbl][sub_doc_index][sub_doc_2];
                                }
                                NestedArrayParams[lbl + _splitter + sub_doc_2] = true;
                            }
                            partials.push(partial);
                        }
                    }
                }
            }
            console.log("partial", partial);
            partialsPush == true;
        }
        /*
            CREATE all params array fot outuput 
        */

        for (var l in NestedArrayParams) {
            allKeys.push(l);
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
    console.log("obj", obj);
    allKeys = [];
    _splitter = obj.splitter !== undefined ? obj.splitter : "-";
    start(obj.list, callback);
}
exports.compress = init;
