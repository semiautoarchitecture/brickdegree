app = {};

app.testRotateCompass = function() {
    data.bearing_debug = 0;
    window.setInterval(function() {
        data.bearing_debug = (data.bearing_debug + 0.1) % 360;
        data.setCompassBearing(data.bearing_debug);
        ui.setCompassBearing(data.bearing_debug);
    }, 10);
}

app.loadCompass = function(handler) {

	Compass.noSupport(function() {
        ui.errorNotPhone();
        app.testRotateCompass();
	}).needGPS(function() {
        ui.errorNoGPS();
	}).needMove(function() {
	}).init(function(e) {
		Compass.watch(function(bearing) {
			handler(bearing);	
		});

	});

}

app.init = function() {

    // init all other libs
    ui.init();
    data.init();

    // load data from json
	data.loadData(helpers.getUrlValue("filename"));

    // bind events to UI
    ui.bindEvents();
    // when window is loaded, load compass if possible
    //
    //* compass */
    $(window).load(function() {
        console.log ("window loaded");
        app.loadCompass(function(bearing) {
			data.setCompassBearing(bearing);
			ui.setCompassBearing(bearing);
		});
    }); 

/*
	app.sendBearing(1000
    window.setInterval(function() {
        data.currentBearing
    }, 1000);*/


}


