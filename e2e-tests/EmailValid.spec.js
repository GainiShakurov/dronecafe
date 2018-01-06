'use strict';

const expect = require('chai').expect;

describe('Email Validation', function() {

    beforeEach(function() {
        browser.get('#!/');
    });

    it('Email wrong', function() {
        let accName = element(by.id('first_name')).sendKeys('Gaini'),
            accEmail = element(by.id('email')).sendKeys('Gaini');

        var attr = element(by.css('.btn')).getAttribute('disabled');
        expect(attr).eventually.to.equal('true');
    });

    it('Email right', function() {
        let accName = element(by.id('first_name')).sendKeys('Gaini'),
            accEmail = element(by.id('email')).sendKeys('shakurovga@gmail.com');

        var attr = element(by.css('.btn')).getAttribute('disabled');
        expect(attr).eventually.to.be.a('null');
    });

});
