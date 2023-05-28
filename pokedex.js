const div$$ = document.querySelector (".container")

let playerOne;
let playerTwo

async function getPokemons(){ 
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150") 
    const resPokemons = await res.json(); 
    getDetailPokemons(resPokemons.results); 
} 
async function getDetailPokemons(pokemons){ 
    const pokemonsPromises = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json())) 
    const detailPokemons = await Promise.all(pokemonsPromises); 
    printPokemons(detailPokemons);
} 
getPokemons()

const printPokemons = (detailPokemons) => {
    
    const ol$$ = document.querySelector ("#pokedex")
    for (const pokemon of detailPokemons) {
        const card$$ = document.createElement ("card")
        card$$.className = "card";
        const li$$ = document.createElement("li");
        li$$.innerHTML=` 
        <h3 class= "titulo" >${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}"> 
        <h4> #${pokemon.id}</h4> 
        <p>HP: ${pokemon.stats[0].base_stat}</p>
        <p>-EXP: ${pokemon.base_experience}</p>
        <p>-ATT: ${pokemon.stats[1].base_stat}</p> 
        <p>-DEF: ${pokemon.stats[2].base_stat}</p>
        <p>-ESP: ${pokemon.stats[3].base_stat}</p>` 
        ol$$.appendChild(card$$);
        card$$.appendChild(li$$)
        div$$.appendChild(ol$$);  
        
        card$$.addEventListener("click", () => { selectPlayer(pokemon) }) 
    }    
}
    document.addEventListener('keyup', e =>{
        if(e.target.matches(".buscador")){
            document.querySelectorAll(".card").forEach(pokemon =>{
            pokemon.textContent.toLocaleLowerCase().includes(e.target.value)
            ?pokemon.classList.remove('filtro')
            :pokemon.classList.add('filtro');
        })
    }
})

function selectPlayer(pokemon) {
    if (playerOne) {
        playerTwo = pokemon.name;
        readyForBattle();
    } else {
        playerOne = pokemon.name;
    }
}

function readyForBattle() {
    const button$$ = document.createElement("button");
    button$$.textContent = "BATTLE FRONTIER!"
    button$$.addEventListener('click', battle)
    div$$.appendChild(button$$)
}

function battle() {
    const randomNumber = Math.floor(Math.random() * 10);
    const button2$$ = document.createElement("button");
    div$$.appendChild(button2$$);

    if (randomNumber>100) {
        button2$$.textContent = "EL GANADOR ES: " + playerOne;
    } else {
        button2$$.textContent = "EL GANADOR ES: " + playerTwo;
    }

    let refresh = button2$$;
        refresh.addEventListener('click', _ => {
            location.reload();
        })
}


   




	


