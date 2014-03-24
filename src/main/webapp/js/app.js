//Authored by http://www.beijunyi.com on 17th March 2014

var app = angular.module('LHPartners', ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: 'html/home.html',
          controller: 'HomeController'
        }).
        when('/service', {
          templateUrl: 'html/service.html',
          controller: 'ServiceController'
        }).
        when('/contact', {
          templateUrl: 'html/contact.html',
          controller: 'ContactController'
        }).
        otherwise({
          redirectTo: '/home'
        })
    }
  ]
);