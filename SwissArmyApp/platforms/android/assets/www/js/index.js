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
    
    //CLOSE BUTTON//
    $("#close").on("click", function(){
        navigator.app.exitApp();
    });
    
    //CAMERA BUTTON//
    $("#camera").on("click", function(){
    	console.log("Camera Pressed");
		var onSuccess = function(imageData) {
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
		}
		var onFail = function(message) {
			alert('Failed because: ' + message);
		}
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });  
    });
    
    //GEOLOCATION BUTTON//
    $("#geolocation").on("click", function(){
    	console.log("Geolocation Pressed");
    	$("#geo_result").empty();
		var success = function(position){
		$('<ul>' +
		  '<li>Latitude: '          + position.coords.latitude + '</li>' +
		  '<li>Longitude: '         + position.coords.longitude + '</li>' +
		  '<li>Altitude: '          + position.coords.altitude + '</li>' +
		  '<li>Accuracy: '          + position.coords.accuracy + '</li>' +
		  '<li>Altitude Accuracy: ' + position.coords.altitudeAccuracy + '</li>' +
		  '<li>Timestamp: '         + new Date(position.timestamp) + '</li>').appendTo("#geo_result");
		};
		var error = function(error){
			$('<p>Code: '   + error.code + '</p>' +
			  '<p>Message: ' + error.message + '</p>').appendTo("#geo_result");
		};
		navigator.geolocation.getCurrentPosition(success, error);
    });
    
    //NOTIFICATION BUTTON//
    $("#notification").on("click", function(){
    	console.log("Notification Pressed");
    	var alertDismissed = function(){};  	
		navigator.notification.alert(
			'This is a test alert!',  // message
			alertDismissed(),          // callback
			'Test Alert',            // title
			'Close Alert'            // buttonName
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
