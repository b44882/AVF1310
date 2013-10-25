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
				console.log("Geolocation Success");
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
			$('<h2>Geolocation</h2>' +
			  '<img id="gmap" src="http://maps.googleapis.com/maps/api/staticmap?&markers=color:red|'+lat+','+lon+'&sensor=false&zoom=12&size=300x250&sensor=false"></img>' +
			  '<ul>' +
			  '<li>Latitude: '          + position.coords.latitude + '</li>' +
			  '<li>Longitude: '         + position.coords.longitude + '</li>' +
			  '<li>Altitude: '          + position.coords.altitude + '</li>' +
			  '<li>Accuracy: '          + position.coords.accuracy + '</li>' +
			  '<li>Altitude Accuracy: ' + position.coords.altitudeAccuracy + '</li>' +
			  '<li>Timestamp: '         + new Date(position.timestamp) + '</li>').appendTo("#result");
		};
		var onError = function(error){
			console.log("Geolocation Error");
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
    		console.log("Weather Success");
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
			console.log("Weather Error");
			$('<h2>Geolocation Error</h2>' +
			  '<ul>' +
			  '<li>Code: '   + error.code + '</li>' +
			  '<li>Message: ' + error.message + '</li>').appendTo("#result");
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true});
	});
	
	//RESEARCH BUTTON//
    $("#research").on("click", function(){
    	console.log("Research Pressed");
		$("#result").empty();
		$('<h2>Discussion 1 - Project Intent</h2>' +
		  '<p>	Social media outlooks like Twitter and Facebook allow it so that you can use information you may already be logged in with to create/sign in to website accounts.  It is fast and convenient when it comes to working with this, allowing users not having to do a whole extra process to log into the services they enjoy.  While you could probably do this for payments as well (aka, logging in with your twitter information you provided to pay for a bill), it may not be the safest route to go for security purposes.<p>' +
		  '<p>	JSON-P, unlike JSON, allows you to communicate with different domains to obtain information.  Great examples would include a phone application that communicates with instagram to filter out certain pictures. <p>' +
		  '<p>	I feel that any data resource that would be excellent for sharing photographs or streaming video services.  For example, an app that allows you to view the livestream of a gamer who has been playing a marathon of a popular game... while the application is grabbing the information via JSON-P to stream videos, there could be lists of pre-existing saved videos, as well as information of their game collection taken from instagram: which also uses JSON-P. </p>' +
		  '<p>	Right now there is a toss up for two applications I would love to work on.  The first would be my education app, which would be a set of Nature Tools called "Swiss Army App.".  This promotes user to get out and explore the world,  with accesss to your camera which would allow you to upload to an instagram/facebook account, as well as access to compass/gps to help navigate through areas.  A second app I would love to develop personally is for any youtube personality looking to expand their audience through a free application.  I love the idea of creating an app that would communicate through youtube and display videos in the application itself.</p>' +
		  '<p>	Simply put:  You need to spend a few hours a day for research, then design and development focuses.  This not only breaks up your work flow, but makes it so that you do not burn out too early during the week.  At the same time, this also prevents you from creating a rushed application the day before.</p>' +
		  '<h2>Discussion 2 - Accessibility</h2>' +
		  '<p>	Right now, the app is simple enough with HTML that not much needs to be changed around.  Of course, as the application becomes more complex, I would want to make sure that the code continues to be easy to read, as well as remains semantically sound.</p>'+
		  '<p>	While not with the various applications themselves, which could be rather expensive, one thing that was mentioned in a video for screen reading is that normal website browsers cannot be used because of the various media that are on the webpages, it makes these tools very hard to use.  One thing to keep in mind with accessibility is perhaps a uniform way (perhaps semantically) to have text not displayed on the page, but still can be read by screen reads to help those visually impaired.</p>'+
		  '<p>	Apple Braile Display: Contains Voiceover, and used with OS X.  Blackberry, with voice control for those that are visually impaired.</p>'+
		  '<p>	Accessibility apps:  Voiceover, which allows the user to navigate between, and interact with, accessible elements in an application. BIG Launcher app which is an android application that displays various android interfaces larger for those that are visually impaired.</p>'+
		  '<h2>Discussion 3 - Industry Research</h2>'+
		  '<p>	If we were to look at the overall top application for all three countries, it would have to be game applications.  As we dig deeper though (top 10), it becomes more broad.</p>' +
		  '<p>	While games still dominate U.S market, the top 10 is sprinkled with utility applications, such as weight loss and image editors. It also is good to mention that the games played are more casual based: they are designed with quick play in mind, and very little time vested.</p>'+
          '<p>	Japan has the same data of games dominance in the top 10, with the same misc apps for music, videos, and weight loss sprinkled in.  The data is different here for Japan games however, as these game require more time vested, including various RPGs as well as former console games such as GTA Vice City. This shows that Japan customers perhaps spend more time with games on their phones then the U.S. Japan also has an interesting demographic in android markets for slot games in the top 2.</p>'+
		  '<p>	In Great Britain shows almost similiar data as Japan and U.S, with games having a heavy dominance.  Great Britain also shows games with more time vested instead of casual games that can be played quickly for their most paid applications.</p>'+
		  '<p>	Above all else though, when we talk about overall highest gross applications, free games with cash shops are dominant in all three markets.</p>'+
		  '<p>In 2008, the average cost per mb was $0.46.  In 2012, the price has dropped dramatically to $0.03.  During these 4 years, an average user would use 149 MB in 2008, while in 2012, that number has skyrocked to over 1GB of data.  It is believe, with the way market is trending, the cost per MB will go down, while data usage skyrockets (up to 3,300+ MB in 2015).  Data caps right now are very high, with USA averaging anywhere from 150gb - 250gb a month, however, with mobile spots on the rise, it is advised to not consider this a big fear.  The point to take here is that as costs continue to drop, and with technology improvement, data usage will rise.  For now, we must mind the limits, and recommend that our application not exceed 50-100mb.</p>'+
		  '<p>Games are a hot item right now, and in the mobile market it is no exception.  Applications which require frequent use are going to be the best path to go.  Games fulfull that requirement, and I believe in a U.S market, releasing something casual and free, with an optional in game market, will generate grossing money overtime.  My suggestion for this would be a simple puzzle game that can be completed anywhere between 2-5 minutes.  On an international scale, however, puzzle games I feel will not suffice.  The international market craves more in there games, and are willing to pay money to do so.  With that being said, something with more depth, such as RPGs are Action/Adventure games with a price tag will work.  I would also recommend a cash shop for these games, but without a big advertising push, as our U.S Markets. </p>'
		  ).appendTo("#result")
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
