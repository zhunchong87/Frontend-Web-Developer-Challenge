var foodMainNavController = angular.module('foodMainNavController', []); // Defines an angular module

//*************************
//** Controller Function **
//*************************
foodMainNavController.controller('NavCtrl',function($scope,$log,$location,foodAlerts){
	//$log is used for console log
	//$location is used for determining which page the user is currently on 
	//$scope defines the scope of controller
	//foodAlerts is used for maintaining the scope and removing notifications to the navbar view
	
	//Set mobile navigation panel to collapse on init
	$scope.isCollapsed = true;
	
	//Map to local alert array to control scope
	$scope.alerts = foodAlerts.alerts;
	
	//Toggle collapsing of the mobile responsive navigation panel
	$scope.toggleNavCollapse = function(){
		$scope.isCollapsed = (!$scope.isCollapsed);
	};
	
	//Highlight the current active link on the navbar
	$scope.isActive = function(curLocation){
		$log.info($location.path());
		return $location.path() == curLocation;
	};
	
	//Used for removing alert after allocated timeout
	$scope.closeAlert = function(index){
		foodAlerts.closeAlert(index);
	};
});