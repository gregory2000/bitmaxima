/**
 * Created by g42gregory on 1/21/14.
 */
angular.module('page', ['ngRoute', 'ngSanitize', 'summernote'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {templateUrl: 'tpls/home.html'})
            .when('/Home', {templateUrl: 'tpls/home.html'})
            .when('/Career', {templateUrl: 'tpls/career.html'})
            .when('/Bio', {templateUrl: 'tpls/bio.html'})
            .when('/Contact', {templateUrl: 'tpls/contact.html'})
            .when('/CS224N', {templateUrl: 'tpls/cs224n.html'})
            .when('/CS224S', {templateUrl: 'tpls/cs224s.html'})
            .otherwise({redirectTo: 'tpls/home.html'});
    })

    .controller('PageCtrl', function($scope, $timeout, $http){


        var futureResponse = $http.get('http://localhost:4000/get_data');

        futureResponse.success(function (data, status, headers, config) {
            //alert(data[0].text);
            $scope.text = data[0].text;
        });

        futureResponse.error(function (data, status, headers, config) {
            throw new Error('Something went wrong...');
        });


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
            }, 5);

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
