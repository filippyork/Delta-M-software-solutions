var diarytitle = 'Admins Diary' //needs to be changed 
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

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(){
    //TODO diary title needs to be defined with the buttonpress as the diary that was chosen
    window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
}
//TODO for viewing mutliple 