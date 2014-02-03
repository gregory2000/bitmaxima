'use strict';

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

    /* App Module */

var searchCuratorApp = angular.module('searchCuratorApp', ['placeholderShim']);

searchCuratorApp.controller('SearchInputCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var defaultQuery = "Your name here";
        $scope.selected = []; 
        $scope.insync = false;
		
        $scope.processQuery = function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                $http.get('search?query=' + $scope.query).success(
                    function (data) {
                        $scope.results = jQuery.grep(data, function (item, i) {
                        return (item.link != null);
                    });
                });
            }
        };
		
        $scope.selectResult = function(index) {
            $scope.selected.push($scope.results[index]);
        };

        $scope.syncSelection = function (event) {
            if (!$scope.insync && (event.keyCode == 13 || event.type == "click")) {
                $scope.insync = true;
                console.log($scope.selected);
                $http.post('sync?set=' + $scope.setName, $scope.selected).success(
                    function (data) {
                        $scope.selected = data;
                        $scope.insync = false;
                    });
            }
        };
    }
]);
	
