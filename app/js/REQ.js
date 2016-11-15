// borrowed from http://lab.bengesht.ir/TouchX/js/REQ.js
//
function REQ()
{
	this.isSending = false;
	this.isChange = false;
	
	this.url = false;
	this.obj = false;

    this.timeDelay = 1000;
    this.lastSent = new Date();
}



REQ.prototype.setObj = function(obj)
{
	this.obj = obj;
	this.isChange = true;
	this.send();
};




REQ.prototype.getObj = function() {
	return this.obj;
};




REQ.prototype.send = function() {

	if(!this.url)	{
    } else if(!this.isSending && this.isChange && this.notTooRecent()) {
        console.log("sendingWithjQuery");
		jQuery.get(this.url,this.getObj())
			.fail(this.getOnFail)
			.success(this.getOnSuccess);
		
//		this.isChange = false;
//		this.isSending = true;
        this.lastSent = new Date();
	}
};




REQ.prototype.getOnFail = function()
{	
	this.isChange = true;
	this.isSending = false;
	
	setTimeout(this.send, 50);
};

REQ.prototype.getOnSuccess = function(result)
{
    console.log(result);
};

REQ.prototype.notTooRecent = function() {
    if(new Date() - this.lastSent > this.timeDelay) {
        return true;
    } else {
        return false;
    }
}

