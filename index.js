fetch("http://localhost:3000/breweries")
.then(resp => resp.json())
.then(data => {
    //function(data)
    fetchInfo(data)
})

function fetchInfo(Obj)
{
    let div = document.querySelector(".pics_in_row")
    Obj.forEach((obj) => {
 
        let img = document.createElement("img")
        img.src = obj.logo
        img.className = "renderedPic"
        
        div.append(img)


    })
//         console.log(player.first_name)
//     })
// 
}