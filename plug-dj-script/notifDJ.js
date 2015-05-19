API.on(API.ADVANCE, function(data){
	console.log(data);
	var myId=API.getUser().id;

	if(data.dj.id == myId){
		addNotifDjChat(data.dj.username);
	}
});

function addNotifDjChat(djName){
	$chat = $('#chat-messages');
	$chat.append(''+
		'<div class="cm rsshit message rs-log-yellow">'+
			'<div class="badge-box">'+
				'<i class="icon icon-current-dj"></i>'+
			'</div>'+
			'<div class="msg notifDJ">'+
				'<div class="from">NotifDJ</div>'+
				'<div class="text">@'+djName+' Wake up ! Your are playing !</div>'+
			'</div>'+
		'</div>'+
		'');

	$chat.scrollTop($chat.get(0).scrollHeight);
}