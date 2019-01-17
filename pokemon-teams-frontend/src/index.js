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
   trainers.forEach(trainer => {
        let pokemonCard =  c('div')
        // pokemonCard.dataset.id
        pokemonCard.setAttribute("class", "card")
        pokemonCard.setAttribute("data-id", `${trainer.id}`)
        // let n = c('p')
        // n.text = trainer.name
        pokemonCard.innerHTML = `<p>${trainer.name}</p>` //THIS IS HOW YOU INTERPOLATE HTML

        let button = c('button')
        button.innerText = "Add Pokemon"
        button.setAttribute('data-trainer-id', `${trainer.id}`)
        pokemonCard.append(button)
    // console.log(trainer.pokemons)
    let list = c('ul')
    let pokemon = []
    trainer.pokemons.forEach(poke => {
        let li = c('li')
        li.innerText = poke.nickname
        let butt = c('button')
        butt.setAttribute("class", "release")
        butt.setAttribute("data-pokemon-id", `${poke.id}`)
        butt.innerHTML = "RELEASE"
        li.append(butt)

       list.append(li)
    })
        
    // console.log(list)
        
        let li1
        let li2
        let li3
        let li4
        let li5

    pokemonCard.append(list)
        main.append(pokemonCard)
   })
}
    