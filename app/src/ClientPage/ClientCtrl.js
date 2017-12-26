droneApp.controller('ClientCtrl', function($scope, $rootScope, mySocket, CurrentUserService, DishesService, $location) {

    $scope.userdata = CurrentUserService.getUser();

    if ($.isEmptyObject($scope.userdata)) {
        $location.path('/auth');
    }

    mySocket.on('add_money', function(userData) {
        $scope.userdata.money = userData;
    });

    $scope.addMoney = function(userData) {
        mySocket.emit('add_money', {
            email: $scope.userdata.email
        });
    };

    mySocket.emit('get_ordered_dishes', {
        email: $scope.userdata.email
    });

    mySocket.on('set_list_ordered_dishes', function(orderData) {
        $scope.alldishes = DishesService.getDishes();
        $scope.orderdata = [];
        $scope.orderdata = DishesService.getOrderedDishes(orderData);
    });



});
