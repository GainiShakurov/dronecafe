var expect = require('chai').expect
    , server = require('../server')
    , io = require('../node_modules/socket.io-client')
    , ioOptions = {
        transports: ['websocket']
        , forceNew: true
        , reconnection: false
    }
    , sender
    , receiver;


describe('Drone events', function () {
    beforeEach(function (done) {

        // connect two io clients
        sender = io('http://localhost:3000/', ioOptions);
        receiver = io('http://localhost:3000/', ioOptions);

        // finish beforeEach setup
        done()
    });
    afterEach(function (done) {

        // disconnect io clients after each test
        sender.disconnect();
        receiver.disconnect();
        done()
    });

    describe('Получение списка текущих заказов для кухни', function () {
        it('Get ordered list', function (done) {
            sender.emit('get_ordered_list_for_kitchen', {});
            receiver.on('get_ordered_list_for_kitchen', function (orders) {
                expect(orders).to.be.an('array');
                orders.forEach(function (order) {
                    expect(order.clientEmail).to.be.a('string');
                    expect(order.dishId).to.be.a('number');
                    expect(order.state).to.be.oneOf(['ordered', 'cooking', 'delivered', 'problems', 'served']);
                });
                done();
            })
        })
    });

    describe('Получение списка готовящихся заказов для кухни', function () {
        it('Get cooking list', function (done) {
            sender.emit('get_cooking_list_for_kitchen', {});
            receiver.on('get_cooking_list_for_kitchen', function (orders) {
                expect(orders).to.be.an('array');
                orders.forEach(function (order) {
                    expect(order.clientEmail).to.be.a('string');
                    expect(order.dishId).to.be.a('number');
                    expect(order.state).to.be.oneOf(['ordered', 'cooking', 'delivered', 'problems', 'served']);
                });
                done();
            })
        })
    });

    describe('Добавление пользователя', function () {
        it('Add user', function (done) {
            sender.emit('add_user', { name: 'name', email: 'name@mail.org' });
            receiver.on('auth_user', function (user) {
                expect(user).to.be.an('object');
                done();
            })
        })
    });

    describe('Получение списка текущих заказов клиента', function () {
        it('Get ordered dishes', function (done) {
            sender.emit('get_ordered_dishes', { email: 'name@mail.org' });
            receiver.on('set_list_ordered_dishes', function (orderData) {
                expect(orderData).to.be.an('array');
                done();
            })
        })
    });

});