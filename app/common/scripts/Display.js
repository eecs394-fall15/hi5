angular
.module('common')
.factory('Display', function(supersonic, HighfiveTypes){
	var imageLocations = {};
	var service = {};


	service.displayHighfive = function(highfiveType) {
		//should throw error
		// if(!HighfiveTypes[highfiveType])
		var show = new supersonic.ui.View('hi5#displayHighfive');
		switch (highfiveType) {
			case HighfiveTypes.BASIC:
				
				break;
			case HighfiveTypes.PAPER_AIRPLANE:
				break;
			case HighfiveTypes.DUNK:
				break;
			case HighfiveTypes.BOOMERANG:
				break;
			default: 
				break;
		} 

	}





	function chain(next, rest){
		return function(){
			next();
			rest();
		};
	}

	function displayHighfive(type, timerLength, annotation){
		annotation = annotation || "";
		
	}

	function displayAlert(){

	}

	function displayAlter(){

	}

	//WARNING: Expects images to use same name as key used in types
	//TODO: Look into making Highfives into an object that holds diofferent things
	function initializeImageLocations(){
		var typeKeys = Object.keys(HighfiveTypes);

		typeKeys.forEach(function(key){
			imageLocations[HighfiveTypes[key]] = '/img/' + key + '.gif';
		});
	}
});