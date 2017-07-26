module.exports = {
	string_to_boolean: function(string){
		return string == 'true' ? true : false; 
	},
	boolean_to_string: function(bool){
		return bool == true ? 'true' : 'false';
	}

}