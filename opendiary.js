var diarytitle;
const username = new URLSearchParams(window.location.search).get('username');
var url = "http://localhost:3000/post";
window.onload = function() {
    $.post(
        url+'?data='+JSON.stringify({
            'action' : 'titlerequest',
            'username' : username
        }), response
    );
}

function noExistingDiary(diarytitle){
    $.post(
        url+"?data="+JSON.stringify({
            'action' : 'createnewdict',
            'title' : diarytitle,
            'username' : username
        }),response
    )
}

function response(data, status){
    
    var response = JSON.parse(data);
    console.log(data);

    if (response['action']=='titlereturn') {
        
        //titlelist is the list of titles recieved from the server
        titlelist = response['titlelist'];
        console.log(titlelist);
    }
    
    if (response['action']=='createresponse') {
        
        if (response['success']) {
            window.location.href = "./diaryeditting.html?diarytitle=" + diarytitle + "&username=" + username;
        }
        
        else {
            alert("Diary name already exists!");
        }
        
    }
}

// creates buttons for each diary the current user has created
function diaryButtons() {

    /* server side will check whether current entry in MyDiary contains 
    the current user's username, an updates the diary title if this is true */
    
    /* if no entries exist for current user (e.g. new user), add a new diary option */
    if (titlelist.length == 0) {
        var diaryButton = document.createElement('BUTTON');
        var diarytext = document.createTextNode("Create a New Diary");
        diaryButton.appendChild(diarytext);
        
        // upon clicking this button, create a new diary
        diaryButton.onclick = (newDiary);

    }

    else {

        for (username in titlelist) {
            // creates a button to redirect to selected page
            var diaryButton = document.createElement('BUTTON');
            var diarytext = document.createTextNode(diarytitle);
            diaryButton.appendChild(diarytext);
            diaryButton.id = diarytitle;
        
            // when this button is clicked, send user to corresponding page
            diaryButton.onclick = toEditing(diarytitle);    

        }

    }

}

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(diarytitle){
    window.location.href = "./diaryeditting.html?diarytitle=" + diarytitle + "&username=" + username;
}

// create new diary if the person does not have one
function newDiary() {

    // prompt user to enter title
    diarytitle = prompt("Enter a title:");

    // create new diary, send title of first page
    noExistingDiary(diarytitle);

    // redirect user to diary editing page
    toEditing(diarytitle);
}
