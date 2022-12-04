const { assert } = require("console");

assert = chai.assert;

describe ('Testing server functionality', function () {

    // make 1000 users
    it('Test 1: Create 1000 users', function(){

        var successUserCreate = true;

        // call createNewAccount(), create 1000 uniquely named users
        for (i = 0; i < 1000 && successUserCreate == true; i++) {

            $("#username").val() = i
            $("#password").val() = i

            $.post(
                url+'?data='+JSON.stringify({
                    'action' : 'createaccount',
                    'password' : $("#password").val(),
                    'username' : $("#username").val(),
                    'imgurl' : $("#imgurl").val()
                }), response
            );

            // TODO: check if user account creation is successful; if not, set flag to false
            if (!response) {
                successUserCreate = false;
            }

        }

        assert(successUserCreate);
    })

    // for each user, create one diary and share diary with all other users
    it('Test 2: For each user, create one diary and share it to all created users', function () {

        var successDiaryCreate = true;
        var successDiaryAddUser = true;

        // login user, create a diary, create a page with content, save diary and share diary to other users
        for (i = 0; i < 1000 && successDiaryCreate && successDiaryAddUser; i++) {

            // create one diary with name 'Diary 1'
            var username = '' + i + ''
            var diarytitle = 'Diary 1'

            url+"?data="+JSON.stringify({
                'action' : 'createnewdict',
                'diarytitle' : diarytitle,
                'username' : username
            }),response

            var content = "This is first diary"
            pagefunc(1);

            // TODO: create page with some content

            // save diary
            response['action'] = 'confirmdiarysave'

            // check if diary was successfully created, otherwise set flag to false
            if (!response) {
                successDiaryCreate = false;
            }


            // call adduser(), add all other users created in this test
            for (j = 0; j < 1000 && successDiaryAddUser; j++) {

                // check if user being added is not the same as current user
                if (i != j) {
                    $("#addperson").val() = '' + j + ''

                    $.post(url+'?data='+JSON.stringify({
                        'action' : 'usercheck',
                        'username' : username,
                        'shareuser' : $("#addperson").val(),
                        'diarytitle' : diarytitle
                    }),response)
                }

                // TODO: check if user was successfully added
                if (!response) {
                    successDiaryAddUser = false;
                }
            }

            // logout current user
            logoutfunc();

        }
        
        assert(successDiaryCreate && successDiaryAddUser);
    })

    // check if other users can access the diaries; then check if created diaries have the same content
    it('Test 3: Check if content of all 1000 created diaries is the same', function () {

        var sameDiaryContent = true;
        var canAccessDiary = true;

        // check if diaries can be accessed by every user
        for (i = 0; i < 1000 && canAccessDiary; i++) {

            if () {

                canAccessDiary = false;
            }
        }


        // compare content of all created diaries, check if they are the same
        for (i = 0; i < 1000 && sameDiaryContent; i++) {

            for (j = 0; j < 1000 && sameDiaryContent; j++) {

                // check if current user being checked is not the same as reference user
                if (i != j) {

                    // if diary content is different, set flag to false
                    if () {

                        sameDiaryContent = false;
                    }

                }
            }

        }

        assert(sameDiaryContent && canAccessDiary);
    })

})