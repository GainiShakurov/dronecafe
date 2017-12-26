droneApp.controller('AuthCtrl', function ($scope, $rootScope, $location, mySocket, CurrentUserService, DishesService) {

    mySocket.on('auth_user', function(userData) {
        CurrentUserService.addUser(userData);
        $location.path('/');
    });

    $scope.MySocket = mySocket;

    $scope.submit = function(userData) {

        mySocket.emit('add_user', {
            name: userData.name,
            email: userData.email
        });

    };

});
