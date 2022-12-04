const { assert } = require("console");

assert = chai.assert;

describe ('Testing function indexlogin of index page', function () {

    // test function, giving post data requesting to login for Admin
    it('Test 1: entering nothing gives an error', function () {
        
        $("#passwordlog").val() = ''

        $.post(
            url+'?data='+JSON.stringify({
                'action' : 'login',
                'username' : '',
                'password' : $("#passwordlog").val()
            }),response
        )
        
        assert.isNotTrue(response['success'], 'gives an error');
    });

    it('Test 2: entering a wrong username gives an error', function () {
        
        var username = 'Adimn'

        $.post(
            url+'?data='+JSON.stringify({
                'action' : 'login',
                'username' : username,
                'password' : $("#passwordlog").val()
            }),response
        )

        assert.isNotTrue(response['success'], 'gives an error');
    });

    it('Test 3: entering a wrong password gives an error', function () {
        
        var username = 'Admin'
        $("#passwordlog").val() = 'rott'

        $.post(
            url+'?data='+JSON.stringify({
                'action' : 'login',
                'username' : username,
                'password' : $("#passwordlog").val()
            }),response
        )

        assert.isNotTrue(response['success'], 'gives an error');
    });

    it('Test 4: entering the correct set of username and password sends user to diary select page', function () {
        
        var username = 'Admin'

        $.post(
            url+'?data='+JSON.stringify({
                'action' : 'login',
                'username' : username,
                'password' : $("#passwordlog").val()
            }),response
        )

        assert.isTrue(response['success'], 'redirects user to diary select webpage');
    });

})