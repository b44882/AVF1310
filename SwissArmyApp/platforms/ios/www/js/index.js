/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */ 
 


function onDeviceReady(){
	console.log("Device is ready.");
	
	var urlInst = "https://api.instagram.com/v1/tags/forest/media/recent?callback=?&amp;client_id=3a67c6def88b49ba9e4ef9c497c856ee";
	$.getJSON(urlInst, function(info){
		console.log("Received JSON data from Instagram");
		for(var i=0, j=5; i<j; i++){
			var obj = info.data[i].images.thumbnail.url;
			$('<img class="dump" src="' + obj + '"></img>').appendTo("#instagram_dump");
		};
	});
	
	var urlFlick = "http://api.flickr.com/services/feeds/photos_public.gne?tags=forest&tagmode=any&format=json&jsoncallback=?";
	$.getJSON(urlFlick, function(info){
		console.log("Received JSON data from Flickr");
		for(var i=0, j=5; i<j; i++){
			var obj = info.items[i].media.m;
			$('<img class="dump" src="' + obj + '"></img>').appendTo("#flickr_dump");
		}
	});
	

	

		
	//RELOAD BUTTON//
    $("#reload").on("click", function(){
        window.location.reload();
    });
    
    //CAMERA BUTTON//
    $("#camera").on("click", function(){
    
    });
    
    //GEOLOCATION BUTTON//
    $("#geolocation").on("click", function(){
    		var success = function(position){
			alert('Latitude: '          + position.coords.latitude          + '\n' +
				  'Longitude: '         + position.coords.longitude         + '\n' +
				  'Altitude: '          + position.coords.altitude          + '\n' +
				  'Accuracy: '          + position.coords.accuracy          + '\n' +
				  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				  'Heading: '           + position.coords.heading           + '\n' +
				  'Speed: '             + position.coords.speed             + '\n' +
				  'Timestamp: '         + new Date(position.timestamp)      + '\n');

			};
			var error = function(){
				alert('Error!');
			};
			navigator.geolocation.getCurrentPosition(success, error);
    });
    
    //NOTIFICATION BUTTON//
    $("#notification").on("click", function(){
    	var alertDismissed = function(){};  	
		navigator.notification.alert(
			'This is a test alert!',  // message
			alertDismissed,         // callback
			'Test Alert',            // title
			'Close Alert'                  // buttonName
		);
    });
    
    
};

document.addEventListener("deviceready", onDeviceReady, false);


/*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
*/
