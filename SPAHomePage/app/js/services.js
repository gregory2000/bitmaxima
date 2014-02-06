var homePageServices = angular.module('homePageServices', ['ngResource']);

homePageServices.factory('HomePage', ['$resource',
function ($resource) {
    return $resource('model/:dataset.json', {}, {
        NavSections: { method: 'GET', params: { dataset: 'navSections' }, isArray: true }
    });
}]);