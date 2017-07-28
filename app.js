function getData() {
	var channels = ["ESL_SC2", "OgamingSC2", "cretetion",
				   "freecodecamp", "SaltyTeemo", "habathcx", 
				   "RobotCaleb", "noobs2ninjas", "brunofin", 
				   "comster404", "Food", "StreamerHouse"];

	$.each(channels, function(x, channel) {
		var urlc = "https://wind-bow.gomix.me/twitch-api/channels/" + 
			channel + "?callback=?";
		var urls = "https://wind-bow.gomix.me/twitch-api/streams/" + 
			channel + "?callback=?";	
		$.getJSON(urls, function(data) {
			if (data.stream !== null && data.status !== 500) {
				var logo = data.stream.channel.logo,
					name = data.stream.channel.display_name,
					status = data.stream.channel.status,
					link = 'https://www.twitch.tv/' + channel,
					viewers = data.stream.viewers,
					view = data.stream.preview.medium,
					id = data.stream._id,
					onUser = '<div class="userBox onLineUser preview"><a href="' + link + '" target="_blank">';
					onUser += '<img src="' + logo;
					onUser += '" class="onlineImg">' + '<p>' + name + '</p>';
					onUser += '<div><div class="onlineLogo"></div><p><i>online</i></p></div>';
					onUser += '<div class="previewContent"><img src="' +  view + '">';
					onUser += '<p>' + status + '</p>' + '<p>Views: ' + viewers + '</p>' + '</div></div></a>';
				$('#wrapper').append(onUser);

			} else {
				$.getJSON(urlc, function(data) {
					if (data.status !== 404) {
						var logo = data.logo,
							name = data.display_name,
							status = data.status,
							link = 'https://www.twitch.tv/' + channel,
						offUser = '<div class="userBox offLineUser""><a href="' + link + '" target="_blank">';	
						offUser += '<img src="' + logo;
						offUser += '" class="onlineImg">' + '<p>' + name + '</p>';
						offUser += '<div><div class="offlineLogo"></div><p><i>offline</i></p></div></div>';
					$('#wrapper').append(offUser);						
					} else {
						var logo = "https://metatags.nl/seo/wp-content/uploads/2015/07/404_not_found.gif";
							name = channel;
							status = data.message;
						offUser = '<div class="userBox offLineUser delUser"><img src="' + logo;
						offUser += '" class="onlineImg">' + '<p>' + name + '</p>';
						offUser += '<p>--</p></div>';
					$('#wrapper').append(offUser);
					}
				});
			}
		});

	});	
	$('div.tab button').on('click', function() {
		$('div.tab button').removeClass('active');
		$(this).addClass('active');
		$('.userBox').hide();
		if ($('.online').hasClass('active')) {		
			$('.onLineUser').show();		
		} else if ( $('.offline').hasClass('active') ) {
			$('.offLineUser').show();
		} else {
			$('.userBox').show();
		}
	})
}

$(document).ready(function(){
	getData();
});