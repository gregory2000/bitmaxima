//Define an angular module for our app
angular.module('sampleApp', ['ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/AddNewOrder', {
                templateUrl: 'templates/add_order.html',
                controller: 'AddOrderController'
            }).
            when('/ShowOrders', {
                templateUrl: 'templates/show_orders.html',
                controller: 'ShowOrdersController'
            }).
            otherwise({
                redirectTo: '/AddNewOrder'
            });
    }])

.controller('AddOrderController', function($scope) {

    $scope.message = 'This is Add new order screen';

})

.controller('ShowOrdersController', function($scope) {

    $scope.message = 'This is Show orders screen';

});
