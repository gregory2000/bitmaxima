'use strict';

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

    /* App Module */

var searchCuratorApp = angular.module('searchCuratorApp', [])
    .directive('contenteditable', function() {
		return {
			restrict: 'A', // only activate on element attribute
			require: '?ngModel', // get a hold of NgModelController
			link: 
			function(scope, element, attrs, ngModel) {
                // do nothing if no ng-model
				if(!ngModel) return; console.log(scope);
     
				// Specify how UI should be updated
				ngModel.$render = function() {
					element.html(ngModel.$viewValue || '');
				};
     
				// Listen for change events to enable binding
				element.on('blur keyup change', function(event) {
					scope.$apply(read);
				});
				
				read(); // initialize
     
				// Write data to the model
				function read() {
					console.log(scope.query);
					// If plain-text attribute is provided, we only take text
					if( attrs.plainText ) {
						var html = element.text().trim() || scope.query;
						html += "";
					}
                    else {
                        var html = element.html(); 
                    }
					ngModel.$setViewValue(html + " ");
				}
			}
		};
	});

searchCuratorApp.controller('SearchInputCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var defaultQuery = "Your name here";
        $scope.selected = []; 
        $scope.insync = false;
        $scope.query = defaultQuery;
		
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
        }
		
		$scope.displayQuery = function () {
			if ($scope.query
				&& $scope.query.trim() !== defaultQuery) {
					return $scope.query;
				}
			return " ";
		}

        $scope.selectResult = function(index) {
            $scope.selected.push($scope.results[index]);
        }

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
        }
    }
]);
	
