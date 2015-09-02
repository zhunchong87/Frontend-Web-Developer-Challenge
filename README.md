# Frontend-Web-Developer-Challenge
Name: Tay Zhun Chong
Email: zhunchong87@gmail.com
Contact Number: 91825687

### Libraries used
* UI Bootstrap (https://github.com/angular-ui/bootstrap)
* Angular Chart (https://github.com/jtblin/angular-chart.js)

###The Challenge
#### General
* Responsive UI - Able to work on both PC and mobile devices

#### Meal Logger
* Autocomplete Search
  * Nutritional value of each food item is displayed
  * Limit search results to 10 items only
  * Both search listing and autocomplete uses web API hosted at https://test.holmusk.com/food/search?q=food_search_query
* Date Picker
  * User is able to log the meal by searching for the food item and select a date of entry
  * Food items logged on the same day will be group together

#### Review Past Diet History
* Nutritional Trend
  * User is able to review his/her past diet intake by observing the different nutritional input from the meals taken
  * User is able to view the trend over the past week/month
* Detailed Past Diet History
  * User is able to review their past diet history, grouped by date

###Things for Improvement
* Add multiple user support by adding login mechanism.
* Store user's information on the database, currently storage is dependent on the device since it is stored on the local storage.
* Improve the charting feature by adding more indicators that will aid in visualizing the user's past diet intake. For example, by using radar charts, user is able to have a better overall picture on which nutritional values are they consuming more.