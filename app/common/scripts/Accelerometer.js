angular
.module('common')
.factory('Accelerometer', function(HighfiveTypes){
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
		timerLength = timerLength || 2000;
		window.ondevicemotion = START_RECORDING;

	    setTimeout(function(){
            service.stop();
            cb(identifyMotion());
	    }, timerLength);
	};

	/**
	*	Accelerometer stops recording data. Note, accelerometer data is not cleared
	*/
	service.stop = function(){
    	window.ondevicemotion = STOP_RECORDING;
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
		var filtered = cleanData.filter(function(acc){
			return Math.abs(acc.z) > 10;
		})
		if(filtered.length  > 0){
            return HifiveTypes.BASIC;
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