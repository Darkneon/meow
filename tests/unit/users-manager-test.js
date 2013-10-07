require('should');
var CODES = require('../../codes');
var users_manager = require('../../users-manager');


describe('users-manager.js', function() {
  describe('#signIn()', function() {
    it('should return SUCCESS if user can sign in', function() {
      var expected = CODES.STATUS.SUCCESS;
      var actual   = users_manager.signIn('Darkneon');
      actual.should.equal(expected);
    })

    it ('should return ALREADY_EXISTS if username is already taken', function() {
      var expected = CODES.STATUS.ALREADY_EXISTS;
      var actual;
      actual = users_manager.signIn('Darkneon');
      actual = users_manager.signIn('Darkneon');
      actual.should.equal(expected);
    })
  })
})
