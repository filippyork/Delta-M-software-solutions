var url = "http://localhost:3000/post"


function response(data,status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='loginresponse'){
        if(response['success']){
            console.log("Login success")
            window.location.href = "./opendiary.html?username="+username
            //Local storage for transfer between pages
            
            //TODO extra logic for login if needed?
        }
        else{
            console.log("Login failed")
            alert("invalid username or password, try again")
            // Maybe use a nicer way to display this error rather than an alert

        }
    }

}


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


//TODO HAVE SOME SORT OF AREA SO DISPLAY PFP EITHER ON THIS PAGE OR ON OPENDIARY