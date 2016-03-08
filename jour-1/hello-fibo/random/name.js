var names = ['Pierre', 'Paul', 'Marie', 'Helene', 'Jean', 'Catherine']

var name = function (){
	var random = Math.ceil(Math.random() * 5 + 40);
	return names[random % 6];
}

module.exports = name;

