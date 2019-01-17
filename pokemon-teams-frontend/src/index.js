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
fetch('http://localhost:3000/trainers')
   .then(res => res.json())
   .then(res => {
       trainers = res
       render()
    })

    let body = c('div')
    let main = s('main')
    
function render(){
    main.innerHTML = ''
   trainers.forEach(trainer => {
        let list = c('ul')
        let pokemonCard =  c('div')
        // pokemonCard.innerHTML = ''
        // pokemonCard.dataset.id
        pokemonCard.setAttribute("class", "card")
        pokemonCard.setAttribute("data-id", `${trainer.id}`)
        // let n = c('p')
        // n.text = trainer.name
        pokemonCard.innerHTML = `<p>${trainer.name}</p>` //THIS IS HOW YOU INTERPOLATE HTML

        let addPoke = c('button')
        addPoke.innerText = "Add Pokemon"
        addPoke.setAttribute('data-trainer-id', `${trainer.id}`)
        pokemonCard.append(addPoke)
        
        addPoke.addEventListener('click', () => {

            if(trainer.pokemons.length < 6) {
               
                currentTrainer = trainer
                // console.log(currentTrainer.id)
                
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
                // trainers.push(currentTrainer) 
            }
            })
    // console.log(trainer.pokemons)
    // let list = c('ul')
    let pokemon = []
    trainer.pokemons.forEach(poke => {
        let li = c('li')
        li.innerText = poke.nickname + ' ' + "(" + poke.species +")"
       
        let butt = c('button')
        butt.setAttribute("class", "release")
        butt.setAttribute("data-pokemon-id", `${poke.id}`)
        butt.innerHTML = "RELEASE"
        li.append(butt)

       list.append(li)
    })
        
    
    pokemonCard.append(list)
        main.append(pokemonCard)
   })
}
    