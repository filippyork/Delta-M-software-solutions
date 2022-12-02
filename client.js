//TODO figure out format for the pages.js, either one js doc with easy globals for usernames and such, or multiple that make a login request based off of cookies? (sounds complicated)
//Signuppage
function createNewAccount(){

    
    if(false){
        //TODO userexists serverside check username!=null
    }
    else if($("#password").prop("value")!=$("#repassword").prop("value")){ // If passwords match
        alert("passwords do not match")
        // TODO better looking password check?
    }else{
        if($("#myFile").prop('files')[0]!= null) //If myFile is populated
        {
            userpfp = $("#myFile").prop('files')[0]
        }else{
            userpfp = "default" //probably not the best way to do this.
        }

        //TODO Send newuser json packet to server defining the new user (username, password, image)

        //TODO Wait for server response, confirming the selection otherwise throw an error. If server responds redirect to the next page
    }
}
//ShareDiaryPage
function addToShareDiary(){
    //TODO check if the addperson username exists in the database, if it does, act accordingly, if not throw an error. (only one request client side, but mutli response server side)
    // Maybe update picture if it found the person and add a confirm button? just would look better.
}

//Opendiary




