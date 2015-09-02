var foodStorageServices = angular.module('foodStorageServices', []); // Defines an angular module

//***************************
//** Local Storage Service **
//***************************
foodStorageServices.factory('storage', function($window){
	return {
		//Save to local storage
		save: function(key,value){
			try{
				if($window.Storage){
					$window.localStorage.setItem(key, value);
					return true;
				}
				else{
					return false;
				}
			}
			catch(error){
				console.error(error, error.message);
				return false;
			}
		},
		//Load from local storage
		load: function(key){
			try{
				if($window.Storage){
					var result = $window.localStorage.getItem(key);
					if(result == null)
						return '[]';
					else
						return result;
				}
				else{
					return false;
				}
			}
			catch(error){
				console.error(error, error.message);
				return false;
			}
		}
	};
});

//********************************
//** Saved Food Storage Service **
//********************************
//Purpose: 
//This is used to maintain the context for the saved food items between the search and review controllers
//
foodStorageServices.factory('savedFoodStorage', function(storage){
	var savedFoodStorage = {savedFoodKey: 'savedFoodItems', savedFoodItems: []};
	
	//Load saved food items from local storage
	savedFoodStorage.savedFoodItems=JSON.parse(storage.load(savedFoodStorage.savedFoodKey));
	console.log(savedFoodStorage.savedFoodItems);
	
	return savedFoodStorage;
});

//********************
//** Alerts Service **
//********************
//Purpose: 
//This is used by the search and review controllers to push alerts to the navbar
//
foodStorageServices.factory('foodAlerts', function(){
	var foodAlertsNotification = {alerts: []};
	
	//Function to add a new alert
	foodAlertsNotification.addAlert = function(alert){
		foodAlertsNotification.alerts.push(alert);
	};
	
	//Function to remove an existing alert
	foodAlertsNotification.closeAlert = function (index) {
		foodAlertsNotification.alerts.splice(index, 1);
	};
	
	return foodAlertsNotification;
});