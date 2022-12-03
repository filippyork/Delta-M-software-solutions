var diarytitle = 'Admins Diary'
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
    }
}

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(){
    window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
}
//TODO for viewing mutliple 