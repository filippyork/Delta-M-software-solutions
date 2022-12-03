
//TODO figure out format for the pages.js, either one js doc with easy globals for usernames and such, or multiple that make a login request based off of cookies? (sounds complicated)
var username

var url = "http://localhost:3000/post"
//Signuppage
function createNewAccount(){

    
    if($("#password").val()!=$("#repassword").val()){ // If passwords match
        alert("passwords do not match")
        // TODO better looking password check?
    }
    else{

        $.post(
            url+'?data='+JSON.stringify({
                'action' : 'createaccount',
                'password' : $("#password").val(),
                'username' : $("#username").val(),
                'imgurl' : $("#imgurl").val()
            }), response
        );
    }
    // commented out for now since using url for img
    /*else{
        if($("#myFile").prop('files')[0]!= null) //If myFile is populated
        {
            userpfp = $("#myFile").prop('files')[0]
        }else{
            userpfp = "default" //probably not the best way to do this.
        }*/

        //TODO Send newuser json packet to server defining the new user (username, password, image)

        //TODO Wait for server response, confirming the selection otherwise throw an error. If server responds redirect to the next page
    }

//ShareDiaryPage
function addToShareDiary(){
    //TODO check if the addperson username exists in the database, if it does, act accordingly, if not throw an error. (only one request client side, but mutli response server side)
    // Maybe update picture if it found the person and add a confirm button? just would look better.
    $.post(url+'?data='+JSON.stringify({
        'action' : 'usercheck',
        'shareuser' : $("#addperson").val(),
        'username' : username //finish this username functionality, perhaps a global? 
    }),response)
}

//Opendiary

function indexlogin(){
    username = $("#usernamelog").val()
    console.log(username)
    $.post(
        url+'?data='+JSON.stringify({
            'action' : 'login',
            'username' : username,
            'password' : $("#passwordlog").val()
        }),response
    )
    
}

//update image preview on signup page
function updateImg(){
    console.log("updating img")
    $("#photodisplay").attr("src",$("#imgurl").val())
}


//Response
function response(data, status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='usercheck'){
        if(response['taken']){ //checking if user is taken
            console.log("Username is taken")
            alert("Username is taken, please try a different one") // can be made prettier
        }
        else{
            console.log("Account created")
            window.location.href = "./index.html"
            //TODO post redirect logic for changing username and such?
        }
    }
    if(response['action']=='loginresponse'){
        if(response['success']){
            console.log("Login success")
            window.location.href = "./opendiary.html"
            username = reponse['username']
            //TODO extra logic for login if needed?
        }
        else{
            console.log("Login failed")
            alert("invalid username or password, try again")
            // Maybe use a nicer way to display this error rather than an alert

        }
    }
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
    if(response['action']=='diaryfetch'){
        // Perhaps diary selection? generate button elements for each one and open it accordingly
        if(response['pagenumber']){
            // get pagenumber from chosen diary and send back to client
        }
    }
    }

