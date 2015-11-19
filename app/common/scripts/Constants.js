angular
.module('common')
.constant('HighfiveTypes', {
	BASIC : 'basic highfive',
	PAPER_AIRPLANE : 'paper airplane',
	DUNK : 'dunkfive',
	BOOMERANG : 'boomerang'
});

angular
.module('common')
.constant('HighfiveData', {
	basic : {
		display : 'basic highfive',
		timerLength : 2500,
		imgLocation : 'img/'
	},
	paper_airplane : {
		display : 'paper airplane',
		timerLength : 2500,
		imgLocation : 'img/'
	},
	dunk : {
		display: 'dunkfive',
		timerLength : 2500,
		imgLocation : 'img/'
	},
	boomerang : {
		display : 'boomerang',
		timerLength : 2500,
		imgLocation : 'img/'
	}
});