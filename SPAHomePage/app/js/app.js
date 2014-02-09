/* App Module */
'use strict';
var homePageApp = angular.module('homePageApp', ['ui.sortable', 'ngResource']);

homePageApp.factory('Navigation', ['$resource',
    function ($resource) {
        return $resource('model/:user/navSections', {user: 'boyd'});
    }
]);

homePageApp.controller('navigationCtrl', ['$scope', 'Navigation',
    function ($scope, Navigation) { 
        /// TODO reconsider putting class names in the object here 
        $scope.menuClasses = {0:'menu-category', 1:'menu-item', 999:'menu-new'};
        $scope.newSectionLevel = 999;
        
        $scope.makeSection = function() {
            return {
                "label": "+ Add a section",
                "level": $scope.newSectionLevel,
                "editable": false,
                "link": "#"
            };
        };
    
        function navQueryCallback() { 
            $scope.navSections = [];
            for (var i in sections) {
                if(!sections[i].label)
                    continue;

                sections[i].editable = false;
                $scope.navSections.push(sections[i]);
            }
            $scope.navSections.push($scope.makeSection())
        };

        var sections = Navigation.query(navQueryCallback);

        $scope.sortableOptions = {
            stop: function (e, ui) {
                Navigation.set($scope.navSections);
            }
        };
        
    }
]).directive('navMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'admin-partials/nav-menu.html'
        /// TODO templateUrl: 'partials/nav-menu.html' if view-only
    };
}).directive('editableMenuItem', ['$timeout', 'Navigation', 
    function ($timeout, Navigation) {
    function preLink(scope, element, attrs) {
        
        scope.inPlaceEdit = function(index) {
            var section = scope.navSections[index];
            if(section.level == scope.newSectionLevel) {
                section.level = 0;
                section.label = "";
            }
            section.editable = true;

            // Angular has solved nothing if I have to do this hack
            // http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
            $timeout(function() {
                element.find('input[type=text]').focus();
            });
        };

        scope.updateSection = function(index) {
            console.log(scope.navSections);
            scope.navSections[index].editable = false;
            Navigation.save(scope.navSections);
            scope.navSections.push(scope.makeSection());
        }
    }

    return {
        restrict: 'A',
        link: { pre: preLink },
        templateUrl: 'admin-partials/editable-menu-item.html'
        //TODO templateUrl: 'partials/nav-menu.html' if view-only
    };
}]);

