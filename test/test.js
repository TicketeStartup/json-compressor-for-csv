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


var exmp = [{
        _id: "5775549f9fcaae26c9148fea",
        approved: true,
        banned: false,
        email: 'ska_kia91@yahoo.it',
        firstName: 'Chiara',
        lastName: 'Gar',
        userAgent: 'iOS',
        username: 'Kiamberbatch',
        role: 'ROLE_USER',
        inviteCode: 'CHI5564'
    },
    {
        _id: "5775549f9fcaae26c9148fea",
        address: {
            cap: '04016'
        },
        approved: true,
        banned: false,
        email: 'maria_amato@live.it',
        firstName: 'maria',
        gender: 'female',
        lastName: 'amato',
        role: 'ROLE_USER',
        inviteCode: 'MAR5583'
    },
    {
        address: {
            cap: '00040'
        },
        approved: true,
        banned: false,
        email: 'leograndeg@gmail.com',
        firstName: 'Giuseppe',
        gender: 'male',
        lastName: 'leogrande',
        role: 'ROLE_USER',
        inviteCode: 'GIU551'
    }];
compressor.compress({
    list: exmp,
    splitter: "-"
}, function (j) {
    console.log("Original " + JSON.stringify(exmp, 0, 2));
    console.log("Compressed " + JSON.stringify(j, 0, 2));
});
