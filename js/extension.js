(function() {
  class CandleManagerExtension extends window.Extension {
    constructor() {
      super('Candle-manager-addon');
      this.addMenuEntry('Candle manager');

      this.content = '';
			
      fetch(`/extensions/Candle-manager-addon/views/content.html`)
        .then((res) => res.text())
        .then((text) => {
          this.content = text;
        })
        .catch((e) => console.error('Failed to fetch content:', e));
			
			this.view.innerHTML = this.content;
    }

    show() {
			//console.log("Candle manager received show command.");
			//console.log(this.content);
      this.view.innerHTML = this.content;
			
			
			//var full_lan_path = "http://gateway.local:8686"
			
			var the_protocol = "https://";
			if (location.protocol == 'http:'){
				// If the connection is unsecured, we assume it's a local lan connection, and can simply load the Candle Manager into the iframe. Perhaps a more thorough check would be if `mozilla-iot` is in the URL bar string.
				//the_protocol = "http://";
				document.getElementById('extension-Candle-manager-addon-iframe').src = "http://" + window.location.hostname + ":8686";
			}
			else{
				// If the user is using https and/or the tunneling feature, find out what the actual local IP address is from the controller.
	      window.API.postJson(
	        `/extensions/${this.id}/api/full_lan_path`,
	        {'ssl':1} // Not currently used
	      ).then((body) => {
					//full_lan_path = body['full_lan_path'];
					console.log("API response:");
					console.log(body['full_lan_path']);
					document.getElementById('extension-Candle-manager-addon-iframe').src = body['full_lan_path'];
	      }).catch((e) => {
					var error_string = e.toString();
	        console.log("Error calling API, will try backup option");
					console.log(error_string);
					document.getElementById('extension-Candle-manager-addon-iframe').src = "https://gateway.local:8686";
	      });
				
				
			}
			
    }


		hide(){
	      //console.log("Candle manager received hide command");
				document.getElementById("extension-Candle-manager-addon-view").innerHTML = '';
		}
  }

  new CandleManagerExtension();
  
})();
