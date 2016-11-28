var compressor = require('../');

// TEST 1
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
    splitter: "-"
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    // console.log("Compressed " + JSON.stringify(result, 0, 2))
    var objectKeys = Object.keys(result.results[1]).length;
    if (result && objectKeys === 4 && result.results.length === 2 && result.labels.length === 4) {
        console.error("@--TEST 1.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 1.0                                           [ERROR] " + "");
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
			},
        {
            "id": 1,
            "code": "B"
			}
    ],
    "games2": [
        {
            "id": 0,
            "code": "A"
			},
        {
            "id": 1,
            "code": "B"
			}
    ],
    "phone": "340177662"
}];
compressor.compress({
    list: exmp,
    splitter: "-"
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    // console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.results[0]).length;
    if (result && objectKeys === 7 && result.results.length === 2 && result.labels.length === 7) {
        console.error("@--TEST 2.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 2.0                                           [ERROR] " + "");
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
    "lastAccess": [{
        date: ["2016-08-19T20:21:25.833Z"]
        }],
    "changepasswordConfirmToken": ["NOT_REQUIRED", "REQUIRED"],
    "changepasswordConfirmToken1": ["NOT_REQUIRED2"]
}];
compressor.compress({
    list: exmp,
    splitter: "-"
}, function (result) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    // console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.results[0]).length;
    if (result && objectKeys === 8 && result.results.length === 2 && result.labels.length === 8) {
        console.error("@--TEST 3.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 3.0                                           [ERROR] " + "");
    }
});

// TEST 4
var exmp = [{
    "firstName": "andrea",
    "lastName": "giglio",
    "games": [
        {
            "id": 0,
            "code": "A"
		},
        {
            "id": 1,
            "code": "B",
            "numer": 7
		},
        {
            "id": 2,
            "code": "C",
            "actions": [
                {
                    "id": 0,
                    "code": "I",
                    "numer": 8
			    }
						]
        }]
}];

compressor.compress({
    list: exmp,
    splitter: "-"
}, function (result) {
    // console.log("Original " + JSON.stringify(exmp, 0, 2));
    // console.log("Compressed " + JSON.stringify(result, 0, 2));
    var objectKeys = Object.keys(result.results[2]).length;
    if (result && objectKeys === 7 && result.results.length === 3 && result.labels.length === 8) {
        console.error("@--TEST 4.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 4.0                                           [ERROR] " + "");
    }
});

// TEST 5
var exmp = [{
    "firstName": "andrea",
    "lastName": "giglio",
    "games": [
        {
            "id": 0,
            "code": "A"
		},
        {
            "id": 1,
            "code": "B",
            "numer": 7
		},
        {
            "id": 2,
            "code": "C",
            "actions": [
                {
                    "id": 0,
                    "code": "I",
                    "numer": 8
			    },
                {
                    "id": 1,
                    "code": "IY",
                    "numer": 88
			    }
				]
        }]
}];

compressor.compress({
    list: exmp,
    splitter: "-"
}, function (result) {
    var objectKeys = Object.keys(result.results[0]).length;
    if (result && objectKeys === 7 && result.results.length === 3 && result.labels.length === 8) {
        console.error("@--TEST 5.0                                           [OK] " + "");
    } else {
        console.error("@--TEST 5.0                                           [ERROR] " + "");
        console.error("      |--FIX TODO Missing object with More objects into Array after 2nd level" + "");
        console.log("Original " + JSON.stringify(exmp, 0, 2));
        console.log("Compressed: " + JSON.stringify(result, 0, 2));
    }
});
