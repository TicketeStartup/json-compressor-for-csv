
# json-compressor-for-csv [![Dependency Status](https://david-dm.org/TicketeStartup/json-compressor-for-csv.svg)](https://david-dm.org/TicketeStartup/mailup-node-api)[![npm version](https://badge.fury.io/js/json-compressor-for-csv.svg)](https://badge.fury.io/js/json-compressor-for-csv)
 [![NPM](https://nodei.co/npm/json-compressor-for-csv.png)](https://nodei.co/npm/json-compressor-for-csv/)


## Installation ##

`npm install json-compressor-for-csv`

## Usage ##

### Step 1: Initialization ###


	const compressor = require('json-compressor-for-csv'); 
	
	compressor.compress({
	    list: _uncompressed,    // ARRAY only
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


    let _uncompressed = [{
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
                        "code": "J"
								}
							]
            }]
    },
    {
        "firstName": "luca",
        "lastName": "medici",
        "games": [
            {
                "id": 0,
                "code": "H",
                "actions": [
                    {
                        "id": 0,
                        "code": "I"
				    },
                    {
                        "id": 1,
                        "code": "J",
                        "books": [
                            {
                                "id": 0,
                                "code": "KK"
				    },
                            {
                                "id": 1,
                                "code": "LL"
				    }]
				    }]
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
		   },
		   {
		     "firstName": "andrea",
		     "lastName": "giglio",
		     "games-id": "1",
		     "games-code": "B",
		     "games-numer": "7"
		   },
		   {
		     "firstName": "andrea",
		     "lastName": "giglio",
		     "games-id": "2",
		     "games-code": "C",
		     "games-actions-id": "0",
		     "games-actions-code": "I",
		     "games-actions-numer": "8"
		   },
		   {
		     "firstName": "andrea",
		     "lastName": "giglio",
		     "games-id": "2",
		     "games-code": "C",
		     "games-actions-id": "1",
		     "games-actions-code": "J"
		   },
		   {
		     "firstName": "luca",
		     "lastName": "medici",
		     "games-id": "0",
		     "games-code": "H",
		     "games-actions-id": "0",
		     "games-actions-code": "I"
		   },
		   {
		     "firstName": "luca",
		     "lastName": "medici",
		     "games-id": "0",
		     "games-code": "H",
		     "games-actions-id": "1",
		     "games-actions-code": "J",
		     "games-actions-books-id": "0",
		     "games-actions-books-code": "KK"
		   },
		   {
		     "firstName": "luca",
		     "lastName": "medici",
		     "games-id": "0",
		     "games-code": "H",
		     "games-actions-id": "1",
		     "games-actions-code": "J",
		     "games-actions-books-id": "1",
		     "games-actions-books-code": "LL"
		   }
		 ],
		 "allKeys": ["games-id","games-code","games-numer","games-actionsObj","games-actions","games-actionsObj-id","games-actionsObj-code","games-actionsObj-numer","games-actions-id","games-actions-code","games-actions-numer","games-actions-books","games-actions-books-id","games-actions-books-code"
		 ]
		}

 


## Export to CSV ##

You can convert the compressed json using [json2csv](https://www.npmjs.com/package/json2csv)	

	npm install json-compressor-for-csv
	npm install json2csv
	
	const compressor = require('json-compressor-for-csv'),
		json2csv = require('json2csv');
		
	compressor.compress({
	        list: _uncompressed
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
	
