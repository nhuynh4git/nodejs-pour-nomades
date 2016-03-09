var fs=require('fs');
fs.readdir ('./', function(err,files){
	cosnsole.log('file in fs-trials ->', files);
	var file;
	for (var i= 0; i < files.length; i++){
		file = files[i];
		fs.readfile('./'+file, {encoding:'utf-8'}, function(err){

		})
	}
})