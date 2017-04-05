function getWeather() {
	function success(pos) {
		var crd = pos.coords;
		loadWeather(crd.latitude +','+crd.longitude);
	};

	function error() {
		//Warszawa
		loadWeather("Malbork, PL");
		$('.error').html('<p> You not allowed to geolocation. Malbork is  a default location.</p>')
	};

	navigator.geolocation.getCurrentPosition(success, error);

}
$(document).ready(function(){
	setInterval(getWeather(), 10000);
});

function loadWeather(location, woeid) {
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather) {
			city = weather.city;
			temp = weather.temp+'&deg;';
			wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
			wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
			humidity = weather.humidity + ' %';

			$(".location").text(city);
			$(".temperature").html(temp);
			$(".climate_bg").html(wcode);
			$(".windspeed").html(wind);
			$(".humidity").text(humidity);
		},
		error: function(error) {
			$(".error").html('<p>' + error + '</p>');
		}
	});
}
