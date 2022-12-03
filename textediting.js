//all of the diary data
var totalpagedata = [];

//page count
var pagecounter = 1;


//last page
var lastpage = 1;





//Load the editable div for the user:
window.onload = function (){

$('#editingbox').each(function(){
    this.contentEditable = true;
});

timeout = setTimeout(1000);

}

//Clears the Text
function cleartext(){

    var editingbox = document.getElementById("editingbox");

    editingbox.innerHTML = ""


}

function colorfunc(value){

    var editingbox = document.getElementById("editingbox");

    editingbox.style.color = value;
    



}


function sizefunc(value){

    var editingbox = document.getElementById("editingbox");

    editingbox.style.fontSize = value;


}




//New page function
function newpage(){

     //increment page counter
     pagecounter = pagecounter + 1

    //create new option in pageselect
    var pageselect = document.getElementById("page-select");
    var newoption = document.createElement("option");
    newoption.setAttribute("value", pagecounter);
    newoption.innerHTML = pagecounter;

    pageselect.appendChild(newoption);

}

function pagefunc(currentpage){

var editingbox = document.getElementById("editingbox");    



//editingbox.innerHTML = totalpagedata[value+1]









}