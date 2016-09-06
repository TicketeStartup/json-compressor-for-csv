
# json-compressor-for-csv [![Dependency Status](https://david-dm.org/TicketeStartup/json-compressor-for-csv.svg)](https://david-dm.org/TicketeStartup/mailup-node-api)[![npm version](https://badge.fury.io/js/json-compressor-for-csv.svg)](https://badge.fury.io/js/json-compressor-for-csv)
 [![NPM](https://nodei.co/npm/json-compressor-for-csv.png)](https://nodei.co/npm/json-compressor-for-csv/)


## Installation ##

`npm install json-compressor-for-csv`

## Usage ##

### Step 1: Initialization ###


	const compressor = require('json-compressor-for-csv'); 
	
	compressor.compress({
	    list: _uncompressed,    // ARRAY only
	    unwind: true,
	    splitter : "-" // default "-"
	   }, function (jsv) {
      	     console.log("Compressed " + JSON.stringify(jsv, 0, 2));
	 });

## Exemples ##

### Exemple 1 ###
      
        let _uncompressed = [{
                "firstName": "andrea",
                "lastName": "giglio",
                "games": [
                    {
                        "id": 0,
                        "code": "A"
                    }]
            }];
  
  **Compressed**
  
          {
            "again": false,
             "partials": [
                         {
                            "firstName": "andrea",
                            "lastName": "giglio",
                            "games-id": "0",
                            "games-code": "A"
                          }
                        ],
              "allKeys":["firstName","lastName","games-id","games-code"]
            }
  
  
### Exemple 2 ###


    let _uncompressed = [
            {
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
          }
    ];
  
**Compressed**

        "again": false,
        "partials": [
          {
            "firstName": "andrea",
            "lastName": "giglio",
            "games-id": "0",
            "games-code": "D",
            "games-actions-id": "0",
            "games-actions-code": "A",
            "games-actions-jays-name": "COOL2",
            "games-actions-jays-surname": "BU"
          },
          {
            "firstName": "luca",
            "lastName": "medici",
            "games-id": "0",
            "games-code": "H",
            "games-actions-id": "0",
            "games-actions-code": "I"
          }
        ],
        "allKeys": [
          "firstName","lastName","games-id","games-code","games-actions-id","games-actions-code","games-actions-jays-name","games-actions-jays-surname"
        ]
      }


## Export to CSV ##

You can convert the compressed json using [json2csv](https://www.npmjs.com/package/json2csv)	

	npm install json-compressor-for-csv
	npm install json2csv
	
	const compressor = require('json-compressor-for-csv'),
		json2csv = require('json2csv');
		
	compressor.compress({
	        list: _uncompressed,
	        unwind: true
	    }, function (jsv) {
	        //console.log("COMPRESSED", jsv);
	        json2csv({
	                data: JSON.parse(JSON.stringify(jsv.partials)),
	                fields: jsv.allParams,
	                del: ';'
	            },
	            function (err, csv) {
	                //console.log("CSV", csv);
	            });
	    });
	
