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
	
    $("#reload").on("click", function(){
        window.location.reload();
    });
};

document.addEventListener("deviceready", onDeviceReady, false);

