angular
.module('common')
.factory('Display', function(supersonic, HighfiveData){
	var service = {};
	var make = {};


	/*
		Overview: This is to handle displaying many views one after another

		Views Types: timed, non-quitable, prompt
		View Stages: Transtion in, display, exit condition, transition out
		View Options: Annotated over
		
		Goal: Cascaded 
	*/

	var show =  new supersonic.ui.View("hi5#view");

	service.newDisplay(type, data, callback){
		return displayController();
	}

	function displayController(){
		return {

			sequence : [], //stores the stages
			inplaceScope : null,
			finished : false, //used to mark finished and built succesfully 
			dist : null, // resulting function used to display

			/**
		    * Inplace means that there is a tag in scope that can be used. Requires passed in scope
		    * Model means it will popup and use the view.html
		    */
			first: function(displayType, scope){
				if (displayType !== 'inplace' || displayType !== 'modal')
					throw new Error("Improper displayType for display controller");

				if(displayType === 'inplace' && !scope)
					throw new Error("Improper displayType for display controller");

				this.inplaceScope = scope;
				return this;
			},

			/**
		    * 
		    */
			then : function(action, options){
				if(!action)
					return this;

				switch(action) {
					case'finish':
						return this.finish(options);
					case 'transition':
						return this.display(action, options);
					default:
						throw new Error("Improper action for then. Must be finish or transition");
				}
			},

			/**
		    * 
		    */
			display : function(displayType, options){
				//accepts highfive, transition, alert, notification, prompt
				if(!make[displayType])
					throw new Error("Improper contentType for display controller");

				sequence.push(make[displayType](options));
				return this;
			},

			/**
		    * 
		    */
			finish : function(){
				finished = this.build()
				return this;
			},

			build : function(){

			},

			/**
		    * 
		    */
			play : function(){
				if(!this.finished){
					console.log("Called play on unfinished. Check if it builds.")
					supersonic.logger.log("Called play on unfinished Display. Check if it builds.");
				} else {
					this.dist();
				}
			}
		};
	}


	make.highfive = function(options){
		var highfive = options.highfive;
		var cb = options.cb
		var annotation = options.annotation || null;

		var hftype = highfive.type;
		var timerLength = HighfiveData.timerLength 
		var animate = { animate: false };

		return function(next){
			return function(){
				//TODO: change this into changing view params
				supersonic.ui.modal.show(show, animate).then(function(){
					setTimeout(function(){
						//TODO: have it change view params here
						if(cb)
							cb(highfive);
						next();
					}, timerLength);
				});
			}
		};
	}

	make.notification = function(options){
		var message = options.message;
		if(var timed = options.timed){
			var timerLength = options.timerLength || 3000
		} 

		var animate = { animate: false };

		return function(next){
			return function(){
				//TODO: change this into changing view params
				supersonic.ui.modal.show(show, animate).then(function(){
					if(timed){
						setTimeout(next, timerLength);
					} else{
						//TODO: add in wait for users tap to go to next
						next();
					}
				});
			}
		}
	}

	make.transition = function(options){
		return function(){

		}
	};

	make.alert = function(options){
		var message = options.message
		var cb = options.cb;

		return function(next){
			return function(){
				supersonic.ui.dialog.alert(message).then(function(){
					if(cb)
						cb()
					next();
				})
			}
		}
	}

	make.prompt= function(options){
		var promptOptions = {
			title: options.title || "",
			defaultText : options.defaultText || ""
		};

		var message = options.message || "";
		var cb = options.cb;

		return function(next){
			return function(){
				supersonic.ui.dialog.prompt(message, promptOptions).then(function(promptdata) {
        			if(cb)
        				cb(promptdata)

        			next();
        		});
			}
      	};
	}


	//WARNING: Expects images to use same name as key used in types
	//TODO: Look into making Highfives into an object that holds diofferent things
	// function initializeImageLocations(){
	// 	for(var key in Highfives){
	// 		Highfives[key].imgLocation = 'img/' + key + '.gif';
	// 	}
	// }
});