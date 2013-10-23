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
    	var pictureSource = navigator.camera.PictureSourceType;
    	    destinationType = navigator.camera.DestinationType
    	    
    	var onPhotoDataSuccess = function(imageData){
    		$('<img src="data:image/jpeg;base64,' + imageData + '"</img>').appendTo("#pictures");
    	};
    	
    	var onFail = function(message) {
    		alert('Failed because: ' + message);
    	}
    	
    	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });

    	

        /*
		var onSuccess = function(imageData) {
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
		}
		var onFail = function(message) {
			alert('Failed because: ' + message);
		}
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });  
		*/
    });
    	
    
    //GEOLOCATION BUTTON//
    $("#geolocation").on("click", function(){
    	console.log("Geolocation Pressed");
    	$("#result").empty();
			var onSuccess = function(position){
			$('<h2>Geolocation</h2>' +
			  '<ul>' +
			  '<li>Latitude: '          + position.coords.latitude + '</li>' +
			  '<li>Longitude: '         + position.coords.longitude + '</li>' +
			  '<li>Altitude: '          + position.coords.altitude + '</li>' +
			  '<li>Accuracy: '          + position.coords.accuracy + '</li>' +
			  '<li>Altitude Accuracy: ' + position.coords.altitudeAccuracy + '</li>' +
			  '<li>Timestamp: '         + new Date(position.timestamp) + '</li>').appendTo("#result");
		};
		var onError = function(error){
			$('<h2>Geolocation Error</h2>' +
			  '<ul>' +
			  '<li>Code: '   + error.code + '</li>' +
			  '<li>Message: ' + error.message + '</li>').appendTo("#result");
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true});
    });
    
    //COMPASS BUTTON//
    $("#compass").on("click", function(){
    	console.log("Compass Pressed");
    	$("#result").empty();
    	var onSuccess = function(heading){
    		$('<h2>Compass</h2>' +
    		  '<ul>' +
    		  '<li>Heading: ' + heading.magneticHeading + '</li>').appendTo("#result");
    	};
    	var onError = function(compassError){
    	    $('<h2>Compass Error</h2>' +
    		  '<ul>' +
    		  '<li>Compass Error: ' + compassError.code + '</li>').appendTo("#result");
    	}
    	navigator.compass.getCurrentHeading(onSuccess, onError);
    });
    
    //ACCELEROMETER BUTTON//
    $("#accelorometer").on("click", function(){
    	console.log("Accelerometer Pressed");
    	$("#result").empty();
    	var onSuccess = function(acceleration){
    		$('<h2>Accelerometer</h2>' +
    		  '<ul>' +
    		  '<li>Accelerator X: ' + acceleration.x + '</li>' +
    		  '<li>Accelerator Y: ' + acceleration.y + '</li>' +
    		  '<li>Accelerator Z: ' + acceleration.z + '</li>').appendTo("#result");
    	};
    	var onError = function(){
    	    $('<h2>Accelerator Error</h2>' +
    		  '<ul>' +
    		  '<li>Accelerator Error: Error! </li>').appendTo("#result");
    	}
    	navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    });
    
    //NOTIFICATION BUTTON//
    $("#notification").on("click", function(){
    	console.log("Notification Pressed");	
		navigator.notification.alert(
			'This is a test notification!',  // message
			function(){},          // callback
			'Test Notification',            // title
			'Close Alert'            // buttonName
		);
    });
    //WEATHER BUTTON//
    $("#weather").on("click", function(){
    	console.log("Weather Pressed");
    	var onSuccess = function(position){
			$("#result").empty();
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			var urlWeather = "http://api.aerisapi.com/observations/closest?p="+lat+","+lon+"&client_id=EorNqRHoewX9y8dwUvGE3&client_secret=pNKAASS4dPHTubEOXvDJe9ijX86wxM0FjPXPygs1";
			$.getJSON(urlWeather, function(info){
				console.log("Received JSON data from Aeris");
				console.log(info);
				var obj = info.response[0];
				$('<h2>Weather</h2>' +
				  '<ul>' +
				  '<li>' + obj.place.name + '</li>' +
				  '<li>' + obj.ob.weather + '</li>' +
				  '<li>' + obj.ob.tempF + 'F</li>').appendTo("#result");
			});
		}
		var onError = function(error){
			$('<h2>Geolocation Error</h2>' +
			  '<ul>' +
			  '<li>Code: '   + error.code + '</li>' +
			  '<li>Message: ' + error.message + '</li>').appendTo("#result");
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true});
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
