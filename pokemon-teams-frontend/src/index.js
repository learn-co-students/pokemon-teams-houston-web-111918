const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers = []

// Utilities 
let s = function(selector) {
    return document.querySelector(selector)}

let c = function(tagName) {
    return document.createElement(tagName)}


// HTML Elements 
let container = s("#container") // <- added to HMTL


// Functions
function addPokemon(trainer){
    fetch(`http://localhost:3000/pokemons/`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           trainer_id: trainer.id
           
           
        })
    })

    .then(fetch2)

}


function releasePokemon(pokemon){
    fetch(`http:/localhost:3000/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }) 
    .then(fetch2)


} 


// Render
function render(){
    container.innerHTML = ''
    trainers.forEach(trainer => {
        let trainerCard = c('div')
        let addButton = c('button')
        let trainerName = c('h2')
        trainerCard.setAttribute("class", "card")
        addButton.setAttribute("class", "add")
        addButton.innerText = "add Pokemon!"
        trainerName.innerText = trainer.name
        trainerCard.append(addButton, trainerName)
        container.append(trainerCard)

        addButton.addEventListener('click', () => {addPokemon(trainer)})

        trainer.pokemons.forEach(pokemon => {
            let cardInfo = c('li')
            let releaseBtn = c('button')
            releaseBtn.setAttribute("class", "release")
            releaseBtn.innerText = "Release!"
            cardInfo.append(`${pokemon.nickname} (${pokemon.species})`, releaseBtn)
            trainerCard.append(cardInfo)

            releaseBtn.addEventListener('click', () => {releasePokemon(pokemon, trainer)})
        })
    })
}


















function fetch2() {
fetch("http://localhost:3000/trainers")
.then(res => res.json())
.then(res => trainers = res)
.then(render)}


fetch2()