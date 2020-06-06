const pupsUrl = 'http://localhost:3000/pups'
const dogDiv = document.querySelector('div#dog-bar')
const dogInfoDiv = document.querySelector('div#dog-info')

fetch(pupsUrl)
  .then(r => r.json())
//   .then(console.log)

  .then(pups => pups.forEach(pup => generatePup(pup)))

//    .then(pups => pups.forEach(generatePup))

function generatePup(pup) {
    // console.log(pup)
    const pupSpan = document.createElement('span')
    pupSpan.innerText = pup.name
    // console.log(dogDiv, pupSpan)
    dogDiv.append(pupSpan)

    pupSpan.addEventListener('click', function(e) {
        pupInfo(pup)
    })

}

function pupInfo(pup) {
    // console.log(pup.image)
    const h2 = document.createElement('h2')
    h2.innerText = pup.name
    const img = document.createElement('img')
    img.src = pup.image
    img.alt = 'this dog'    
    const button = document.createElement('button')
    isGoodDog(pup, button)

    button.addEventListener('click', function(e) {
        // console.log(pup.isGoodDog)
        pupStatusChg(pup, button)
    })
 
    dogInfoDiv.append(img,h2,button)
}
function isGoodDog(pup, button) {
    // console.log('isGoodDog: ', pup.isGoodDog)
    if (pup.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }    
}
function pupStatusChg(pup, button) {
    console.log(pup)
    if (pup.isGoodDog) {
        pup.isGoodDog = false
    } else {
        pup.isGoodDog = true
    }    
    fetch(`${pupsUrl}/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"      
        }, body: JSON.stringify({
            'isGoodDog': pup.isGoodDog
        })
    })
    isGoodDog(pup, button)
}