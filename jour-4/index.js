/**
 * Created by leojpod on 3/10/16.
 */
var async = require('async');
var MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/nodejs-test-jour4', function (err, db) {
	db.collection('cours').insertOne({"title":"Nodejs", 
		"Prof":"Leo", 
		"Students": ["Fred","Alex","Richard", "Nghia"]}, function(err, results){
			if (err){
				throw err;
			}
		console.log(results);	
	});
});
