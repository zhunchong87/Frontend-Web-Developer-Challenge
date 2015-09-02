var foodReviewController = angular.module('foodReviewController', []); // Defines an angular module

//*************************
//** Controller Function **
//*************************
foodReviewController.controller('FoodReviewCtrl', function ($scope, $log, $filter, storage, savedFoodStorage, foodAlerts) {
	//$log is used for console log
	//$scope defines the scope of controller
	//$filter is used for common formatting needs
	//storage is used for saving to local storage
	//savedFoodStorage is used for displaying food items on the review page
	//foodAlerts is used for pushing notifications to the navbar view
	
	//-------------------------------//
	//-- View Saved Food Functions --//
	//-------------------------------//
	$scope.savedFoodItems = savedFoodStorage.savedFoodItems;
	
	//Remove food item from local storage
	$scope.removeSavedFoodItem = function (parentIndex, index) {
		$log.info('ParentIndex: ' + parentIndex + ' ChildIndex: ' + index);
		
		var curFoodItem = $scope.savedFoodItems[parentIndex].foodDetails[index].name;		
		
		//Remove food item
		$scope.savedFoodItems[parentIndex].foodDetails.splice(index, 1);		
		
		//Remove food item group (by date) if item is the last on the group
		if ($scope.savedFoodItems[parentIndex].foodDetails.length == 0)
			$scope.savedFoodItems.splice(parentIndex, 1);
		
		//Save new list to local storage
		storage.save(savedFoodStorage.savedFoodKey, JSON.stringify($scope.savedFoodItems));
		
		//Add an alert notification for notifying user that the item have been deleted
		foodAlerts.addAlert({ type: 'success', msg: curFoodItem + ' has successfully been removed.' });
	};
	
	//Show/Hide Nutrition Facts
	$scope.savedNutritionFactsFlag=[];
	$scope.toggleSavedNutritionFacts = function(index){
		$scope.savedNutritionFactsFlag[index] = (!$scope.savedNutritionFactsFlag[index]);
	};
	
	//-----------------------------//
	//-- Angular Chart Functions --//
	//-----------------------------//
	
	//Define the nutritional value listing
	$scope.nutritionList = [
		{ id: 'calories', name: 'Calories (kCal)' },
		{ id: 'protein', name: 'Protein (g)' },
		{ id: 'sodium', name: 'Sodium (mg)' },
		{ id: 'cholesterol', name: 'Cholesterol (mg)' },
		{ id: 'total_fats', name: 'Total Fats (g)' },
		{ id: 'trans', name: 'Trans Fat (g)' },
		{ id: 'polyunsaturated', name: 'Polyunsaturated Fat (g)' },
		{ id: 'monounsaturated', name: 'Monounsaturated Fat (g)' },
		{ id: 'saturated', name: 'Saturated Fat (g)' },
		{ id: 'total_carbs', name: 'Total Carbohydrates (g)' },
		{ id: 'dietary_fibre', name: 'Dietary Fibre (g)' },
		{ id: 'sugar', name: 'Sugar (g)' },
		{ id: 'potassium', name: 'Potassium (mg)' },
	];
	$scope.nutritionSelect = $scope.nutritionList[0];

	//Function to draw the chart
	$scope.updateChart = function () {
		$scope.labels = [];
		$scope.data = [[]];
		$scope.series = [];
		var curDate;
		var curSavedFood;
		var curNutrientData, sumOfNutritionData;

		console.log('Interval: ' + $scope.chartInterval);
		
		$scope.series.push($scope.nutritionSelect.name);
		
		//Iterate through the chart's date interval selected
		for (var i = $scope.chartInterval - 1; i >= 0; i--) {
			curDate = new Date(Date.parse(new Date().toDateString()));
			curDate.setDate(curDate.getDate() - i);
			$log.info('Date: ' + curDate.toDateString());
			
			//Populate labels (x axis)
			$scope.labels.push($filter('date')(curDate, 'EEE dd/MM'));
			
			//Populate data (y axis)
			//Iterate through all the saved food items to find out which ones falls within the date range
			for (var dateIndex = 0; dateIndex < $scope.savedFoodItems.length; dateIndex++) {
				curSavedFood = $scope.savedFoodItems[dateIndex];
				sumOfNutritionData = 0;

				console.log('SavedDate: ' + Date.parse(curSavedFood.dateTime) + ' chartDate: ' + curDate.getTime());
				
				//If date is found, iterate through all the food items inside and sum up the values
				if (Date.parse(curSavedFood.dateTime) == curDate.getTime()) {
					for (var foodIndex = 0; foodIndex < curSavedFood.foodDetails.length; foodIndex++) {
						//Find out which nutritional value is selected
						switch ($scope.nutritionSelect.id) {
							case 'calories':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.calories);
								break;
							case 'protein':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.protein);
								break;
							case 'sodium':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.sodium);
								break;
							case 'cholesterol':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.cholesterol);
								break;
							case 'total_fats':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.total_fats);
								break;
							case 'trans':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.trans);
								break;
							case 'polyunsaturated':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.polyunsaturated);
								break;
							case 'monounsaturated':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.monounsaturated);
								break;
							case 'saturated':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.saturated);
								break;
							case 'total_carbs':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.total_carbs);
								break;
							case 'dietary_fibre':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.dietary_fibre);
								break;
							case 'sugar':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.sugar);
								break;
							case 'potassium':
								curNutrientData = getNutritionValue(curSavedFood.foodDetails[foodIndex].portions.nutrients.important.potassium);
								break;
						}

						console.log('calories: ' + curNutrientData);
						sumOfNutritionData += curNutrientData;
					}
					break;
				}
			}
			console.log('pushing curNutrientData: ' + sumOfNutritionData);
			
			//Push data points to chart
			$scope.data[0].push(sumOfNutritionData);
		}
	};

	//Helper function for computing nutritional values
	var getNutritionValue = function (nutritionObj) {
		if (nutritionObj == null)
			return 0;
		else
			return nutritionObj.value;
	};
	
	//Initialized chart default view
	$scope.chartInterval = 7;
	$scope.updateChart();
});