const express = require("express");
const drone = require('netology-fake-drone-api');
const dbquery = require('./dbquery');

const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (socket) {

    /* Добавление/Авторизация пользователя/Добавление меню в базу */
    socket.on('add_user', function (userData) {
        var p = dbquery
            .findUser(userData);

            p.then(user => io.emit('auth_user', user));
            p.then(user => dbquery.addUser(user))
                .then(user => io.emit('auth_user', user));

    });

    socket.on('add_money', function (userData) {

        dbquery
            .addMoney(userData)
            .then(user => io.emit('add_money', user.money + 100));

    });

    socket.on('add_order', function (orderData) {
        let newBalance = orderData.money - orderData.dishPrice;

        dbquery
            .createOrder(orderData)
            .then(() => dbquery.updateMoney(orderData, newBalance));

    });

    socket.on('get_ordered_dishes', function (orderData) {

        dbquery
            .getClientOrderedList(orderData)
            .then(dishes => io.emit('set_list_ordered_dishes', dishes));

    });

    socket.on('get_ordered_list_for_kitchen', function () {

        dbquery
            .getKitchenOrderedList()
            .then(dishes => io.emit('get_ordered_list_for_kitchen', dishes));

    });

    socket.on('get_cooking_list_for_kitchen', function () {

        dbquery
            .getKitchenCookingList()
            .then(dishes => io.emit('get_cooking_list_for_kitchen', dishes));

    });

    function updateKitchenPage(orderData, state) {

        var p = dbquery
            .setChangeState(orderData, state);

            p.then(() => dbquery.getKitchenOrderedList())
                .then(dishes => io.emit('get_ordered_list_for_kitchen', dishes));
            p.then(() => dbquery.getKitchenCookingList())
                .then(dishes => io.emit('get_cooking_list_for_kitchen', dishes));

    }

    function updateKitchenPageTimeout(orderData, state) {

        var p = dbquery
            .setChangeState(orderData, state);

            p.then(() => dbquery.getKitchenOrderedList())
                .then(dishes => io.emit('get_ordered_list_for_kitchen', dishes));
            p.then(() => dbquery.getKitchenCookingList())
                .then(dishes => io.emit('get_cooking_list_for_kitchen', dishes));
            p.then(() => {
                setTimeout(function () {
                    dbquery.removeOrderFromDb();
                }, 2 * 60 * 1000);
            });

    }

    socket.on('set_cooking', function (orderData) {
        updateKitchenPage(orderData, 'cooking');
    });

    socket.on('set_delivered', function (orderData) {
        updateKitchenPage(orderData, 'delivered');
        drone
            .deliver()
            .then(() => {
                console.log('Доставлено');
                updateKitchenPageTimeout(orderData, 'served');
            })
            .catch(() => {
                console.log('Возникли сложности');
                updateKitchenPageTimeout(orderData, 'problems')

            });

    });

});

