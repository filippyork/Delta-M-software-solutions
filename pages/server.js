var express = require('express');
var app = express();
var port = 3000
// must change the setup for diary storage
var db = {'Admin':{password:'root', diary:{'Admins Diary': ['<hr> Hello there </hr>']}, imgurl: 'https://i.kym-cdn.com/entries/icons/mobile/000/035/557/Hi_Bingus.jpg'}} //db with autofill for admin, pfpimg is pfpimgs/username
app.post('/post',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client")
    console.log("Recieved")
    console.log(JSON.parse(req.query['data']));
    var parsed = JSON.parse(req.query['data'])
    //Account creation
    if(parsed['action']=='createaccount'){
        console.log("Checking for taken username")
        for(let [key,value] of Object.entries(db)){
            if(parsed['username']==key){
                console.log("Username is taken") 
                var usertaken = true
                break;
            }
        }
        if(!usertaken){ //adding user to db if not taken
            db[
                parsed['username']] = {password : parsed['password'], diary : {}, imgurl: parsed['imgurl']}
        
        }
        console.log(db)
        //TODO implement img saving or use a web adress to display the img (otherwise use src system)
        
        var jsontext = JSON.stringify({
            'action' : 'usercheck',
            'taken' : usertaken
        })
        res.send(jsontext)
        //TODO possibly a pfp check
    }
    if(parsed['action']=='login'){
        var loginsuccess = false
        console.log("Checking for correct username, password key pair")
        // login check logic
        console.log(db[parsed['username']], db, parsed)
       if(db[parsed['username']]!=null){ 
        if(db[parsed['username']].password == parsed['password']){
            console.log("Succesfully logged in " + parsed['username'])
            loginsuccess = true
        }else{
            console.log("Login failed, wrong password for user")
            
        }
       }else{
        console.log("Login failed, username does not exist")
       }
       var jsontext = JSON.stringify({ // curating response for login request
            'action' : 'loginresponse',
            'success' : loginsuccess,
            'username' : parsed['username'],
            'pfp' : db[parsed['username']].pfp
       })
       res.send(jsontext) // sending login request response
    }
    // Share Response
    if(parsed['action']=='usercheck'){
        exists = db[parsed['shareuser']]!=null?true:false;
        console.log("Username ${parsed['shareuser']} exists: " + exists)
        jsontext = {
            'action' : 'shareresponse',
            'shared' : exists,
        }
        if(exists){
            jsontext['shareduserphoto']= db[parsed['shareuser']].imgurl
            //TODO add cur users dictionary to share user.
            if(db[parsed['shareuser']].diary[parsed['diarytitle']]==null){
                db[parsed['shareuser']].diary[parsed['diarytitle']] = db[parsed['username']].diary[parsed['diarytitle']]
            }else{
                jsontext['shared'] = false
            }
            
            parsed['diarytitle']

        }
        jsontext = JSON.stringify(jsontext)
        res.send(jsontext)
    }
    if(parsed['action']=='titlerequest'){
        let keytemp = []
        for(let [key,value] of Object.entries(db[parsed['username']].diary)){
            keytemp.push(key)
        }
        jsontext = JSON.stringify({
            'action' : 'titlereturn',
            'titlelist' : keytemp
        })
        res.send(jsontext)
        
    }
    if(parsed['action']=='diaryfetch'){
        console.log( parsed['diarytitle'])
        jsontext = JSON.stringify({
            'action' : 'diaryreturn',
            'diarydata' : db[parsed['username']].diary[parsed['diarytitle']]

        })
        res.send(jsontext)
    }
    if(parsed['action'] == 'savediary'){
        console.log(parsed['diarydata'])
        db[parsed['username']].diary[parsed['diarytitle']] = parsed['diarydata']
        jsontext = JSON.stringify({
            'action' : 'confirmdiarysave'
        })
        res.send(jsontext)
    }
    if(parsed['action']=='createnewdict'){
        console.log(parsed['title'])
        jsontext = JSON.stringify({
            'action' : 'createresponse'
        })
        if(db[parsed['username']].diary[parsed['dairytitle']]==null){
            db[parsed['username']].diary[parsed['diarytitle']] = ["Write text here!"]
            jsontext['success'] = true
        }else{
            jsontext['success'] = false
        }
        res.send(jsontext)
        
        
    }
    if(parsed['action']=='changepassword'){
        var changed = false
        if(db[parsed['username']]!=null){ 
            if(db[parsed['username']].password == parsed['password']){
                db[parsed['username']].password = parsed['newpassword']
                changed = true
                jsontext = JSON.stringify({
                    'action' : 'changepasswordresponse',
                    'successs' : true
                })
            }else{
                console.log("Login failed, wrong password for user")
                jsontext = JSON.stringify({
                    'action' : 'changepasswordresponse',
                    'successs' : false
                })
            }
        }
        console.log(jsontext)
        res.send(jsontext)
    }
}).listen(port)
console.log("listening on" + port)