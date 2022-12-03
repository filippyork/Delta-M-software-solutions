var url = "http://localhost:3000/post"

function response(data,status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='usercheck'){
        if(response['taken']){ //checking if user is taken
            console.log("Username is taken")
            alert("Username is taken, please try a different one") // can be made prettier
        }
        else{
            console.log("Account created")
            window.location.href = "./index.html?username="+username
            //TODO post redirect logic for changing username and such?
        }
    }
}

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


    function updateImg(){
        console.log("updating img")
        $("#photodisplay").attr("src",$("#imgurl").val())
    }