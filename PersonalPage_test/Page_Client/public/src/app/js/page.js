/**
 * Created by g42gregory on 1/21/14.
 */
angular.module('page', ['ngRoute', 'ngSanitize'])
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

    .controller('PageCtrl', function($scope, $timeout, $http){


        var futureResponse = $http.get('http://localhost:4000/get_data');

        futureResponse.success(function (data, status, headers, config) {
            $scope.text = data.text;
        });

        futureResponse.error(function (data, status, headers, config) {
            throw new Error('Something went wrong...');
        });

        $scope.items = [0];
        $scope.pageId = 0;
        $scope.itemId = 0;

        $scope.edit_visible = false;
        $scope.div_visible = true;
        $scope.div_onfocus = function() {
        $scope.div_visible = false;
        $scope.edit_visible = true;

            //make edit window focused right away, uses jQuery
            $timeout(function() {
                $('#edit_box').focus();
            }, 0);

        };
        $scope.edit_onblur = function() {
            $scope.edit_visible = false;
            $scope.div_visible = true;
            //alert($scope.text);
            $http.post(
                'http://localhost:4000/save_data',
                {"pageId": $scope.pageId, "itemId": $scope.itemId, "text": $scope.text}
            )
                .then(function(response) {
                    //alert('success');
                },
                function(response) { // optional
                    //alert(response);
                });

        };

    });
