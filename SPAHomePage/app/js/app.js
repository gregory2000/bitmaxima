/* App Module */
'use strict';
var homePageApp = angular.module('homePageApp', ['ui.sortable', 'ngRoute', 'ngResource']);

homePageApp
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/build', {
                templateUrl: 'partials/build-user.html'
            })
            .when('/:username', {
                templateUrl: 'partials/show-user.html'
            })
            .when('/:username/:page', {
                templateUrl: 'partials/show-page.html'
            })
    }
])
.factory('Navigation', ['$resource',
    function ($resource) {
        var navResource = $resource('model/:user/navSections');
        var navSections = [];

        return {
            newSectionLevel : 999,
            query:  
                function(input, callback) {
                    if(input.user) {
                        navSections = navResource.query(input, callback);
                    }
                    else {
                        callback(navSections);
                    }
                },
            update:   
                function(input, data, callback) {
                    return navResource.save(input, data, callback); 
                },
            addSection: 
                function(label,level) {
                    var section = {
                        "label" : isdef(label) ? label : "+ Add a section",
                        "level" : isdef(level) ? level : this.newSectionLevel,
                        "link"  : isdef(label) ? '#/' + label.urlify() : "#",
                        "editable": false,
                    };
                    navSections.push(section);
                }
        };
    }
])
.factory('Github', ['$resource',
    function ($resource) {
        return $resource('model/github/:githubuser');
    }
])
.controller('userBuildCtrl', ['$scope', '$routeParams', 'Github', 'Navigation', 
    function (scope, $routeParams, Github, Navigation) { 
        scope.githubInput = false;

        scope.githubMe = function() {
            var githubViewBuilder = function() {
                scope.githubInput = true;
                scope.user = userInfo;

                Navigation.addSection(userInfo.fullName, 0);
                Navigation.addSection("Home", 1);
                Navigation.addSection("Projects", 0);
                userInfo.repos.forEach(function(repo){
                    Navigation.addSection(repo.name, 1);
                });

            };

            var userInfo = Github.get({githubuser: scope.githubuser}, githubViewBuilder);
        };
    }
])
.controller('navigationCtrl', ['$scope', '$routeParams', 'Navigation',
    function (scope, $routeParams, Navigation) { 
        /// TODO reconsider putting class names in the object here 
        scope.menuClasses = {0:'menu-category', 1:'menu-item', 999:'menu-new'};
        scope.username = $routeParams.username;
        
        scope.navControlRefresh = function () { 
            var lastItem = scope.navSections.last();
            if(!lastItem || lastItem.level !== Navigation.newSectionLevel)
                Navigation.addSection();
        };

        scope.navQueryCallback = function (sections) { 
            scope.navSections = sections;
            scope.navControlRefresh();
        };

        Navigation.query({user: scope.username}, scope.navQueryCallback);

        scope.sortableOptions = {
            stop: function (e, ui) {
                Navigation.update({user: scope.username}, scope.navSections, scope.navControlRefresh);
            }
        };
    }
]).directive('navMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'admin-partials/nav-menu.html'
        /// TODO templateUrl: 'partials/nav-menu.html' if view-only
    };
}).directive('editableMenuItem', ['$timeout', 'Navigation', 
    function ($timeout, Navigation) {
        function preLink(scope, element, attrs) {
        
            scope.inPlaceEdit = function(index, event) {
                event.preventDefault();
                var section = scope.navSections[index];
                if(section.level == Navigation.newSectionLevel) {
                    section.level = 0;
                    section.label = "";
                }
                section.editable = true;

                // Angular has solved nothing if I have to do this hack
                // http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
                $timeout(function() {
                    element.find('input[type=text]').focus();
                });
            };

            scope.updateSection = function(index, event) {
                event.preventDefault();
                scope.navSections[index].editable = false;
                Navigation.update({user: scope.username}, scope.navSections, scope.navControlRefresh);
                return false;
            }

            scope.deleteSection = function(index) {
                scope.navSections.remove(index);
                Navigation.update({user: scope.username}, scope.navSections, scope.navControlRefresh);
            }
        }

        return {
            restrict: 'A',
            link: { pre: preLink },
            templateUrl: 'admin-partials/editable-menu-item.html'
            //TODO templateUrl: 'partials/nav-menu.html' if view-only
        };
    }
])
.directive('editableBioPage', function () {
        return {
            restrict: 'E',
            templateUrl: 'admin-partials/editable-bio-page.html'
        };
    }
);
