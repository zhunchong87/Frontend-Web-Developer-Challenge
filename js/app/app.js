var foodLoggingApp = angular.module('foodLoggingApp', ['ui.bootstrap','ngAnimate','ngRoute','chart.js','foodStorageServices','foodMainNavController','foodSearchController','foodReviewController']); // Defines an angular module

//Define my routes here
foodLoggingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/searchfood', {
        templateUrl: 'pages/foodSearch.html',
        controller: 'FoodSearchCtrl'
      }).
      when('/viewsavedfood', {
        templateUrl: 'pages/foodReview.html',
        controller: 'FoodReviewCtrl'
      }).
      otherwise({
        redirectTo: '/searchfood'
      });
  }]);