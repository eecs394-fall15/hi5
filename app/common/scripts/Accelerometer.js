angular
.module('common')
.factory('Accelerometer', function(HighfiveTypes, supersonic){
	var service = {};
	var accData = [];
	var START_RECORDING = function(motionEvent){
		accData.push(motionEvent.acceleration);
    };
    var STOP_RECORDING = null;

	/**
	*	Accelerometer starts recording data
	*	@param {int}	timerLength num ms to record acc data for. Defaults to 2000
	*	@param {function} cb called with the motion that was identified
	*/
	service.start = function(cb, timerLength){
		if(window.ondevicemotion !== null){
			cb("Error: already started", null);
		} else{
			timerLength = timerLength || 4000;
			window.ondevicemotion = START_RECORDING;
			supersonic.logger.log('Logging for : ' + timerLength);

		    setTimeout(function(){
	    		service.stop(function(){
	            	supersonic.logger.log("Stopped");
	            	var motion = identifyMotion();
		            cb(null, motion);
		    	});
		    }, timerLength);
		}
	};

	/**
	*	Accelerometer stops recording data. Note, accelerometer data is not cleared
	*/
	service.stop = function(callback){
    	window.ondevicemotion = STOP_RECORDING;
    	callback();
	};

	/**
	*	Clear recorded acclerometer data
	*	@return	{int} returns the number of data points cleared
	*/
	service.clearData = function(){
		var numDeleted = accData.length;
		accData = [];
		return numDeleted;
	};

	service.getData = function(){
		return accData;
	};

	/**
	*	Uses recorded data
	*	@return	{int} returns the number of data points cleared
	*/
	function identifyMotion(){
		//assume that there is not data
		if (accData.length < 10){
			return null;
		}

		var cleanData = clean(accData);
		var motion = [0,0];
		cleanData.filter(function(acc){
			if (Math.abs(acc.z) > 10) {
				motion[0] += 1;
			} else if (Math.abs(acc.y) > 10) {
				motion[1] += 1;
			}
		});

		supersonic.logger.info(motion);
		var max = Math.max.apply(null, motion);

		if(motion[0] ===0 && motion[1] === 0)
			return null;

		if( motion[0] == max ){
            return HighfiveTypes.BASIC;
        } else if ( motion[1] == max ) {
        	return HighfiveTypes.PAPER_AIRPLANE;
        } else {
        	return null;
        }
	};


	/**
	*	Tries to account for drift, removes values
	*	@return	{array} returns cleaned array
	*/
	function clean(){
		var ret = accData;
		return ret;
	}

	// /**
	// *	keep only the high acceleration
	// */
	// function lowPassFilter(){
	// 	var runningAverage = 0;
	// 	var ret = [];

	// 	for(var i = 0; i < arr.length; i++){
	// 		console.log("filtering");
	// 	}

	// 	return ret;
	// }

	// *
	// *	Function that detects spikes that are defined as 100 ms where
	// *	delta acc > 0.4 between each datapoint
	// *
	// *	@param {array} array of data to check
	// *	return {arrayof(object)} returns array of objects that contain startIndex, stopIndex, and spike-axis

	// function detectSpikes(){
	// 	//TODO: instead of hardcoding delta threshold, find through filter
	// 	console.log("detecting");
	// }

	return service;
});
