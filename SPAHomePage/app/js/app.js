/* App Module */
'use strict';
var homePageApp = angular.module('homePageApp', ['ui.sortable', 'homePageServices']);

homePageApp.controller('navigationCtrl', ['$scope', 'HomePage',
    function ($scope, HomePage) { 
        /// TODO reconsider putting class names in the object here 
        $scope.menuClasses = ['menu-category', 'menu-item'];
        $scope.navSections = HomePage.getNavSections();

        $scope.sortableOptions = {
            stop: function (e, ui) {
                HomePage.setNavSections($scope.navSections);
            }
        };

        $scope.makeSection = function() {
            return {
                "label": "+ Add a section",
                "level": 0,
                "link": "#"
            };
        };
        
        $scope.newSection = $scope.makeSection();
    }
]).directive('navMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'admin-partials/nav-menu.html'
        /// TODO templateUrl: 'partials/nav-menu.html' if view-only
    };
}).directive('editableMenuItem', ['$timeout', 'HomePage', 
    function ($timeout, HomePage) {
    function preLink(scope, element, attrs) {
        scope.editable = false;

        scope.newSectionBox = function() {
            scope.newSection.label = "";
            scope.editable = true;

            // Angular has solved nothing if I have to do this hack
            // http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
            $timeout(function() {
                element.find('input[type=text]').focus();
            });
        };

        scope.addNewSection = function() {
            scope.navSections.push(scope.newSection);
            HomePage.setNavSections(scope.navSections);
            scope.newSection = scope.makeSection();
            scope.editable = false;
        }
    }

    return {
        restrict: 'A',
        link: { pre: preLink },
        templateUrl: 'admin-partials/editable-menu-item.html'
        //TODO templateUrl: 'partials/nav-menu.html' if view-only
    };
}]);

