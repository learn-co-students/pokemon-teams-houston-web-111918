const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}

const main = qs('main')

let trainers;
let selectedTrainer;
let selectedPokemon;

const render = () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => {
        trainers = res
        renderTrainerCards(trainers)
    })
}

const renderTrainerCards = (trainers) => {
    main.innerHTML = ''
    trainers.forEach((trainer) => {
        const trainerDiv = ce('div')
        // const trainerName = ce('p')
        const pokemonList = ce('ul')
        const addPokemonBtn = ce('button')

        trainerDiv.setAttribute('class', 'card')
        trainerDiv.dataset.id = trainer.id
        trainerDiv.innerHTML = `<p>${trainer.name}</p>`

        addPokemonBtn.dataset.trainerId = trainer.id
        addPokemonBtn.innerText = 'Add Pokemon'
        // addPokemonBtn.styles.fontSize = '5px'

        addPokemonBtn.addEventListener('click', () => {
            selectedTrainer = trainer
            console.log(selectedTrainer.pokemons)
            if (selectedTrainer.pokemons.length <= 6) {
                createPokemon()
            }
        })

        main.append(trainerDiv)

        trainerDiv.append(addPokemonBtn)

        trainer.pokemons.forEach((pokemon) => {
            const pokemonListItem = ce('li')
            const releasePokemonBtn = ce('button')

            pokemonListItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`

            releasePokemonBtn.innerHTML = 'Release'
            releasePokemonBtn.setAttribute('class', 'release')
            releasePokemonBtn.dataset.pokemonId = pokemon.id
            releasePokemonBtn.style.fontSize = '5px'

            releasePokemonBtn.addEventListener('click', () => {
                selectedPokemon = pokemon
                releasePokemon()
            })

            trainerDiv.append(pokemonList)
            pokemonList.append(pokemonListItem)
            pokemonListItem.append(releasePokemonBtn)
        })

    })
}



const createPokemon = () => {
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: selectedTrainer.id
        })
    }).then(render)

}

const releasePokemon = () => {
    fetch(`http://localhost:3000/pokemons/${selectedPokemon.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemonId: selectedPokemon.id
        })
    }).then(render)

}

render()