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



///////////
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

//timeout = setTimeout(1000);

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

var prevselect = 1
function pagefunc(currentpage){

    var editingbox = document.getElementById("editingbox");
    totalpagedata[prevselect-1] = editingbox.innerHTML
    console.log(totalpagedata)
    editingbox.innerHTML = totalpagedata[currentpage-1]


    if(editingbox.innerHTML == "undefined"){

        editingbox.innerHTML = ""
    }


//editingbox.innerHTML = totalpagedata[value+1]
    prevselect = currentpage
}





function saveandexit(){






}