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

function createNewDiary() {
    diarytitle = prompt("What would you like your Diary title to be?")
    console.log(diarytitle)
    $.post(
        url+"?data="+JSON.stringify({
            'action' : 'createnewdict',
            'diarytitle' : diarytitle, //TODO This variable needs to be defined (victor) idk if it needs to be changed to a seperate one but currently this is the same as the button title variables
            'username' : username
        }),response
    )
}

// TODO: create buttons for listing diary entries
function loadButtons() {
    
    // search for diaries created by current user
    for (i = 0; i < titlelist.length; i++) {
    
        var diaryName = document.createElement('div');
        var a = document.getElementById('innerbox');
                
        a.appendChild(diaryName);
    
        // set current diary title
        diarytitle = titlelist[i];
    
        // creates a button to redirect to selected page
        var diaryButton = document.createElement('BUTTON');
        var diarytext = document.createTextNode(diarytitle);
        diaryButton.className = "fcc-btn";
        diaryButton.id = diarytitle;
        diaryButton.appendChild(diarytext);
                
        // when this button is clicked, send user to corresponding page
        diaryButton.setAttribute('onclick', 'toEditing(diarytitle)');
        
        // create button on div
        a.appendChild(diaryButton);
    }

}

function response(data, status){
    
    var response = JSON.parse(data)
    console.log("Recieved data " + data)
    if(response['action']=='titlereturn'){
        
        //titlelist is the list of titles recieved from the server.
        for(i=0;i<response['titlelist'].length;i++){
           
            var holder=response['titlelist'][i]
            console.log(holder)
            
            var inputel = document.createElement('input')
            inputel.type = "button"
            inputel.id = holder
            inputel.addEventListener('click', function(){toEditing(this)})
            $("#innerbox").append(inputel)
        }

    }
    if(response['action']=='createresponse'){
        if(response['success']){
            window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
        }else{
            alert("Error Diary name already exists!") //temporary
        }
        
    }
}

// redirects user to diary editing page
function toEditing(diarytitle){
    //TODO diary title needs to be defined with the buttonpress as the diary that was chosen
    console.log(titlenamer.id)
    window.location.href = "./diaryeditting.html?diarytitle="+titlenamer.id +"&username=" + username
}