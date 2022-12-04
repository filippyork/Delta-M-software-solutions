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

            // checks if user account creation is successful; if not, set flag to false
            if (!response) {
                successUserCreate = false;
            }

        }

        assert(successUserCreate);
    })

    // for first user, create one diary and share diary with all other users
    it('Test 2: For first user, create one diary and share it to all created users', function () {

        var successDiaryCreate = true;
        var successDiaryAddUser = true;

        // create one diary with name 'Diary 1'
        var username = '' + 0 + ''
        var diarytitle = 'Diary 1'

        url+"?data="+JSON.stringify({
            'action' : 'createnewdict',
            'diarytitle' : diarytitle,
            'username' : username
        }),response
            
        // create page with some content
        var content = 'This is first diary'
        var editingbox = document.getElementById("editingbox")
        editingbox.innerHTML = content
        pagefunc(1);

        // save diary
        response['action'] = 'confirmdiarysave'

        // check if diary was successfully created, otherwise set flag to false
        if (!response) {
            successDiaryCreate = false;
        }


        // call adduser(), add all other users created in this test
        for (var j = 1; j < 1000 && successDiaryAddUser; j++) {

            $("#addperson").val() = '' + j + ''

            $.post(url+'?data='+JSON.stringify({
                    'action' : 'usercheck',
                    'username' : username,
                    'shareuser' : $("#addperson").val(),
                    'diarytitle' : diarytitle
                }),response)

            // check if user was successfully added
            if (!response) {
                successDiaryAddUser = false;
            }
        }

        // logout current user
        logoutfunc();
        
        assert(successDiaryCreate && successDiaryAddUser);
    })

    // check if other users can access the diaries, then check if shared diaries contain the same content as original
    it('Test 3: Check if content of all shared diaries is the same as the original', function () {

        var sameDiaryContent = true;
        var canAccessDiary = false;
        var i = 1;

        // check if diary can be accessed by every user
        do {

            $.post(
                url+'?data='+JSON.stringify({
                    'action' : 'titlerequest',
                    'username' : username
                }), response
            )

            // check if current user can access diary, otherwise set flag to false
            if (response['titlelist'][1] == 'Diary 1') {

                canAccessDiary = false;
            }

            // retrieve diary content from server
            $.post(
                url+'?data='+JSON.stringify({
                    'action' : 'diaryfetch',
                    'diarytitle' : diarytitle,
                    'username' : username
                }), response
            )

            // compare content of shared diary to that of the original
            if (document.getElementById("editingbox").innerHTML == 'This is first diary') {

                sameDiaryContent = false;
            }
            
            i++;
        } while (i < 1000 && canAccessDiary && sameDiaryContent) 

        assert(sameDiaryContent && canAccessDiary);
    })

})