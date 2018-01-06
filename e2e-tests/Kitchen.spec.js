'use strict';

const expect = require('chai').expect;

describe('Kitchen Page', function() {

    let countOrdered,
        countReady,
        updCountOrdered,
        updCountReady;

    beforeEach(function() {
        browser.get('#!/kitchen');

        element.all(by.repeater('order in kitchenOrderData')).count().then(function(count) {
            countOrdered = count;
        });
        element.all(by.repeater('order in kitchenCookingData')).count().then(function(count) {
            countReady = count;
        });

        element(by.css('.btn-orderdata')).click();

    });

    it('Ordered click', function() {
        browser.get('#!/kitchen');

        let list = element.all(by.repeater('order in kitchenOrderData'));

        expect(list.count()).eventually.to.equal(countOrdered - 1);
    });

    it('Cooking click', function() {
        browser.get('#!/kitchen');

        let list = element.all(by.repeater('order in kitchenCookingData'));

        expect(list.count()).eventually.to.equal(countReady + 1);
    });

});
