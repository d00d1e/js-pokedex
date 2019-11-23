// Create IIFE to prevent repository array from being accessed globally
var pokeRepository = (function() {
  var repository = [
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, type: ['fire'] },
    { name: 'Squirtle', height: 0.5, type: ['water'] },
    { name: 'Blastoise', height: 1.6, type: ['water'] }
  ];

  //function to add pokemon to repository
  function add(pokemon) {
    //add conditional for format
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    } 
    //add else conditional here
  }
  
  //function to 
  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


// forEach loop
pokeRepository.getAll().forEach(function(pokemon){
  var name = pokemon.name;
  var height = pokemon.height;
  var size;
  
  if (height > 1) {
    size = "Wow, that's big!";
    document.write("<p>" + name + "- Height: " + height + " <--- " + size + "</p>");
  } else {
    document.write("<p>"+ name + "- Height: " + height + "</p>");
  }
});


