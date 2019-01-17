const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function c(arg){
    return document.createElement(arg)
}
function s(arg){
    return document.querySelector(arg)
}

let trainers;

let data;


    let body = c('div')
    let main = s('main')
    
function render(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(res => {
        trainers = res
        console.log(trainers)
        renderCards(trainers)
     })
    }

    render() // CALL THE DAMN THE THING

    function renderCards(trainers){
        main.innerHTML = ''
    
    trainers.forEach(trainer => {

            let list = c('ul')
            let pokemonCard =  c('div')
            pokemonCard.setAttribute("class", "card")
            pokemonCard.setAttribute("data-id", `${trainer.id}`)
            pokemonCard.innerHTML = `<p>${trainer.name}</p>` //THIS IS HOW YOU INTERPOLATE HTML

            let addPoke = c('button')
            addPoke.innerText = "Add Pokemon"
            addPoke.setAttribute('data-trainer-id', `${trainer.id}`)
            pokemonCard.append(addPoke)
            
            addPoke.addEventListener('click', () => {
                if(trainer.pokemons.length < 6) {
                    currentTrainer = trainer
                    fetch(POKEMONS_URL, {

                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            // nickname: POPULATED ON ITS OWN
                            // species: 
                            // ({}).toString()
                            //     -- > "[object Object]"
                            trainer_id: `${currentTrainer.id}`,
                        })
                    }) // FETCH END
                    .then(render)
                }
                })
            
        let pokemon = []
        trainer.pokemons.forEach(poke => {
            // currentPokemon = poke
            // console.log("CURRENT", currentPokemon)
            // console.log("POKE", poke)

            let li = c('li')
            li.innerText = poke.nickname + ' ' + "(" + poke.species +")"
            let butt = c('button')
            butt.setAttribute("class", "release")
            butt.setAttribute("data-pokemon-id", `${poke.id}`)
            butt.innerHTML = "RELEASE"
            li.append(butt)
                list.append(li)
                    butt.addEventListener('click', () => {
                        fetch(`http://localhost:3000/pokemons/${poke.id}`, {
                            method: 'delete'
                        })
                        .then(render)

                    })
        })
            
        
        pokemonCard.append(list)
            main.append(pokemonCard)
    })
    }
    