/* App Module */
'use strict';
var homePageApp = angular.module('homePageApp', ['ui.sortable', 'homePageServices']);

homePageApp.controller('navigationCtrl', ['$scope', 'HomePage',
    function ($scope, HomePage) { 
        $scope.navSections = HomePage.NavSections();
        $scope.menuState = 'locked';
    }
]).directive('shNavMenu', function () {
    
        //$scope.sortableOptions = {
        //    stop: function (e, ui) {
        //        //TODO sync to db
        //        console.log($scope.navSections);
        //    }
        //};

    function link(scope, element, attrs) {
        //element.attr('contenteditable', true);
        //element.attr('ui-sortable', true);
        
        scope.$watch('menuState', function(newValue, oldValue) {
            //TODO disallow new lines here, another directive?
            //make it a growing input instead of content-editable, model does not get updated
            switch(scope.menuState)
            {
                case "locked":
                    console.log(scope.navSections);    
                    element.children('.menu-item').attr('contenteditable', false);
                    break;
                case "edit":    
                    element.children('.menu-item').attr('contenteditable', true);
                    break;
                case "sort":    
                    element.children('.menu-item').attr('contenteditable', false);
                    break;
                default:
                    console.log("oops!");
            }
        });
    }

    return {
        restrict: 'E',
        link: { post: link },
        templateUrl: 'partials/nav-menu.html'
    };
});
