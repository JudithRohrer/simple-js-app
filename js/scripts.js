var pokeRepository = (function (){
  var repository = [
    { name:'Rapidash', height:1.7, types:['fire'] },
    { name:'Pikachu', height:0.4, types:['electric'] },
    { name:'Jigglypuff', height:0.5, types:['fairy','normal'] }
  ];

  //ensures correct data input of repository
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).includes('name') && Object.keys(pokemon).includes('height') && Object.keys(pokemon).includes('types')) {
      repository.push(pokemon);
    }
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

  function showDetails(pokemon) {
   console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

var $newVariable = document.querySelector('.pokemon-list');

pokeRepository.getAll().forEach(function(arrayItem) {
  pokeRepository.addListItem(arrayItem);
});
