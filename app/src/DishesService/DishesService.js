angular
    .module('DroneApp')
    .service('DishesService', function ($http, $q) {

        var dishInfo = [];

        function getMenu() {
            var deferred = $q.defer();
            $http.get('/menu.json').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }



        var getDishes = function () {
            return getMenu();
        };

        var getOrderedDishes = function (orderedDishes) {
            var currentDish = [];
            getMenu().then(dishes => {
                orderedDishes.forEach(function (item, i, arr) {
                    var dishFullData = dishes.filter(function(dish) {
                        return dish.id == item.dishId
                    });

                    currentDish[i] = item;
                    currentDish[i]['dish'] = dishFullData.shift();
                });
            });
            return currentDish;
        };

        return {
            getDishes,
            getOrderedDishes
        };
    });
