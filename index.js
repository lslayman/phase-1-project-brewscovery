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
    for (let i=0; i<listOfCities.length-1;i++) {
        let br = document.createElement('br')

        let opt = listOfCities[i]
        let input = document.createElement('INPUT')
        let label = document.createElement('Label')
        label.htmlFor = opt
        label.innerHTML = opt

        input.setAttribute('type','checkbox')
        input.setAttribute('name',opt)
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

        //console.log(all[i].city)
        //let objToRemove
        //if (cityName === all[i].city) {
        //   all[i] = objToRemove
        //}
        //console.log(objToRemove)
        //let index = CheckBoxObj.indexOf()
    }
    fetchPub(CheckBoxObj)

}

function fetchPub(arrayOfPubs) {
    let infoContainer = document.querySelector(".info")
    infoContainer.innerHTML=''
    arrayOfPubs.forEach((pub) => {
        let p = document.createElement("p")
        p.textContent = pub.name
        p.addEventListener('click',function() {
            fetchShowcase(pub)
        })
        infoContainer.append(p)
    })
}

function fetchShowcase(obj) {
    let showcase = document.querySelector(".showcase")
    showcase.innerHTML=''

    let h1 = document.createElement("h1")
    //let showcaseTitle = document.querySelector(".showcaseTitle")
    h1.textContent = obj.name    
    showcase.prepend(h1)
    let img = document.createElement("img")
    img.src=obj.image
    showcase.append(img)

    let pubInfo = document.querySelector(".pubInfo")
    pubInfo.innerHTML=''
    let p = document.createElement('p')
    p.textContent = "Address: " + obj.street + ", " + obj.city
    let link = document.createElement('a')
    link.setAttribute('href',obj.website_url)
    link.textContent = "Website Link"
    let phone = document.createElement('p')
    phone.textContent = "Phone #: " + obj.phone
    pubInfo.append(p)
    pubInfo.append(phone)
    pubInfo.append(link)
}