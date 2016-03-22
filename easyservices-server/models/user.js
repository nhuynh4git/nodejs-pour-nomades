var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
	name: {type: String, required: true},
	email:{type: String, required: true, unique: true},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, default: false}
});

userSchema.statics.findByNameOrEmail = function(nameOrEmail, cb){
	this.find({$or:[{'name': nameOrEmail}, {'email': nameOrEmail}]}, cb);
};

userSchema.statics.findAll = function(cb){
	this.find().exec(cb);
};

var User = mongoose.model('User', userSchema);

module.exports = User;