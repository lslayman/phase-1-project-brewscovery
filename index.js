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

const beerRating = [...document.getElementsByClassName("fa-regular")]
// const testbeer = [...document.getElementsByClassName("svg-inline--fa")]
console.log(beerRating)
function rateBrewery(stars) {
    // const mugsActive = "fa-solid fa-star";
    //const mugsInactive = "fa-regular fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((beerRating) => {
        //beerRating.addEventListener("click", () => console.log("hello"))
       beerRating.onclick = () => {
        star_index = stars.indexOf(beerRating);
        console.log(star_index)
        for (let i = 0; i < starsLength; i++) {
            if (i <= star_index){
                stars[i].firstChild.setAttribute('data-prefix','fas')
            } else {
                stars[i].firstChild.setAttribute('data-prefix','far')
            }
          }
        
     
            // beerRating.firstChild.setAttribute('data-prefix','fas') 
            
        }
    })
}
rateBrewery(beerRating);

function setRating(beerRating) {
    if(beerRating.firstChild.getAttribute('data-prefix')==='far') {
        //This changes to colored
        beerRating.firstChild.setAttribute('data-prefix','fas')
    } else {
        //uncolored
    beerRating.firstChild.setAttribute('data-prefix','far')
   }
}

//function changeColor(stars) {
  //  stars.
//}
