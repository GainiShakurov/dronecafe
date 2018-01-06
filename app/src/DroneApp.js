var droneApp = angular.module('DroneApp', ['ngRoute', 'btford.socket-io']);

angular.
module('DroneApp')
    .config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider.
            when('/client', {
                templateUrl: 'src/ClientPage/ClientPage.html',
                controller: 'ClientCtrl'
            }).
            when('/menu', {
                templateUrl: 'src/CreateOrderPage/CreateOrderPage.html',
                controller: 'CreateOrderCtrl'
            }).
            when('/', {
                templateUrl: 'src/Auth/Auth.html',
                controller: 'AuthCtrl'
            }).
            when('/kitchen', {
                templateUrl: 'src/KitchenPage/KitchenPage.html',
                controller: 'KitchenPageCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        }
    ])
    .factory('mySocket', function (socketFactory) {
        var myIoSocket = io.connect('http://localhost:3000/');

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket
    });

