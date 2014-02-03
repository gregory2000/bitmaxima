/* App Module */
'use strict';
var homePageApp = angular.module('homePageApp', ['ui.sortable']);

homePageApp.controller('navigationCtrl', ['$scope', '$http',
    function ($scope, $http) { 
        // TODO Connect to db
        $scope.navSections = [
            'Bio', 'Publications', 'Teaching Assistant', 
            'Course Work', 'Side projects', 'Lectures', 
            'Personal'
        ];

        $scope.sortableOptions = {
            stop: function (e, ui) {
                console.log($scope.navSections);
            }
        };
    }
]);
