//Load the editable div for the user:
window.onload = function (){

$('#editingbox').each(function(){
    this.contentEditable = true;
});

timeout = setTimeout(changecolor, 1000);

}

//Clears the Text
function cleartext(){


    var editingbox = document.getElementById("editingbox");
    editingbox.innerHTML = ""


}

//New page function
function newpage(){



//add a blank new page to the total amount of pages


}

//Next button
function nextbtn(){



//cycle pages right 



}

//back button
function backbtn(){


//cycle pages left


}