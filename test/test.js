var compressor = require('../');

// TEST 2
var exmp = [{
    "firstName": "andrea",
    "lastName": "giglio",
    "games": [
        {
            "id": 0,
            "code": "A"
			}]
}, {
    "firstName": "andrea",
    "lastName": "giglio",
    "games": [
        {
            "id": 0,
            "code": "A"
			}]
}];
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: true
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    //  console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[1]).length;
    if (result && objectKeys === 4 && result.partials.length === 2) {
        console.error("@--TEST 1.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 1.0                                           [ERROR] " + "");
    }
});
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: false
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    // console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[1]).length;
    if (result && objectKeys === 4 && result.partials.length === 2) {
        console.error("@--TEST 1.1                                           [OK] " + "");
    } else {
        console.error("@--TEST 1.1                                           [ERROR] " + "");
    }
});


// TEST 2
var exmp = [{
    "firstName": "andrea",
    "lastName": "giglio",
    "games": [
        {
            "id": 0,
            "code": "A"
			}, {
            "id": 1,
            "code": "B"
			}],
    "games2": [
        {
            "id": 0,
            "code": "A"
			}, {
            "id": 1,
            "code": "B"
			}],
    "phone": "340177662",
}];
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: true
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    //  console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[0]).length;
    if (result && objectKeys === 7 && result.partials.length === 4) {
        console.error("@--TEST 2.1                                           [OK] " + "");
    } else {
        console.error("@--TEST 2.1                                           [ERROR] " + "");
    }
});
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: false
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    //console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[0]).length;
    if (result && objectKeys === 11 && result.partials.length === 1) {
        console.error("@--TEST 2.1                                           [OK] " + "");
    } else {
        console.error("@--TEST 2.1                                           [ERROR] " + "");
    }
});

// TEST 3
var exmp = [{
    "__v": 0,
    "name": "andrea",
    "deleted": {
        "status": false,
        "blabla": "wowo",
        "cicio": {
            "a": 1
        }
    },
    "deleted2": [{
            "status": false,
            "bu": 342,
            "a": [{
                    "b": 1,
                    "f": [
                        {
                            "h": 1,
                            "h1": 1
                        }, {
                            "j": 3,
                            "j2": 3,
                            "j3": 3
                    }
                    ]
            },
                {
                    "c": 4
            }
            ]
    },
        {
            "status": true
    }],
    "lastAccess": [{
        date: ["2016-08-19T20:21:25.833Z"]
        }],
    "changepasswordConfirmToken": ["NOT_REQUIRED", "REQUIRED"],
    "changepasswordConfirmToken1": ["NOT_REQUIRED"]
}];
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: true
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    //  console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[0]).length;
    if (result && objectKeys === 18 && result.partials.length === 16) {
        console.error("@--TEST 3.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 3.0                                           [ERROR] " + "");
    }
});
compressor.compress({
    list: exmp,
    splitter: "-",
    splitResults: false
}, function (result) {
    // console.log("Original " + JSON.stringify(exmp, 0, 2));
    //console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.partials[0]).length;
    if (result && objectKeys === 19 && result.partials.length === 1) {
        console.error("@--TEST 3.1                                           [OK] " + "");
    } else {
        console.error("@--TEST 3.1                                           [ERROR] " + "");
    }
});
