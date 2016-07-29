var compatted = [],
    lables = [];
var _splitter = "-";
var _unwind = true;


function compatct(arrayJsonObjs) {
    var partials = [];
    for (var i = 0; i < arrayJsonObjs.length; i++) {
        var jsonObj = arrayJsonObjs[i];
        var notNestedArrayParams = [];
        var foundOneArray = false;
        var partialsPush = false;
        // find for not Array 
        for (var lbl in jsonObj) {
            lables.push(lbl);
            //console.log("jsonObj[lbl]", jsonObj[lbl]);
            //console.log("[lbl]", [lbl]);
            //            console.log("constructor", jsonObj[lbl].constructor);
            if (jsonObj[lbl] != undefined && !Array.isArray(jsonObj[lbl]) && jsonObj[lbl].constructor !== Object) {
                //console.log("notNestedArrayParams:");
                notNestedArrayParams.push(lbl);
            } else {
                // console.log("partialsPush");
                partialsPush = true;
            }
        }
        if (!partialsPush) {
            // console.log("!partialsPush");
            partials.push(getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams));
        } else {
            //console.log("notNestedArrayParams", notNestedArrayParams);
            // find for Array nested
            var NestedArrayParams = {};
            var partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams);
            for (var lbl in jsonObj) {
                partialsPush = false;
                if (jsonObj[lbl] && jsonObj[lbl].constructor === Object) {
                    jsonObj[lbl] = new Array(jsonObj[lbl])
                }
                if (Array.isArray(jsonObj[lbl])) {
                    foundOneArray = true;
                    //console.log("is array: " + Array.isArray(jsonObj[lbl]));
                    //console.log("Partial:" + Array.isArray(jsonObj[lbl]));
                    for (var sub_doc_index = 0; sub_doc_index < jsonObj[lbl].length; sub_doc_index++) {
                        if (!_unwind) {
                            partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams); // 2
                        }
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
                        if (!_unwind) {
                            partials.push(partial); //2
                            partialsPush == true; // 2}
                        }

                        // console.log("Partials: \n", partials);
                    }
                }
                if (_unwind) {
                    partials.push(partial);
                    partialsPush == true;
                }
            }
        }
        var allParams = notNestedArrayParams;
        for (var l in NestedArrayParams) {
            allParams.push(l);
        }
        return {
            again: foundOneArray,
            partials: partials,
            allParams: allParams
        };
    }
};

function getFromNestedArray(jsonObj, notNestedArrayParams) {
    var obj = {};
    for (var i = 0; i < notNestedArrayParams.length; i++) {
        obj[notNestedArrayParams[i]] = jsonObj[notNestedArrayParams[i]];
    }
    // console.log("getFromNestedArray", getFromNestedArray);
    return obj;
}

// Run
function start(array, callback) {
    var test = compatct(array);
    if (test.again === true) {
        //return callback(test);
        //console.log("PARTIAL \n", test);
        start(test.partials, callback);
    } else {
        //console.log("RESULT \n", test);
        return callback(test);
    }
}

function init(obj, callback) {
    // console.log("obj", obj);
    _unwind = obj.unwind !== undefined ? obj.unwind : true;
    console.log("unwind: " + _unwind);
    start(obj.list, callback);
}

exports.compress = init;
