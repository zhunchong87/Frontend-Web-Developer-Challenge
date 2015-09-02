var foodSearchController = angular.module('foodSearchController', []); // Defines an angular module

//*************************
//** Controller Function **
//*************************
foodSearchController.controller('FoodSearchCtrl', function ($scope, $http, $log, $filter, storage, savedFoodStorage, foodAlerts) {
	//$log is used for console log
	//$http is used to communicate with the server 
	//$scope defines the scope of controller
	//$filter is used for common formatting needs
	//storage is used for saving to local storage
	//savedFoodStorage is used for displaying food items on the review page
	//foodAlerts is used for pushing notifications to the navbar view
	
	$scope.foodItems = [];
	$scope.nutritionFactsFlag = [];
	
	//Set this parameter to control how many results are returned for autocomplete and search list
	var limitToNum = 10;
	
	//------------------------------------------//
	//-- Searching and Autocomplete Functions --//
	//------------------------------------------//
	$scope.showLoadingProgress = false;
	
	//Function for searching of food items list
	$scope.search = function (searchFoodText) {
		if (searchFoodText.trim() != '') {
			$scope.showLoadingProgress = true;
			$http.get('https://test.holmusk.com/food/search', {
				params: {
					q: searchFoodText
				}
			}).success(function (data) {
				$scope.showLoadingProgress = false;
				$scope.foodItems = data.slice(0, limitToNum);
				$log.info($scope.foodItems);
			});
		}
	};
	
	//Function for autocomplete, return food item's names
	$scope.getFoodItems = function (val) {
		return $http.get('https://test.holmusk.com/food/search', {
			params: {
				q: val
			}
		}).then(function (response) {
			return response.data.map(function (item) {
				$log.info(item.name);
				return item.name;
			}).slice(0, limitToNum);
		});
	};
	
	//Method for hiding and showing nutrition facts
	$scope.toggleNutritionFacts = function (index) {
		$scope.nutritionFactsFlag[index] = (!$scope.nutritionFactsFlag[index])
	};
	
	//----------------------------//
	//-- Food Logging Functions --//
	//----------------------------//

	//Add new food item and save into local storage
	$scope.addFoodItem = function (index, dateTime, portionSelected) {
		$log.info('Index: ' + index + ' DateTime: ' + dateTime + ' PortionIndex: ' + portionSelected);

		//Prompt the user if date is invalid
		if (dateTime == null) {
			$scope.alerts.push({ type: 'danger', msg: 'Please enter a valid entry date.' });
		}
		else {
			var newSavedFoodItem = angular.copy($scope.foodItems[index]);
		
			//Add logic to retrieve the same item in savedFoodItems array
			formFoodItemsJSON($filter('date')(dateTime, 'fullDate'), newSavedFoodItem, portionSelected);
			
			//Save to local storage
			storage.save(savedFoodStorage.savedFoodKey, JSON.stringify(savedFoodStorage.savedFoodItems));
			
			//Notify user that item have been saved successfully
			foodAlerts.addAlert({ type: 'success', msg: $scope.foodItems[index].name + ' added into database!' });
		}
	};

	//Helper function for checking if the meals are consumed on the same day
	var formFoodItemsJSON = function (datetime, newFoodItem, portionSelected) {		
		//Replace default portion with selected portion
		newFoodItem.portions = portionSelected;
		
		//Loop through current listing of food items and check if there are similar food with same date
		//If food item is log on the same date, add to the existing group
		for (var i = 0; i < savedFoodStorage.savedFoodItems.length; i++) {
			if (savedFoodStorage.savedFoodItems[i].dateTime != datetime)
				continue;
			
			savedFoodStorage.savedFoodItems[i].foodDetails.push(newFoodItem);
			return;
		}
		$log.info(newFoodItem);
		
		savedFoodStorage.savedFoodItems.push({ dateTime: datetime, foodDetails: [newFoodItem] });
	};
	
	//--------------------------//
	//-- Datepicker Functions --//
	//--------------------------//
	
	$scope.today = function () {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	$scope.open = function ($event) {
		$scope.status.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.status = {
		opened: false
	};
});