var diarytitle = 'Admins Diary' //must be removed
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

function noExistingDiary(){
    $.post(
        url+"?data="+JSON.stringify({
            'action' : 'createnewdict',
            'title' : diarytitle, //TODO This variable needs to be defined (victor) idk if it needs to be changed to a seperate one but currently this is the same as the button title variables
            'username' : username
        }),response
    )
}

function response(data, status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='titlereturn'){
        titlelist = response['titlelist']
        console.log(titlelist)
        //titlelist is the list of titles recieved from the server.
    }
    if(response['action']=='createresponse'){
        if(response['success']){
            window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
        }else{
            //TODO (Victor) functionality if diary name already exists (client side)
            alert("Diary name already exists!") //temporary
        }
        
    }
}

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(){
    //TODO diary title needs to be defined with the buttonpress as the diary that was chosen
    window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
}
//TODO for viewing mutliple 



//TODO create new diary if the person does not have one (let them choose a title, nothing else really matters)