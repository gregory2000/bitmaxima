/**
 * Created by g42gregory on 1/21/14.
 */
angular.module('page', ['ngRoute', 'ngSanitize', 'summernote'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {templateUrl: 'app/tpls/home.html'})
            .when('/Home', {templateUrl: 'app/tpls/home.html'})
            .when('/Projects', {templateUrl: 'app/tpls/projects.html'})
            .when('/Interests', {templateUrl: 'app/tpls/interests.html'})
            .when('/Contact', {templateUrl: 'app/tpls/contact.html'})
            .when('/CS224N', {templateUrl: 'app/tpls/cs224n.html'})
            .when('/CS224S', {templateUrl: 'app/tpls/cs224s.html'})
            .otherwise({redirectTo: 'app/tpls/home.html'});
    })

    .controller('PageCtrl', function($scope, $timeout, $http){


        var futureResponse = $http.get('http://localhost:4000/get_data');

        futureResponse.success(function (data, status, headers, config) {
            //alert(data[0].text);
            $scope.page0_text = data[0].text;
            $scope.page1_text = data[1].text;
        });

        futureResponse.error(function (data, status, headers, config) {
            throw new Error('Something went wrong...');
        });

        $scope.options = {
            height: 800,
            focus: true,
            codemirror: {
                theme: 'monokai'
            }
            /*
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ]
            */
        };

        $scope.$parent.page0_edit_visible = false;
        $scope.page0_div_visible = true;


        $scope.page0_div_onfocus = function() {
            $scope.$parent.page0_div_visible = false;
            $scope.$parent.page0_edit_visible = true;

            //make edit window focused right away, uses jQuery
            $timeout(function() {
                $('#page0_edit').focus();
            }, 5);

        }

        $scope.page0_edit_onblur = function() {
            //$scope.$parent.page0_edit_visible = false;
            //$scope.page0_div_visible = true;
            //alert('blur: '+ $scope);
            $http.post(
                'http://localhost:4000/save_data',
                {"pageId": 0, "itemId": 0, "text": $scope.page0_text}
            )
                .then(function(response) {
                    //alert('success');
                },
                function(response) { // optional
                    //alert(response);
                });

        }


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
                {"pageId": 1, "itemId": 0, "text": $scope.page1_text}
            )
                .then(function(response) {
                    //alert('success');
                },
                function(response) { // optional
                    //alert(response);
                });

        };

    });
