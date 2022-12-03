//all of the diary data
var totalpagedata = "";

//page count
var pagecounter = 1;


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

//store the data as a string
var editingbox = document.getElementById("editingbox");

//the ^ means end of a page
totalpagedata = totalpagedata + editingbox.innerHTML + "^" + pagecounter.toString();



//remove text
editingbox.innerHTML = "";



     //increent page counter
     pagecounter = pagecounter + 1

    //create new option in pageselect
    var pageselect = document.getElementById("page-select");
    var newoption = document.createElement("option");
    newoption.setAttribute("value", pagecounter);
    newoption.innerHTML = pagecounter;

    pageselect.appendChild(newoption);


    

//add a blank new page to the total amount of pages. save previous page


}

function pagefunc(value){

var editingbox = document.getElementById("editingbox");    

var v = value - 1;

var prevtemp = totalpagedata.indexOf(v.toString())

var value2 = "^"+value.toString();

var temp = totalpagedata.indexOf(value2.toString());

if(temp == -1){

    editingbox.innerHTML = ""
    
} else if (temp != -1) {

    editingbox.innerHTML = ""

for(var i = prevtemp+1; i <= temp-1; i = i + 1){


    editingbox.innerHTML = editingbox.innerHTML + totalpagedata[i]



}

}

}