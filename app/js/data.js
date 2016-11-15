data = {};

data.addCourseNegatives = function(degreeData) {
    var currentCourse = 0;
    var newDegreeData = [];

    for (var i = 0; i < degreeData.length; i++) {
        if(currentCourse != degreeData[i][0]) {
            console.log("I think this is a new course " + i + " which is course " + degreeData[i][0] );
            currentCourse = degreeData[i][0];
            newDegreeData.push([currentCourse,-1,-1]);
        } else {
            newDegreeData.push(degreeData[i]);
        }
    }

    return newDegreeData;
}


data.processData = function(d) {
    data.degreeData = $.csv.toArrays(d)
    console.log(data.degreeData);

    data.degreeData = data.addCourseNegatives(data.degreeData);
    data.incrementTargetDegreeIndex(0);
}

data.calibrateRawBearing = function(rawbearing) {
    var bearing = (360 - parseFloat(data.calib) + parseFloat(rawbearing)) % 360;
    return bearing;
}

data.currentDegree = function() {
    if(data.degreeData !== undefined) {
        return data.degreeData[degreeIndex][2];
    } else {
        return -1;
    }
}

data.currentDegreeData = function() {
    if(data.degreeData !== undefined) {
        var dd = data.degreeData[degreeIndex];
        var obj = {}
        obj['courseN'] = dd[0];
        obj['brickN'] = dd[1];
        obj['degree'] = dd[2];
        return obj;
    } else {
        return -1;
    }
}

data.incrementTargetDegreeIndex = function(increment) {
	degreeIndex += increment;

    var thisDD = data.currentDegreeData();

    var courseN = thisDD['courseN'];
    var brickN = thisDD['brickN'];
    var targetDegree = thisDD['degree'];

    brickIndex = brickN;
    courseIndex = courseN;

    ui.updateTargetDegree();
} 


data.setCompassBearing = function(rawbearing) {
    data.currentRawBearing = rawbearing;
    data.currentBearing = data.calibrateRawBearing(rawbearing);
}

data.init = function() {
    data.calib = 0;
}

data.loadData = function(filename) {

    // LOAD FILE

    $.ajax({
        type: "GET",
        url: filename,
        dataType: "text",
        success: function(d) { data.processData(d); }
     });
}
