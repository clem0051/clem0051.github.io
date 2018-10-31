var app;
var map;
function init()
{
	app = new Vue({
	el: '#app',
	data: {
		map_location: "51.505, -0.09",
		map_location_real: "51.505, -0.09",
		retreave: [],
		data: "ss"
	}
	});
	map = L.map('mapid').setView([51.505, -0.09], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([51.5, -0.09]).addTo(map)
		.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
	
	map.on('moveend', onMapMove);
	retreaveData();
}
function retreaveData(event)
{
    if (app.retreave !== "")
    {
        var request = {
            url: "https://api.openaq.org/v1/measurements?coordinates=" + app.map_location + "&radius=" + 5000,
            dataType: "json",
            success: measurementsData
        };
        $.ajax(request);
    }
    else
    {
        app.retreave = [];
    }
}
function measurementsData(data)
{
	console.log(data);
	app.retreave = data['results'];
	for (var i = 0; i < app.retreave.length; i++)
	{
		L.marker([app.retreave[i].coordinates.latitude,app.retreave[i].coordinates.longitude]).addTo(map)
			.bindPopup(
			""
			);
	}
}

function onMapMove(e) {
    app.map_location_real = map.getCenter();
	app.map_location = "" + app.map_location_real;
	app.map_location = app.map_location.substring(7,app.map_location.indexOf(')'));
}

function onLatLongUpdate(e) {
	if (app.map_location.indexOf(', ') !== -1)
	{
		if (isNaN(app.map_location.substring(0,app.map_location.indexOf(','))) === false 
		&& isNaN(app.map_location.substring(app.map_location.indexOf(',')+1)) === false)
		{
			var arr = app.map_location.split(', ');
			map.panTo(arr);
		}
	}
}
function fullscreenMap(e)
{
	console.log(e.keycode);
	if (e.keyCode === 70) // If F is pressed
	{
	if (document.getElementById('mapid').className === "")
	{
		document.getElementById('mapid').className = "fullscreen";
	}
	else
	{
		document.getElementById('mapid').className = "";
	}
	}
}
