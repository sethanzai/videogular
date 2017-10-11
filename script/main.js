	//Define angular module
	var app = angular.module('listApp',[])
	
	app.controller('ListCtrl', function($http, $scope, $window){
		
	var data = $http.get("./videoList.txt")
        .then(function successCallback(response)
              {
                data = response.data;
                var allTextLines = data.split(/\r\n|\n/);
			    var headers = allTextLines[0].split(',');
			    var lines = [];

			    for ( var i = 0; i < allTextLines.length - 1; i++) {
			        // split content based on comma
			        var pdata = allTextLines[i].split(',');
			        if (pdata.length == headers.length) {
			            var tarr = [];
			            for ( var j = 0; j < headers.length; j++) {
			                tarr.push(pdata[j]);
			            }
			            lines.push(tarr);
			        }
			        
			    }
			    $scope.videoData = lines;
              }, function errorCallback(response)
              {
                 alert("Cannot read quote data")
             });
	
	
	
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
		var videoLink = "content/" + ($location.hash());
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
						autoHide: false,
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
                    setTimeout(function(){API.play()}, 1500);
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
	