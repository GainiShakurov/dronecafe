'use strict';

const expect = require('chai').expect;

describe('Add Dish test', function() {

    let countOrdered,
        countAfterAdd;

    beforeEach(function() {
        browser.get('#!/auth');
        element(by.id('first_name')).sendKeys('Gaini');
        element(by.id('email')).sendKeys('shakurovga@gmail.com');
        element(by.css('.btn')).click();

        element.all(by.css('.collection-item')).count().then(function(count) {
            countOrdered = count;
        });
        element(by.css('.btn-to-addpage')).click();
    });

    it('Add Dish worked', function() {
        countOrdered = countOrdered + 1;

        console.log('countOrdered', countOrdered);

        element.all(by.css('.btn-adddish')).first().click();

        element.all(by.css('.collection-item')).count().then(function() {
            countAfterAdd = count;
        });


        console.log('countAfterAdd', countAfterAdd);
        expect(countOrdered).eventually.to.equal(countAfterAdd);

    });

});
