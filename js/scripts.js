var pokeRepository = [
  {name:'Rapidash', height:1.7, types:['fire']},
  {name:'Pikachu', height:0.4, types:['electric']},
  {name:'Jigglypuff', height:0.5, types:['fairy','normal']}
];

for(var i = 0; i < pokeRepository.length; i++) {
  
    if (i == 0) {
    document.write ('<p>' + pokeRepository[i].name + ' (height: ' + pokeRepository[i].height +') - Wow, that\'s big!</p>')
  } else {
     document.write ('<p>' + pokeRepository[i].name + ' (height: ' + pokeRepository[i].height + ')</p>')
  }
}
