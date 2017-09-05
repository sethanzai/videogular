	//Define angular module
	var app = angular.module('listApp',[])
	
	app.controller('ListCtrl', function($scope, $window){
		
	//If data array needs to be obtained, use below:
	//////////////////////
	/*
	var data = $http.get("{path to JSON data}")
        .then(function successCallback(response)
              {
                data = response;
              }, function errorCallback(response)
              {
                 alert("Cannot read quote data")
             });
	};
	//////////////////////
	*/
	
	//For demo purpose, local file has been hard-coded:
	var data = [
	{id: 0, fileName : "Tea Cup", link: "content/343647377.mp4"},	
	{id: 1, fileName : "Earth Zoom", link: "content/Earth_Zoom_In.mov"},
	{id: 2, fileName : "WRK Sign 1", link: "content/wrksign.m4v"},
	{id: 3, fileName : "WRK Sign 2", link: "content/wrksign2.m4v"}
	]
	
	//Place in $scope
	$scope.videoData = data;
	
	//Passing the data in parameter
	$scope.passData = function(video){
	var redirectUrl = "/video.html#" + video
	$window.location.href = redirectUrl;
	}
	
	});
	
	//Define Videogular app with injector
	var videogularApp = angular.module('videoApp',[
		"ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls"
	])
	
	//This is needed to read parameter after hash
	videogularApp.config(['$locationProvider', function($locationProvider) {
     $locationProvider.html5Mode(true);
	}]);
	
	//Videogular controller with custom button
		videogularApp.controller('PlayCtrl',
		["$sce","$location", function ($sce, $location) {
		var videoLink = $location.hash();
			this.config = {
				preload: "none",
				sources: [
					{src: $sce.trustAsResourceUrl(videoLink), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl(videoLink), type: "video/webm"},
					{src: $sce.trustAsResourceUrl(videoLink), type: "video/ogg"}
				],
				tracks: [
					{
						src: "pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: {
          url: "https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css"
				},
				plugins: {
					controls: {
						autoHide: false
					}
				}
			};
		}]
	)
	.directive("myStopButton",
		function() {
			return {
                restrict: "E",
                require: "^videogular",
                template: "<div id='stopButton' class='iconButton' ng-click='API.stop()'>STOP</div>",
                link: function(scope, elem, attrs, API) {
                    scope.API = API;
                }
			}
		}
	);
	
	//Control for custom stop button and go back in browser
	videogularApp.controller('StopCtrl', function($scope, $window){
	$scope.stop = function(){
	setTimeout(function(){document.getElementById("stopButton").click()}, 100)
	$window.history.back();
	}
	})
	