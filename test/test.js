var compressor = require('../');

var exmp = [
    {
        "_id": "57766fc53543e84a003d4c43",
        "user": [
            {
                "_id": "577554a89fcaae26c914a71c",
                "email": "vefe2011@gmail.com",
                "firstName": "Feliciana",
                "lastName": "Savastano"
                }
        ],
        "coupon": [
            {
                "used": [{
                    "status": false
                }],
                "scratched": true,
                "winning": true,
                "analyzed": true,
                "active": true,
                "created": "2016-07-01T13:27:33.568Z",
                "code": "952954743585",
                "codeUsageBaseUrl": null
}]
}];
//var exmp = [{
//        "firstName": "andrea",
//        "lastName": "giglio",
//        "games": [
//            {
//                "id": 0,
//                "code": "A"
//			},
//            {
//                "id": 1,
//                "code": "B"
//			},
//            {
//                "id": 2,
//                "code": "C"
//			},
//            {
//                "id": 0,
//                "code": "D",
//                "actions": [
//                    {
//                        "id": 0,
//                        "code": "A"
//                   },
//                    {
//                        "id": 21,
//                        "code": "J"
//                   },
//                    {
//                        "id": 32,
//                        "code": "K"
//                   },
//                    {
//                        "id": 0,
//                        "code": "A",
//                        "jays": [{
//                                "name": "COOL"
//                       }, {
//                                "name": "COOL1",
//                                "surname": "BU"
//                       },
//                            {
//                                "name": "COOL2"
//                       }]
//
//                   }
//				]
//			}
//	]
//},
//    {
//        "firstName": "luca",
//        "lastName": "medici",
//        "games": [
//            {
//                "id": 0,
//                "code": "E"
//			},
//            {
//                "id": 1,
//                "code": "F"
//			},
//            {
//                "id": 2,
//                "code": "G"
//			},
//            {
//                "id": 0,
//                "code": "H",
//                "actions": [
//                    {
//                        "id": 0,
//                        "code": "I"
//								}
//							]
//			}
//	]
//}];

compressor.compress({
    list: exmp,
    unwind: true
}, function (j) {
    console.log("Compressed " + JSON.stringify(j, 0, 2));
});
