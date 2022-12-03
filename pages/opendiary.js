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
        $("#diaryname").text(response['title'] +" by: "+username)
    }
}

//TODO for viewing mutliple 