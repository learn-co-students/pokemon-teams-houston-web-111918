const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let qs = (element) => { return document.querySelector(element) }
let ce = (element) => { return document.createElement(element) }

let mainBody = qs('main')
let allTrainers = []

let fetchTrainers = function() {
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(json => allTrainers = json)
    .then(render)
}

let fetchRelease = function(pokemon) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`,
    {
        method: 'DELETE'
    })
    .then (fetchTrainers)
}

let render = function() {
    mainBody.innerHTML = ''
    allTrainers.forEach(trainer => {
        let card = document.createElement('div')
        card.className = 'card'

        let p = ce('p')
        p.innerText = trainer.name

        let button = ce('button')
        button.innerText = 'Add Pokemon'
        button.addEventListener('click', e => {
            e.preventDefault()
            addPokemon(trainer)
        })

        let pokedex = ce('ul')
        let pokemons = trainer.pokemons

        pokemons.forEach( pokemon => {
            let li = ce('li')
            li.innerText = pokemon.nickname + `(${pokemon.species})`
            let release = ce('button')
            release.className = 'release'
            release.innerText = 'release'
            release.addEventListener('click', e => {
                e.preventDefault()
                fetchRelease(pokemon)
            })

            li.append(release)
            pokedex.append(li)
        })

        card.append(p, button, pokedex)
        mainBody.append(card)
    })
}

let addPokemon = function(trainer) {
    fetch('http://localhost:3000/pokemons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainer.id
        })  
    })
    .then(fetchTrainers)
}

fetchTrainers()