var compressor = require('../');

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
			},
            {
                "id": 2,
                "code": "C"
			},
            {
                "id": 0,
                "code": "D",
                "actions": [
                    {
                        "id": 0,
                        "code": "A"
                   },
                    {
                        "id": 21,
                        "code": "J"
                   },
                    {
                        "id": 32,
                        "code": "K"
                   },
                    {
                        "id": 0,
                        "code": "A",
                        "jays": [{
                                "name": "COOL"
                       }, {
                                "name": "COOL1",
                                "surname": "BU"
                       },
                            {
                                "name": "COOL2"
                       }]

                   }
				]
			}
	]
},
    {
        "firstName": "luca",
        "lastName": "medici",
        "games": [
            {
                "id": 0,
                "code": "E"
			},
            {
                "id": 1,
                "code": "F"
			},
            {
                "id": 2,
                "code": "G"
			},
            {
                "id": 0,
                "code": "H",
                "actions": [
                    {
                        "id": 0,
                        "code": "I"
								}
							]
			}
	]
}];

compressor.compress({
    list: exmp,
    unwind: true
}, function (j) {
    console.log("Original " + JSON.stringify(exmp, 0, 2));
    console.log("Compressed " + JSON.stringify(j, 0, 2));
});
