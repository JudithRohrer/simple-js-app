var pokeRepository = (function (){
  var repository = [
  {name:'Rapidash', height:1.7, types:['fire']},
  {name:'Pikachu', height:0.4, types:['electric']},
  {name:'Jigglypuff', height:0.5, types:['fairy','normal']}
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
    repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokeRepository.getAll().forEach(function(arrayItem) {
  document.write ('<p>' + arrayItem.name + ' (height: ' + arrayItem.height + ')');
  if (arrayItem.height > 1.0) document.write (' - Wow, that\'s big!');
  document.write ('</p>');
});
