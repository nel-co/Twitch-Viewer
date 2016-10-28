var urlBase = 'https://api.twitch.tv/kraken/streams/';
var userName;
var userDescr;
var userstatus;
var userPic;
var streamUrl;

var users = ['adobe', 'bobross', 'freecodecamp', 'esl_csgo', 'ninja', 'drdisrespectlive', 'brunofin'];

function getStream() {
	for (var i = 0; i < users.length; i++) {
		streamUrl = users[i];

		$.ajax({
			type: 'GET',
			url: urlBase + users[i],
			async: true,
			headers: {
				'Client-ID': 'cexkyg036v5fra0ekriztmi0m3pkkx3'
			},
			success: function (json) {
				if (json.stream !== null) {
					console.log(json);
					userName = json.stream.channel.display_name;
					streamUrl = json.stream.channel.url;
					userDescr = json.stream.channel.status;
					userDescr = userDescr.substring(0, 32) + '...';
					userPic = json.stream.channel.logo;

					$('.container').append('<div class="user"><img class="userPic" src="' + userPic + '">' +
						'<div class="userInfo"><a href="' + streamUrl + '" target="_blank"><h1 class="userName">' + userName + '</h1>' +
						'<p class="userDescr">' + userDescr + '</p></a></div><div class="userStatus online"><i class="fa fa-circle" aria-hidden="true"></i>' + '</div');
				} else if (json.stream == null) {
					console.log(json);
					urlBase = json._links.channel;

					$.ajax({
						type: 'GET',
						url: urlBase,
						headers: {
							'Client-ID': 'cexkyg036v5fra0ekriztmi0m3pkkx3'
						},
						success: function (json) {
							userName = json.display_name;
							streamUrl = json.url;
							userPic = json.logo;
							$('.container').append('<div class="user"><img class="userPic" src="' + userPic + '">' +
								'<div class="userInfo"><a href="' + streamUrl + '" target="_blank"><h1 class="userName">' + userName + '</h1>' +
								'</a></div><div class="userStatus offline"><i class="fa fa-circle" aria-hidden="true"></i>' + '</div');
						}
					});
				}
			},
			error: function (json) {
				$('.container').append('<div class="user"><img class="userPic">' +
					'<div class="userInfo"><a href="https://passport.twitch.tv/users/new?client_id=36926892495301a63b2e9350a38d3d6dbf72ad81e571a3ebba4687250ec8f352c70b3e91229602f73e1335528f3caa00a5cf513f484d7003784e722f2ce7a216&embed=0&error_code=&nonce=b23c08f1243797a2651b133251a925ee502a6eef&redirect_uri=https%3A%2F%2Fwww.twitch.tv%2F&response_type=code&scope=openid&state=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWRpcmVjdF9wYXRoIjoiaHR0cHM6Ly93d3cudHdpdGNoLnR2LyJ9.LJqY_XciO98NqOlYWbBNUjrpI5jG3GKTJi7nifp7-wc&stay_embedded=0&sudo_reason=&username=" target="_blank"><h1 class="userName">User Does Not Exist</h1>' +
					'</a></div><div class="userStatus unavail"><i class="fa fa-circle" aria-hidden="true"></i>' + '</div');
			}
		});
	}
}
getStream();