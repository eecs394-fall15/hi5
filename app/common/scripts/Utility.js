angular
.module('common')
.factory('Utility', function(){
	var service = {};

	service.timeSince = function (date) {
	    var seconds = Math.floor((new Date() - date) / 1000);
	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) 
	        return interval + " years";
	    interval = Math.floor(seconds / 2592000);

	    if (interval > 1) 
	        return interval + " months";
	    interval = Math.floor(seconds / 86400);

	    if (interval > 1) 
	        return interval + " days";
	    interval = Math.floor(seconds / 3600);

	    if (interval > 1) 
	        return interval + " hours";
	    interval = Math.floor(seconds / 60);

	    if (interval > 1) 
	        return interval + " minutes";
	    return Math.floor(seconds) + " seconds";
	}

	service.getMailboxIconClass = function(highfive){
		var isOpened = highfive.opened;
		var isSender = (Requests.currentUser.id == highfive.sender);

		if(isSender)
			return 'icon ' + (isOpened ? iconClasses.OPENED_SENT : iconClasses.UNOPENED_SENT);
		else
			return 'icon ' + (isOpened ? iconClasses.OPENED_RECEIVED : iconClasses.UNOPENED_RECEIVED);
	}

	service.compareHighfiveDates = function(a, b){
		if(a.createdAt > b.createdAt)
          return 1;

        if(a.createdAt < b.createdAt)
          return -1;
        
        return 0;
	}

	service.sortHighfives = function(highfives){
		var sent_opened = [];
		var received_opened = [];
		var sent_unopened = [];
		var received_unopened = [];

		highfives.forEach(function(highfive){
		if (highfive.sender == Requests.currentUser.id){
		  highfive.opened ? sent_opened.push(highfive) : sent_unopened.push(highfive)
		} else{
		  highfive.opened ? received_opened.push(highfive) : received_unopened.push(highfive)
		}
		});

		sent_opened.sort(compareHighfiveDates);
		received_opened.sort(compareHighfiveDates);
		sent_unopened.sort(compareHighfiveDates);
		received_unopened.sort(compareHighfiveDates);

		var ret = received_unopened.concat(received_opened, sent_unopened, sent_opened);

		return ret;
	}

	return service;
});