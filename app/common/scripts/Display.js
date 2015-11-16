// angular
// .module('common')
// .factory('Display', function(supersonic, HighfiveTypes){
// 	var Highfives = HighfiveTypes;
// 	initializeImageLocations();
// 	var service = {};
// 	var make = {};


// 	/*
// 		Overview: This is to handle displaying many views one after another

// 		Views Types: timed, non-quitable, prompt
// 		View Stages: Transtion in, display, exit condition, transition out
// 		View Options: Annotated over
		
// 		Goal: Cascaded 
// 	*/

// 	var show = new supersonic.ui.View('hi5#displayHighfive');

// 	service.newDisplay(type, data, callback){
// 		return displayController();
// 		switch (type) {
// 			case HighfiveTypes.BASIC:
				
// 				break;
// 			case HighfiveTypes.PAPER_AIRPLANE:
// 				break;
// 			case HighfiveTypes.DUNK:
// 				break;
// 			case HighfiveTypes.BOOMERANG:
// 				break;
// 			default: 
// 				break;
// 		} 
// 	}

// 	function displayController(){
// 		return {
// 			sequence : [],
// 			first: function(displayType, contentType){
// 				if (displayType !== 'inplace' || displayType !== 'modal')
// 					throw new Error("Improper displayType for display controller");

// 				return this;
// 			},
// 			then : function(action, options){
// 				if (action === 'finish')
// 					this.finish(options);
// 				else if(action === 'transition')
// 					this.display(action, options);
// 				else if(!action)
// 					return this;
// 				else
// 					throw new Error("Improper action for then. Must be finish or transition");
// 			},
// 			display : function(displayType, options){
// 				if (contentType !== 'highfive' || contentType !== 'alert' || contentType !== 'notification' || contentType !== 'transition')
// 					throw new Error("Improper contentType for display controller");

// 				sequence.push(make[displayType](options));
// 				return this;
// 			},
// 			finish : function(){
// 				return this;
// 			},
// 			play : function(){

// 			}
// 		};
// 	}


// 	make.highfive = function(options){
// 		var highfiveType = options.highfive;
// 		var timerLength = options.timerLength || 2000;
// 		var annotation = options.annotation || null;

// 		return function(){

// 		}
// 	}

// 	make.notification = function(options){

// 		return function(){

// 		}
// 	}

// 	make.transition = function(options){
// 		return function(){

// 		}
// 	};

// 	make.alert = function(){
// 		return function(){
			
// 		}
// 	}



// 	//WARNING: Expects images to use same name as key used in types
// 	//TODO: Look into making Highfives into an object that holds diofferent things
// 	function initializeImageLocations(){
// 		for(var key in Highfives){
// 			Highfives[key].imgLocation = 'img/' + key + '.gif';
// 		}
// 	}
// });