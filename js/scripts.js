var pokeRepository = (function (){
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    $newVariable.appendChild(listItem);
    button.classList.add('pokeButton');
    //shows pokemon details in the console, when pokemon is clicked
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
   pokeRepository.loadDetails(item).then(function (){
     console.log(item);});
  }

  function loadList(item) {
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
      item.types = Object.keys(details.types);
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

var $newVariable = document.querySelector('.pokemon-list');

pokeRepository.loadList().then(function() {
  // Now the data is loaded!
  pokeRepository.getAll().forEach(function(pokemon){
    pokeRepository.addListItem(pokemon);
  });
});
