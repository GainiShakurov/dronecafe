angular
    .module('DroneApp')
    .filter('stateTransl', function () {
        return function (input) {
            switch (input) {
                case "ordered":
                    transl = "Заказано";
                    break;
                case "cooking":
                    transl = "Готовится";
                    break;
                case "delivered":
                    transl = "Доставляется";
                    break;
                case "problems":
                    transl = "Возникли сложности";
                    break;
                default:
                    transl = "Подано";
            }
            return transl;
        }
    });