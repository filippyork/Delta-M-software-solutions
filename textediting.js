//all of the diary data
const varparam = new URLSearchParams(window.location.search)
var diarytitle = varparam.get('diarytitle')
var username = varparam.get('username')

console.log(diarytitle, username)
const url = "http://localhost:3000/post"
//page count
var pagecounter = 1;

var totalpagedata

//Load the editable div for the user:
window.onload = function (){

$('#editingbox').each(function(){
    this.contentEditable = true;
});

    $.post(
        url+'?data='+JSON.stringify({
            'action' : 'diaryfetch',
            'diarytitle' : diarytitle,
            'username' : username
        }), response
    )

}

function response(data, status){
    var response = JSON.parse(data)
    console.log(data)
    if(response['action']=='diaryreturn'){
        totalpagedata = response['diarydata']
    }
    if(response['action']=='confirmdiarysave'){
        console.log("Saved page data redirecting to goodbye page")
        window.location.href ="./goodbypage.html?diarytitle="+diarytitle +"&username=" + username
    }
}



function saveButton(){
    $.post(
        url+'?data='+JSON.stringify({
            'action' : 'savediary',
            'diarytitle' : diarytitle,
            'diarydata' : totalpagedata,
            'username' : username
        }), response
    )
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