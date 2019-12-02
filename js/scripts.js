//IIFE- prevents assessing of variables globally
var pokeRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  var $modalContainer = document.querySelector('#modal-container');
  
  //MODAL 
  //show and specify content for modal
  function showModal(item) {
    $modalContainer.innerHTML = '';
    
    var modal = document.createElement('div');
    modal.classList.add('modal');

    //close button to hide modal
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = ' X ';
    closeButtonElement.addEventListener('click', hideModal);

    //pokemon name
    var nameElement = document.createElement('h1');
    nameElement.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);

    //pokemon image
    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', item.imageUrl);

    //pokemon height
    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height + 'm';

    //pokemon type
    var typeElement = document.createElement('p');
    typeElement.innerText = 'Type(s): ' + item.types

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  //Function to hide modal 
  function hideModal(){
    $modalContainer.classList.remove('is-visible');
  }
    
  //close modal with ESC-key
  window.addEventListener('keydown', (e) =>{
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  //close modal when user clicks outside the modal
  window.addEventListener('click', (e) =>{
    var target = e.target;
    //closes when user clicks directly on overlay
    if (target === $modalContainer) {
      hideModal();
    }
  });

  //Add new pokemon and corresponding button
  function addListItem(pokemon) {
    var $pokemonList = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);

    buttonClick(button, pokemon);
  }

  //Fetch data from API and add(pokemon) to repository
  function loadList() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        // console.log(pokemon);
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
      //add details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
      for (var i = 0; i < details.types.length; i++){
        item.types.push(details.types[i].type.name);
      }
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Show pokemon details
  function showDetails(pokemon) { 
    pokeRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
      //ADD MODAL FUNCTIONALITY HERE!
      showModal(pokemon);
    });
  }

  //Add event listener on button click
  function buttonClick (button, pokemon) {
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
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
  
  //Return all pokemon objects in array 
  function getAll() {
    return repository;
  }

  //Function objects available outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

//
pokeRepository.loadList().then(function() {
  //Data now loaded
  pokeRepository.getAll().forEach(function(pokemon) {
    pokeRepository.addListItem(pokemon);
  });
})

//MODAL control



// console.log(pokeRepository.addListItem({name: 'Mew', height: 0.4, type: ['psychic']}))
// console.log(pokeRepository.getAll());