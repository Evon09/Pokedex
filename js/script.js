//data pokemons
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');

//stats
const pokemonType = document.querySelector('.pokemon_type');
const pokemonAtk = document.querySelector('.pokemon_atk');
const pokemonDef = document.querySelector('.pokemon_def');
const pokemonHp = document.querySelector('.pokemon_hp');
const pokemonHei = document.querySelector('.pokemon_hei');
const pokemonWei = document.querySelector('.pokemon_wei');


//form 
const form = document.querySelector('.form');
const search = document.querySelector('.search');

//buttons
const btnP = document.querySelector('.btn-prev');
const btnN = document.querySelector('.btn-next');
const btnS = document.querySelector('.btn-shyne');


let idPokemon = 4;
let shyne = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){

        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Analisando...';
    pokemonNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonName.innerHTML = '- ' + data.name;
        pokemonNumber.innerHTML = '#' + data.id;
      
        pokemonType.innerHTML = '';

        for(let types=0; !!data['types'][types]; types++){
            if(types <= 0){
                pokemonType.innerHTML += data['types'][`${types}`]['type']['name']; 
            }else{
                pokemonType.innerHTML += ' / ' + data['types'][`${types}`]['type']['name'];
            }
        }

        pokemonAtk.innerHTML = data.stats['1'].base_stat;
        pokemonDef.innerHTML = data.stats['2'].base_stat;
        pokemonHp.innerHTML = data.stats['0'].base_stat;
        pokemonHei.innerHTML = data.height + 'cm';
        pokemonWei.innerHTML = data.weight + 'g';

        if(shyne){
            pokemonImg.src = data['sprites'].versions['generation-v']['black-white'].animated.front_default;//front_default 
        }else{
            pokemonImg.src = data['sprites'].versions['generation-v']['black-white'].animated.front_shiny;//front_shiny
        }
        search.value = '';
        idPokemon = data.id;
    
    } else {

        pokemonType.innerHTML = '';
        pokemonName.innerHTML = 'MissingNO';
        pokemonNumber.innerHTML = '#000';
        pokemonImg.src = './img/miss.gif';
        search.value = '';
        pokemonAtk.innerHTML = "????";
        pokemonDef.innerHTML = "????";
        pokemonHp.innerHTML = "????";
        pokemonHei.innerHTML = '8,45cm';
        pokemonWei.innerHTML = '10.02 kg';
        pokemonType.innerHTML += 'Bird/Normal'
    }


}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(search.value.toLowerCase()< 650 ){
        renderPokemon(search.value.toLowerCase());
    }
    
})

btnN.addEventListener('click', ()=>{
    if(idPokemon != 649){
        idPokemon++;
        renderPokemon(idPokemon);
    }
})

btnP.addEventListener('click', ()=>{
    if(idPokemon != 1){
        idPokemon--;
        renderPokemon(idPokemon);
    }
})

btnS.addEventListener('click', ()=>{
    if(shyne){
        shyne = 0;
        renderPokemon(idPokemon);
    }else{
        shyne = 1;
        renderPokemon(idPokemon);
    }
})

renderPokemon(idPokemon);

