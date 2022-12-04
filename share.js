const urlsearch = new URLSearchParams(window.location.search)
const username = urlsearch.get('username')
const diarytitle = urlsearch.get('diarytitle')

var url = "http://localhost:3000/post"

function addToShareDiary(){
    //TODO check if the addperson username exists in the database, if it does, act accordingly, if not throw an error. (only one request client side, but mutli response server side)
    // Maybe update picture if it found the person and add a confirm button? just would look better.
    $.post(url+'?data='+JSON.stringify({
        'action' : 'usercheck',
        'username' : username,
        'shareuser' : $("#addperson").val(),
        'diarytitle' : diarytitle
    }),response)
}

function response(data,status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='shareresponse'){
        if(response['shared']){
            $("#shareduserphoto").attr("src",response['shareduserphoto'])
            //TODO can add username under photo and make it look nicer, (this neeeds alterations in the server.js file as well under Share Response)
            console.log("Shared successfully")
            alert("Shared successfully")
            // Maybe use a nicer way to display this rather than an alert
        }
        else{
            console.log("failed to share")
            alert("failed to share")
            // Maybe use a nicer way to display this rather than an alert
        }
    }
}




//TODO server side, search the user and match someone with the correct entered credentials
function searchuser(){

    var profilepicobj = document.getElementById("pfp");
    var userobj = document.getElementById("sharetousername").value;
    var innerbox = document.getElementsByClassName("sharerinner");

}

function logoutfunc(){
    window.location.href = "goodbypage.html"

}














