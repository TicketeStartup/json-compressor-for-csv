var compatted = [],
    lables = [];

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
            if (!Array.isArray(jsonObj[lbl])) {
                //console.log("Value: " + lbl);
                notNestedArrayParams.push(lbl);
            } else {
                partialsPush = true;
            }
        }
        if (!partialsPush) {
            //console.log("!partialsPush");
            partials.push(getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams));
        } else {
            //console.log("notNestedArrayParams", notNestedArrayParams);
            // find for Array nested
            var NestedArrayParams = {};
            for (var lbl in jsonObj) {
                partialsPush = false;
                if (jsonObj[lbl].constructor === Object) {
                    jsonObj[lbl] = new Array(jsonObj[lbl])
                }
                if (Array.isArray(jsonObj[lbl])) {
                    foundOneArray = true;
                    //console.log("is array: " + Array.isArray(jsonObj[lbl]));
                    //console.log("Partial:" + Array.isArray(jsonObj[lbl]));
                    for (var sub_doc_index = 0; sub_doc_index < jsonObj[lbl].length; sub_doc_index++) {
                        var partial = getFromNestedArray(arrayJsonObjs[i], notNestedArrayParams);
                        for (sub_doc_2 in jsonObj[lbl][sub_doc_index]) {
                            if (jsonObj[lbl][sub_doc_index][sub_doc_2].constructor === Object) {
                                jsonObj[lbl][sub_doc_index][sub_doc_2] = new Array(jsonObj[lbl][sub_doc_index][sub_doc_2])
                            }
                            partial[lbl + "-" + sub_doc_2] = jsonObj[lbl][sub_doc_index][sub_doc_2];
                            NestedArrayParams[lbl + "-" + sub_doc_2] = true;
                        }
                        partials.push(partial);
                        partialsPush == true;
                    }
                    // console.log("Partials: \n", partials);
                }
            }
        }
        // console.log("\n----|" + i)
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

function getFromNestedArray(jsonObj, notNestedArrayParams) {
    var obj = {};
    for (var i = 0; i < notNestedArrayParams.length; i++) {
        obj[notNestedArrayParams[i]] = jsonObj[notNestedArrayParams[i]];
    }
    return obj;
}
// Run
function start(exmp, callback) {
    var test = compatct(exmp);
    if (test.again === true) {
        start(test.partials,callback);
    } else {
        //console.log("RESULT \n", test);
        return callback(test);
    }
}
exports.compress = start;