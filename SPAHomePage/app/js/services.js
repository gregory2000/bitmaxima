var homePageServices = angular.module('homePageServices', ['ngResource']);

homePageServices.factory('HomePage', ['$resource',
function ($resource) {
    return $resource('model/:dataset.json', {}, {
        getNavSections: { method: 'GET', params: { dataset: 'navSections' }, isArray: true },
        /// TODO save to db
        setNavSections: { method: 'POST', params: { dataset: 'navSections' }}
    });
}]);