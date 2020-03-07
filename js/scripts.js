var pokeRepository = [
  {name:'Rapidash', height:1.7, types:['fire']},
  {name:'Pikachu', height:0.4, types:['electric']},
  {name:'Jigglypuff', height:0.5, types:['fairy','normal']}
];

for(var i = 0; i < pokeRepository.length; i++) {

  document.write ('<p>' + pokeRepository[i].name + ' (height: ' + pokeRepository[i].height + ')');

  if (pokeRepository[i].height > 1.0) document.write ('- Wow, that\'s big!');
  document.write ('</p>');
}

Object.keys(pokeRepository).forEach(function(property) {
    document.write(pokeRepository[property].name + ' (height: ' + pokeRepository[property].height + ' / types: '+ pokeRepository[property].types + ')<br>');
});
