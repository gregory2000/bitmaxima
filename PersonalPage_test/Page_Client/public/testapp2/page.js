angular.module('page', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/list', {templateUrl: 'list.html'})
            .when('/new', {templateUrl: 'new.html'})
            .otherwise({redirectTo: 'list.html'});

        $locationProvider.html5Mode(true);
    });

