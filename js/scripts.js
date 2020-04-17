var pokeRepository = (function (){
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $pokemonList = document.querySelector('.pokemon-list');
  var $modalContainer = document.querySelector('#modal-container');

  //ensures correct data input of repository
  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  //creates a button for every pokemon added to the repository
  function addListItem(pokemon) {
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    var listItem = document.createElement('li');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);
    button.classList.add('pokeButton');
    //shows pokemon details in the console, when pokemon is clicked
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
   loadDetails(item).then(function (){
     showModal(item);
    });
  }
  //fetches details of pokemon
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function(pokemon) {
        return pokemon.type.name;
      });
      item.abilities = details.abilities.map(function(pokemon) {
        return pokemon.ability.name;
      });


    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(item) {

    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);


    var titleElement = document.createElement('h1');
    titleElement.innerText = (item.name);

    var contentElementHeight = document.createElement('p');
    contentElementHeight.innerText = ('Height: ' + item.height);

    var contentElementTypes = document.createElement('p');
    contentElementTypes.innerText = ('Types: ' + item.types);

    var contentElementAbilities = document.createElement('p');
    contentElementAbilities.innerText = ('Abilities: ' + item.abilities);

    var imgElement = document.createElement('IMG');
    imgElement.setAttribute("src", item.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElementHeight);
    modal.appendChild(contentElementTypes);
    modal.appendChild(contentElementAbilities);
    modal.appendChild(imgElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }
  //to hide modal when user press esc in keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  //to hide modal when user clicks outsite modal
  $modalContainer.addEventListener('click', (e) => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokeRepository.loadList().then(function() {
  // Now the data is loaded!
  pokeRepository.getAll().forEach(function(pokemon){
    pokeRepository.addListItem(pokemon);
  });
});
