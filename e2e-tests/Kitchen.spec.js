'use strict';

const expect = require('chai').expect;

describe('Kitchen Page', function() {

    let countOrdered,
        countReady,
        updcountOrdered,
        updcountReady;

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

        console.log('countOrdered', countOrdered);

        element.all(by.repeater('order in kitchenOrderData')).count().then(function(count) {
            updcountOrdered = count;
        });

        console.log('updcountOrdered', updcountOrdered);


        expect(updcountOrdered + 1).eventually.to.equal(countOrdered);

    });

});
