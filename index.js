
let micropubs = []
let large = []
let brewpubs = []
let all = []
let listOfCities = []
let CheckBoxObj=[]


fetch("http://localhost:3000/breweries")
.then(resp => resp.json())
.then(data => {
    fetchInfo(data)
    fetchShowcase(data[0])
    filterResults()


})


    fetchPub(all)
})




function fetchInfo(data)
{
    let div = document.querySelector(".pics_in_row")
    data.forEach((obj) => {


        listOfCities.push(obj.city)
        all.push(obj)

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
    let pubType = document.querySelector(".pubFilters")
    pubType.addEventListener("change", (e) => {
        if (e.target.value === "micropubs") {
            fetchPub(micropubs)
        }
        else if (e.target.value === "large") {
            fetchPub(large)
        }
        else if (e.target.value === "brewpubs") {
            fetchPub(brewpubs)
        }
        else if (e.target.value === "all") {
            fetchPub(all)
        }
  
        //fetchPub(`${e.target.value}`)
    })

    let cityForm = document.querySelector('.citiesForm')
    let selectAll = document.createElement('input')
    selectAll.setAttribute('type','checkbox')
    selectAll.setAttribute('name','all')
    selectAll.checked = true
    let labelAll = document.createElement('label')
    labelAll.htmlFor = "all"
    labelAll.innerHTML = "Select all"
    cityForm.append(selectAll)
    cityForm.append(labelAll)

    selectAll.addEventListener("change",function() {
        if (this.checked) {
            let allBoxes = document.querySelectorAll('.cityClass')
            for (let i = 0; i<all.length;i++) {
                CheckBoxObj.push(all[i])

            }

            allBoxes.forEach((box) => {
                box.checked = true

                fetchPub(CheckBoxObj)
            })
        
        }
    })
    let br = document.createElement('br')

    cityForm.append(br)

    let deselectAll = document.createElement('input')
    deselectAll.setAttribute('type','checkbox')
    deselectAll.setAttribute('name','deall')
    let delabelAll = document.createElement('label')
    delabelAll.htmlFor = "deall"
    delabelAll.innerHTML = "Deselect all"
    cityForm.append(deselectAll)
    cityForm.append(delabelAll)

    let br2= document.createElement('br')
    let br3=document.createElement('br')
    cityForm.append(br2)
    cityForm.append(br3)
    deselectAll.addEventListener("change", function() {
        if (this.checked) {
            let allBoxes = document.querySelectorAll('input[type="checkbox"]')
            CheckBoxObj = []

            allBoxes.forEach((box) => {
                box.checked = false
                let infoContainer = document.querySelector(".info")

                infoContainer.innerHTML=''
            })
        }
    })
    for (let i=0; i<listOfCities.length-1;i++) {
        let br = document.createElement('br')

        let opt = listOfCities[i]
        let input = document.createElement('INPUT')
        let label = document.createElement('Label')
        label.htmlFor = opt
        label.innerHTML = opt

        input.setAttribute('type','checkbox')
        input.setAttribute('name',opt)
        input.checked=true
        CheckBoxObj.push(all[i])
        
        input.setAttribute('class','cityClass')
        cityForm.append(input)
        cityForm.append(label)
        cityForm.append(br)
        input.addEventListener("change",function(){
            if (this.checked) {
                fetchPubsByCity(input.name)
            }
            if (!this.checked) {
                removePubsByCity(input.name)
            }
        })
    }
}


function fetchPubsByCity(cityName) {
    for (let i = 0; i<listOfCities.length-1;i++) {
        if (cityName === listOfCities[i]) {
            CheckBoxObj.push(all[i])
        }
    }
fetchPub(CheckBoxObj)
}

function removePubsByCity(cityName) {
    for (let i=0; i<all.length-1;i++) {
        if(cityName === all[i].city) {
            console.log(all[i])
            let index = CheckBoxObj.indexOf(all[i])
            if (index > -1) {
                CheckBoxObj.splice(index,1)
            }
        }
    }
    fetchPub(CheckBoxObj)

}


function fetchPub(arrayOfPubs) {
    let infoContainer = document.querySelector(".info")
    infoContainer.innerHTML=''
    arrayOfPubs.forEach((pub) => {
        let p = document.createElement("p")

function fetchShowcase(obj) {
    let showcase = document.querySelector(".showcase")
    showcase.innerHTML=''

    let h1 = document.createElement("h1")
    h1.textContent = obj.name    
    showcase.prepend(h1)
    let img = document.createElement("img")
    img.src=obj.image
    showcase.append(img)

    let pubInfo = document.querySelector(".pubInfo")
    pubInfo.innerHTML=''
    let type = document.createElement('p')
    type.textContent = "Brew Type: " + obj.brewery_type

    let p = document.createElement('p')
    p.textContent = "Address: " + obj.street + ", " + obj.city

    let link = document.createElement('a')
    link.setAttribute('href',obj.website_url)
    link.textContent = "Website Link"
    let phone = document.createElement('p')
    phone.textContent = "Phone #: " + obj.phone
    pubInfo.append(type)
    pubInfo.append(p)
    pubInfo.append(phone)
    pubInfo.append(link)
    
    let br = document.createElement("br")
    pubInfo.append(br)

    //comment section
    let commentTitle = document.createElement("h2")
    commentTitle.textContent = "Comments"
    pubInfo.append(commentTitle)
    
    fetch("http://localhost:3000/comments")
    .then(resp => resp.json())
    .then((data) => {
        data.forEach((comment) => {
            if (comment.imageId === obj.id) {
                let li = document.createElement("li")
                li.textContent = comment.content
                pubInfo.append(li)
            }
        })
    })
    let commentForm = document.createElement("form")
    commentForm.setAttribute('action','/submit')

    let input = document.createElement('input')
    input.setAttribute('name','comment')
    input.setAttribute('type','text')
    let commentLabel = document.createElement('label')
    commentLabel.textContent= "Enter a comment: "
    commentForm.appendChild(commentLabel)
    commentForm.appendChild(input)

    commentForm.addEventListener('submit',(e) => {
        e.preventDefault()

        let li = document.createElement("li")
        li.textContent = input.value
        pubInfo.append(li)
        let data = {
            imageId: obj.id,
            content: input.value
        }
        fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

        commentForm.reset()
    })

    pubInfo.append(commentForm)

    let br2 = document.createElement("br")
    pubInfo.append(br2)
}

//rating system
const beerRating = [...document.getElementsByClassName("fa-regular")]


function rateBrewery(stars) {
    const starsLength = stars.length;
    stars.map((beerRating) => {
       beerRating.onclick = () => {
        star_index = stars.indexOf(beerRating);
        console.log(star_indx)

        for (let i = 0; i < starsLength; i++) {
            if (i <= star_index){
                stars[i].firstChild.setAttribute('data-prefix','fas')
            } else {
                stars[i].firstChild.setAttribute('data-prefix','far')
            }
          }

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

        beerRating.firstChild.setAttribute('data-prefix','fas')
    } else {

    beerRating.firstChild.setAttribute('data-prefix','far')
   }
}


