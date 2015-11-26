angular
.module('common')
.constant('HighfiveTypes', {
	BASIC : 'BASIC',
	PAPER_AIRPLANE : 'PAPER_AIRPLANE',
	DUNK : 'DUNK',
	BOOMERANG : 'BOOMERANG'
});



angular
.module('common')
.constant('HighfiveData', {
	BASIC : {
		display: "Basic5",
		imgSrc: '/img/howto/step3.png',
		description: "The ole up top",
		subtypes : [{
			id : 'classic',
			display :  'The Classic',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length: 2000,
		},{
			id : 'fact',
			display :  'Fact!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/fact.gif',
			length : 2000,
		},{
			id : 'blackhawksBump',
			display :  'Da Blackhawks Bump',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/blackhawk.png',
			length : 2000,
		},{
			id : 'wilcatz',
			display :  'Go Catz!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/catz.png',
			length: 2000
		}]
	},

	//forward basic highfives
	PAPER_AIRPLANE : {
		display: "Fling5",
		imgSrc: '/img/howto/step1.png',
		description: "Forward five em",
		subtypes : [{
			id : 'incoming',
			display :  'Incoming!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		},{
			id : 'ontheway',
			display :  'On the way',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		},{
			id : 'goingOut',
			display :  'Going out',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		}]
	},

	//downward motion highfives
	DUNK : {
		display: "Low5",
		imgSrc: '/img/howto/step2.png',
		description: "Hit them down low",
		subtypes : [{
			id : 'dunkfive',
			display :  'Dunkfive!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		},{
			id : 'inBag',
			display :  'It\' in the bag!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		},{
			id : 'killinGame',
			display :  'Killing the Game!',
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		},{
			id : 'down',
			display :  "I'm down",
			imgSrc: '',
			thumbnailSrc: '/hands/thumbnails/theclassic.png',
			length : 2000
		}]
	}//,

	// // BOOMERANG : 'boomerang',

	// getHighfiveTypes : function(){
	// 	var keys = Object.keys(this);
	// 	var exclude = ['getHighfiveTypes'];
	// 	var ret = [];

	// 	keys.forEach(function(key){
	// 		if(exclude.indexOf(key) === -1){
	// 			ret.push({
	// 				display: this[key].display,
	// 				imgSrc: this[key].imgSrc
	// 			})
	// 		}
	// 	});

	// 	return ret;
	// }
});