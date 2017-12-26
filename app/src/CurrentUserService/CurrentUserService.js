angular
    .module('DroneApp')
    .service('CurrentUserService', function () {
        var userInfo = {};

        var addUser = function (newObj) {
            userInfo = newObj;
        };

        var getUser = function () {
            return userInfo;
        };

        return {
            addUser,
            getUser
        };
    });
