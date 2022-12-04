const urlsearch = new URLSearchParams(window.location.search)
const username = urlsearch.get('username')
const diarytitle = urlsearch.get('diarytitle')

function shareredirect(){
    window.location.href = "./sharediarypage.html?username=" + username + "&diarytitle="+diarytitle
}