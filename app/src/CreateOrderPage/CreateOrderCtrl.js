droneApp.controller('CreateOrderCtrl', function($scope, mySocket, CurrentUserService, DishesService) {

    $scope.dishes = [];
    $scope.userdata = CurrentUserService.getUser();

    DishesService.getDishes().then(dishes => {
        $scope.dishes = dishes;
        $scope.dishes.forEach(function (item) {
            item.ingredients = item.ingredients.toString();
        });
    });



    $scope.addDish = function(dish) {
        mySocket.emit('add_order', {
            dishId: dish.id,
            email: $scope.userdata.email,
            money: $scope.userdata.money,
            dishPrice: dish.price
        });

        var changedUserData = {
            name: $scope.userdata.name,
            email: $scope.userdata.email,
            money: $scope.userdata.money - dish.price
        };

        CurrentUserService.addUser(changedUserData);

        mySocket.emit('get_ordered_list_for_kitchen', {});

    };


});
