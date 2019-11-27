//IIFE- prevents assessing of variables globally
var pokeRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  //Add new pokemon and corresponding button
  function addListItem(pokemon) {
    var $pokemonList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);

    buttonClick(button, pokemon);
  }

  //Fetch data from API and add(pokemon) to repository
  function loadList() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Load detailed data for a given Pokemon
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      //add details to items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Adds event listener on button click
  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })
  }

  //Loads 
  function showDetails(pokemon) { 
    pokeRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  //Add a pokemon to repository
  function add(pokemon) {
    //add conditional for format --- VALIDATING KEYS 
    // (REVIEW AGAIN)
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }
  
  //List all pokemon objects in repository 
  function getAll() {
    return repository;
  }

  //Function objects available outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


pokeRepository.loadList().then(function() {
  pokeRepository.getAll().forEach(function(pokemon) {
    pokeRepository.addListItem(pokemon);
  });
})



// forEach loop
// pokeRepository.getAll().forEach(function(pokemon){
//   var name = pokemon.name;
//   var height = pokemon.height;
//   var size;
  
//   if (height > 1) {
//     size = "Wow, that's big!";
//     document.write("<p>" + name + "- Height: " + height + " <--- " + size + "</p>");
//   } else {
//     document.write("<p>"+ name + "- Height: " + height + "</p>");
//   }
// });


// console.log(pokeRepository.addListItem({name: 'Mew', height: 0.4, type: ['psychic']}))
// console.log(pokeRepository.getAll());
console.log(pokeRepository.showDetails());