let micropubs =[]
let large = []
let brewpubs = []

fetch("http://localhost:3000/breweries")
.then(resp => resp.json())
.then(data => {
    fetchInfo(data)
    fetchShowcase(data[0])
    filterResults()

})

function fetchInfo(data)
{
    let div = document.querySelector(".pics_in_row")
    data.forEach((obj) => {
        if (obj.brewery_type === "large") {
            large.push(obj)
        }
        else if (obj.brewery_type === "brewpub") {
            brewpubs.push(obj)
        }
        else if (obj.brewery_type === "micro") {
            micropubs.push(obj)
        }

        let logo = document.createElement("img")
        logo.src = obj.logo
        div.append(logo)
        logo.addEventListener("click", function() {
            fetchShowcase(obj)
        })
        

    })
}

function filterResults () {
    let brewpubLink = document.querySelector(".brewpubs")
    let microLink = document.querySelector(".micros")
    let largeLink = document.querySelector(".large")
    brewpubLink.addEventListener("click",() => fetchPub(brewpubs))
    microLink.addEventListener("click", () => fetchPub(micropubs))
    largeLink.addEventListener("click", () => fetchPub(large))
}
function fetchPub(arrayOfPubs) {
    let infoContainer = document.querySelector(".info")
    infoContainer.innerHTML=''
    arrayOfPubs.forEach((pub) => {
        let p = document.createElement("p")
        p.textContent = pub.name
        infoContainer.append(p)
    })
}
function fetchShowcase(obj) {
    let img = document.createElement("img")
    let showcase = document.querySelector(".showcase")
    showcase.innerHTML=''
    img.src=obj.image
    showcase.append(img)
}