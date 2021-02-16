//IIFE- prevents assessing of constiables globally
const pokeRepository = (() => {
  const repository = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  const modalContainer = document.querySelector('#modal-container');

  //MODAL
  //show and specify content for modal
  function showModal(item) {
    //clear existing modal content
    modalContainer.innerHTML = '';

    const modal = document.createElement('div');
    modal.classList.add('modal');

    //button to close modal
    const closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = ' X ';
    closeButtonElement.addEventListener('click', hideModal);

    //pokemon name
    const nameElement = document.createElement('h1');
    nameElement.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);

    //pokemon image
    const imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', item.imageUrl);

    //pokemon height
    const heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height + 'm';

    //pokemon type
    const typeElement = document.createElement('p');
    typeElement.innerText = 'Type(s): ' + item.types

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  //Function to hide modal
  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  //close modal with ESC-key
  window.addEventListener('keydown', (e) =>{
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  //close modal when user clicks outside the modal
  window.addEventListener('click', (e) =>{
    const target = e.target;
    //closes when user clicks directly on overlay
    if (target === modalContainer) {
      hideModal();
    }
  });

  //DATA
  //Add new pokemon and corresponding button
  function addListItem(pokemon) {
    const pokemonList = document.querySelector('.pokemon-list');
    const listItem = document.createElement('li');
    const button = document.createElement('button');

    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    buttonClick(button, pokemon);
  }

  //Fetch data from API and add(pokemon) to repository
  function loadList() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        const pokemon = {
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
    const url = item.detailsUrl;
    return fetch(url).then(response => {
      return response.json();
    }).then(details => {
      //add details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
      for (let i = 0; i < details.types.length; i++){
        item.types.push(details.types[i].type.name);
      }
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Show pokemon details
  function showDetails(pokemon) {
    pokeRepository.loadDetails(pokemon).then(() => {
      console.log(pokemon);

      //MODAL FUNCTIONALITY HERE!
      showModal(pokemon);
    });
  }

  //Add event listener on button click
  function buttonClick (button, pokemon) {
    button.addEventListener('click', (e) => {
      showDetails(pokemon);
    });
  }

  //Add a pokemon to repository
  function add(pokemon) {
    //add conditional for format --- VALIDATING KEYS
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }

  //Return all pokemon objects in array
  function getAll() {
    return repository;
  }

  //function objects available outside IIFE
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

//Load data
pokeRepository.loadList().then(function() {
  pokeRepository.getAll().forEach(function(pokemon) {
    pokeRepository.addListItem(pokemon);
  });
});
