var url =  "http://localhost:3000/post"


function changePassword(){
    
    if($("#renewpassword").val()==$("#newpassword").val()){
        $.post(
                url+'?data='+JSON.stringify({
                    'action' : 'changepassword',
                    'username' : $("#originalusername").val(),
                    'password' : $("#originalpassword").val(),
                    'newpassword' : $("#newpassword").val()
                
                }),response
            )
    }else{
        alert("Passwords dont match")
        //Maybe make look nicer?
    }
    
}
//TODO NOT WORKING FIX
function response(data,status){
    console.log("im in resposne")
    var response = JSON.parse(data)
    if(response["action"]=="changepasswordresponse"){
        if(response['success']){
            alert("Password successfully changed")
            //window.location.href = "./index.html"
        }else{
            alert("Incorrect Username/Password, please try again")
        }
    }
}
