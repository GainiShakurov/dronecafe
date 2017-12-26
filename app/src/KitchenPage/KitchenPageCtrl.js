droneApp.controller('KitchenPageCtrl', function ($scope, DishesService, mySocket) {

    mySocket.emit('get_ordered_list_for_kitchen', {});

    mySocket.emit('get_cooking_list_for_kitchen', {});

    mySocket.on('get_ordered_list_for_kitchen', function (orderData) {
        $scope.kitchenOrderData = [];
        console.log(orderData);
        $scope.kitchenOrderData = DishesService.getOrderedDishes(orderData);
    });

    mySocket.on('get_cooking_list_for_kitchen', function (orderData) {
        $scope.kitchenCookingData = [];
        console.log(orderData);
        $scope.kitchenCookingData = DishesService.getOrderedDishes(orderData);
    });

    $scope.setCooking = function (orderData) {
        mySocket.emit('set_cooking', orderData);
    };

    $scope.setDelivered = function (orderData) {
        mySocket.emit('set_delivered', orderData);
    };

});
