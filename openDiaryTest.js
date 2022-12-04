const { assert } = require("console");

assert = chai.assert;

describe ('Testing function createNewDiary of opendiary page', function () {

    var username = 'Admin'

    // test function, giving post data requesting to create a new diary for Admin
    it('Test 1: entering nothing gives an error', function () {

        var diarytitle = ''

        $.post(
            url+"?data="+JSON.stringify({
                'action' : 'createnewdict',
                'diarytitle' : diarytitle, 
                'username' : username
            }),response
        )

        assert.isNotTrue(response['success'], 'gives an error');
    });

    it('Test 2: entering a diary name that already exists gives an error', function () {
        
        var diarytitle = 'Admins Diary'

        $.post(
            url+"?data="+JSON.stringify({
                'action' : 'createnewdict',
                'diarytitle' : diarytitle, 
                'username' : username
            }),response
        )

        assert.isNotTrue(response['success'], 'gives an error');
    });

    it('Test 3: entering a new diary name sends user to diary editing page', function () {
        
        var diarytitle = 'Admins Diary 2'

        $.post(
            url+"?data="+JSON.stringify({
                'action' : 'createnewdict',
                'diarytitle' : diarytitle, 
                'username' : username
            }),response
        )

        assert.isTrue(response['success'], 'redirects user to diary editing page');
    });

})