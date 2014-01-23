/**
 * Created by g42gregory on 1/21/14.
 */
angular.module('page', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {templateUrl: 'app/tpls/home.html'})
            .when('/Home', {templateUrl: 'app/tpls/home.html'})
            .when('/Career', {templateUrl: 'app/tpls/career.html'})
            .when('/Bio', {templateUrl: 'app/tpls/bio.html'})
            .when('/Contact', {templateUrl: 'app/tpls/contact.html'})
            .when('/CS224N', {templateUrl: 'app/tpls/cs224n.html'})
            .when('/CS224S', {templateUrl: 'app/tpls/cs224s.html'})
            .otherwise({redirectTo: 'app/tpls/home.html'});
    })

    .controller('PageCtrl', function($scope, $timeout){
        $scope.text = 'Click to add text';
        $scope.edit_visible = false;
        $scope.div_visible = true;
        $scope.div_onfocus = function() {
            $scope.div_visible = false;
            $scope.edit_visible = true;

            //make edit window focused right away
            $timeout(function() {
                $('#edit_box').focus();
            }, 0);

        };
        $scope.edit_onblur = function() {
            $scope.edit_visible = false;
            $scope.div_visible = true;
        };
    });
