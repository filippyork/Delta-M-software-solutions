var diarytitle = 'Admins Diary' // needs to be changed
const username = new URLSearchParams(window.location.search).get('username')
var url ="http://localhost:3000/post"
window.onload = function() {
    $.post(
        url+'?data='+JSON.stringify({
            'action' : 'titlerequest',
            'username' : username
        }), response
    );
}

function response(data, status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='titlereturn'){
        titlelist = response['titlelist']
        console.log(titlelist)
        //titlelist is the list of titles recieved from the server.
    }
}

// creates buttons for each diary the current user has created
function diaryButtons() {

    /* server side will check whether current entry in MyDiary contains 
    the current user's username, an updates the diary title if this is true */

    // creates a button to redirect to selected page
    var diaryButton = document.createElement('BUTTON');
    var diarytext = document.createTextNode(diarytitle);
    diaryButton.appendChild(diarytext);
    diaryButton.id = diarytitle;

    // when this button is clicked, send user to corresponding page
    diaryButton.onclick = toEditing(diarytitle);

}

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(diarytitle){
    window.location.href = "./diaryeditting.html?diarytitle=" + diarytitle;
}