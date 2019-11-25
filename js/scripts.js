// Create IIFE to prevent repository array from being accessed globally
var pokeRepository = (function() {
  var repository = [
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, type: ['fire'] },
    { name: 'Squirtle', height: 0.5, type: ['water'] },
    { name: 'Blastoise', height: 1.6, type: ['water'] }
  ];

  //Function to add new pokemon and corresponding button
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

  //Function for event listener on button click
  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })
  }

  //
  function showDetails(pokemon) { 
    console.log(pokemon);
  }

  //Function to add a pokemon to repository
  function add(pokemon) {
    //add conditional for format
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }
  
  //Function to list all pokemon objects in repository 
  function getAll() {
    return repository;
  }

  //Function objects available outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();


pokeRepository.getAll().forEach(function(pokemon) {
  pokeRepository.addListItem(pokemon);
});

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


console.log(pokeRepository.addListItem({name: 'Mew', height: 0.4, type: ['psychic']}))
console.log(pokeRepository.getAll());