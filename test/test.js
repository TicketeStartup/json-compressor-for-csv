var compressor = require('../');

//var exmp = [{
//    "firstName": "andrea",
//    "lastName": "giglio",
//    "games": [
//        {
//            "id": 0,
//            "code": "A"
//			},
//        {
//            "id": 1,
//            "code": "B",
//            "numer": 7,
//            "actionsObj": {
//                "id": 0,
//                "code": "I",
//                "numer": 8
//            }
//			},
//        {
//            "id": 2,
//            "code": "C",
//            "actions": [
//                {
//                    "id": 0,
//                    "code": "I",
//                    "numer": 8
//				    },
//                {
//                    "id": 1,
//                    "code": "J"
//								}
//							]
//            }]
//    },
//    {
//        "firstName": "luca",
//        "lastName": "medici",
//        "games": [
//            {
//                "id": 0,
//                "code": "H",
//                "actions": [
//                    {
//                        "id": 0,
//                        "code": "I"
//				    },
//                    {
//                        "id": 1,
//                        "code": "J",
//                        "books": [
//                            {
//                                "id": 0,
//                                "code": "KK"
//				    },
//                            {
//                                "id": 1,
//                                "code": "LL"
//				    }]
//				    }]
//            }]
//    }];

compressor.compress({
    list: exmp,
    splitter: "-"
}, function (j) {
    //console.log("Original " + JSON.stringify(exmp, 0, 2));
    console.log("Compressed " + JSON.stringify(j, 0, 2));
    console.log("again " + j.again);
});
