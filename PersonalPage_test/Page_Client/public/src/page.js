/**
 * Created by g42gregory on 1/21/14.
 */
angular.module('page', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/Home', {templateUrl: 'home.html'})
            .when('/Career', {templateUrl: 'career.html'})
            .when('/Bio', {templateUrl: 'bio.html'})
            .when('/Contact', {templateUrl: 'contact.html'})
            .when('/CS224N', {templateUrl: 'cs224n.html'})
            .when('/CS224S', {templateUrl: 'cs224s.html'})
            .otherwise({redirectTo: 'home.html'});
    })
    .controller('PageCtrl', function($scope){

    });
