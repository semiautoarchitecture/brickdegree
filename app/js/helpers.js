helpers = {};

helpers.debugPrint = function(selector, string) {
	if (DEBUG) {
		$(selector).html(string);
	}
}

helpers.angleDiff = function(angA, angB) {
	var diff = angA - angB;
	diff = Math.abs((diff + 180) % 360 - 180);
	return diff;
}

helpers.getUrlValue = function(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] === VarSearch){
            return KeyValuePair[1];
        }
    }
}

helpers.roundFloat = function(num, decimal) {
    return num.toFixed(decimal);
//    var exp = Math.pow(10, decimal);

//    return Math.round(num * exp) / exp * 1.0;
}


