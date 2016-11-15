ui = {};

ui.settingsToggle = function() {
    console.log("settingsToggle");
    $(".settingsMenu").slideToggle();
}

ui.errorNotPhone = function() {
    $(".errormessage").html("You need to access this website on your phone.");
    $(".errordiv").css('display', 'flex');
}

ui.errorNoGPS = function() {
    $(".errormessage").html("You need to enable GPS or Location Services on your phone.");
    $(".errordiv").css('display', 'flex');
}


ui.updateTargetDegree = function() {

    var thisDD = data.currentDegreeData();

    var courseN = thisDD['courseN'];
    var brickN = thisDD['brickN'];
    var targetDegree = thisDD['degree'];

    var svgDoc = $("#compasses")[0].contentDocument;
    var compasses_info = {};
    compasses_info.s = {};
    compasses_info.s.cx = $("g#compass-s circle", svgDoc).attr("cx");
    compasses_info.s.cy = $("g#compass-s circle", svgDoc).attr("cy");
    compasses_info.m = {};
    compasses_info.m.cx = $("g#compass-m circle", svgDoc).attr("cx");
    compasses_info.m.cy = $("g#compass-m circle", svgDoc).attr("cy");
    compasses_info.l = {};
    compasses_info.l.cx = $("g#compass-l circle", svgDoc).attr("cx");
    compasses_info.l.cy = $("g#compass-l circle", svgDoc).attr("cy");


    if (targetDegree >= 0) {
        $("body").removeClass("newCourse");
        $(".targetdegree").html("<span class='targetNumber'>" + targetDegree + "&deg;</span><br>Course #" + courseIndex + ",  Brick #" + brickIndex + " ( step " + degreeIndex + " )");

        console.log("FIRED");
        console.log(targetDegree);
        $("g#zone", svgDoc).attr({
            "fill-opacity": 1,
        });

        $(".targetdegree").css({
            'background-color': 'white',
            color: 'black'
        })
    } else {

        $("g#zone", svgDoc).attr({
            "fill-opacity": 0,
        });
        $(".targetdegree").html("Course #" + courseIndex + "<br>NEW COURSE");
        $("body").addClass("newCourse");
        $(".targetdegree").css({
            'background-color': 'black',
            color: 'white'
        })
    }
}

ui.setCompassBearing = function(rawbearing) {

    //websocket.sendMessage(rawbearing);

    var bearing = data.calibrateRawBearing(rawbearing);
    $(".degrees.calib .value").text(helpers.roundFloat(bearing, 1));
    $(".degrees.raw .value").text(helpers.roundFloat(rawbearing, 1));

    var svgDoc = $("#compasses")[0].contentDocument;

    var compasses_info = {};
    compasses_info.s = {};
    compasses_info.s.cx = $("g#compass-s circle", svgDoc).attr("cx");
    compasses_info.s.cy = $("g#compass-s circle", svgDoc).attr("cy");
    compasses_info.m = {};
    compasses_info.m.cx = $("g#compass-m circle", svgDoc).attr("cx");
    compasses_info.m.cy = $("g#compass-m circle", svgDoc).attr("cy");
    compasses_info.l = {};
    compasses_info.l.cx = $("g#compass-l circle", svgDoc).attr("cx");
    compasses_info.l.cy = $("g#compass-l circle", svgDoc).attr("cy");

    //console.log(compasses_info);
    $("g#zone", svgDoc).attr({
        transform: "rotate(" + (-1 * data.currentDegree()) + " " + compasses_info.s.cx + " " + compasses_info.s.cy + ")"
    });

    $("g#compass-s", svgDoc).attr({
        transform: "rotate(" + -bearing + " " + compasses_info.s.cx + " " + compasses_info.s.cy + ")"
    });
    $("g#compass-m", svgDoc).attr({
        transform: "rotate(" + -bearing + " " + compasses_info.m.cx + " " + compasses_info.m.cy + ")"
    });
    $("g#compass-l", svgDoc).attr({
        transform: "rotate(" + -bearing + " " + compasses_info.l.cx + " " + compasses_info.l.cy + ")"
    });

    var diff = helpers.angleDiff(bearing, data.currentDegree());
    
    helpers.debugPrint(".debug2", diff);

//    console.log(data.currentDegree()); //bearing);

    if(diff < (angleTolerance / 2)) {
        $(".targetdegree").css("background-color", colorSuccess);
        $(".flexcontainer").css("background-color", colorSuccess);
        $(".nextbutton").css("background-color", colorNextButtonPress);
    } else {
        helpers.debugPrint(".debug", rawbearing + " / " + data.currentDegree() + " / " + diff + " <br>");

        var colorMixed = colorScaleFunction(diff);
        $(".targetdegree").css("background-color", colorNot)
        $(".flexcontainer").css("background-color", colorMixed)
        $(".nextbutton").css("background-color", colorNextButtonDontPress);
    }
}


ui.init = function() {
}

ui.bindEvents = function() {

    $('.degrees.calib, .settingsMenu').on('touchstart click', function(event) {    
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {

            data.calib = data.currentRawBearing;
            //settingsToggle();

            event.handled = true;
        } else {
            return false;
        }

    });

    $('.settings .button').on('touchstart click', function(event) {    
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {

            data.calib = bearing;

            event.handled = true;
        } else {
            return false;
        }

    });


    // button handling

	$(".nextbutton").click(function() {
		data.incrementTargetDegreeIndex(1);
		$(".flashdiv").fadeIn(200).fadeOut(200)
	});

	$(".prevbutton").click(function() {
		data.incrementTargetDegreeIndex(-1);
	});


	$("#qrcode").click(function() {
		$('#qrcode-overlay').html("");
		$('#qrcode-overlay').qrcode(window.location.href);
		$('#qrcode-overlay').fadeIn();
	});
	$("#qrcode-overlay").click(function() {
		$('#qrcode-overlay').fadeOut();
	});

}


