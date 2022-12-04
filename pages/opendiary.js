var titlelist = ['diary1'];
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

    // create a new diary button
    var diaryName = document.createElement('div');
    var a = document.getElementById('innerbox');
    a.appendChild(diaryName);
    
    var diaryButton = document.createElement('BUTTON');
    var diarytext = document.createTextNode("Create a New Diary");
    diaryButton.className = "fcc-btn";
    diaryButton.appendChild(diarytext);
                
    // upon clicking this button, create a new diary
    diaryButton.setAttribute('onclick', 'newDiary()');
    
    // create button on div
    a.appendChild(diaryButton);
        
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
    var response = JSON.parse(data)
    console.log(data)
    if (response['action']=='titlereturn') {
        titlelist += response['titlelist']
        console.log(titlelist)
        //titlelist is the list of titles recieved from the server
    }
    
    if (response['action']=='createresponse') {
        if (response['success']) {
            window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
        }else{
            alert("Diary name already exists!")
        }
        
    }
}

// MADE WITH MULTIPLE DIARIES IN MIND
function toEditing(diarytitle){
    window.location.href = "./diaryeditting.html?diarytitle="+diarytitle +"&username=" + username
}

// create a new diary if the person does not have one
function newDiary() {

    // prompt user to enter title
    diarytitle = prompt("Enter a title:");

    // create new diary, send title of first page
    noExistingDiary(diarytitle);

    // redirect user to diary editing page
    toEditing(diarytitle);
}