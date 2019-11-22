var pokeRepository = [
  { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, type: ["fire"] },
  { name: "Squirtle", height: 0.5, type: ["water"] },
  { name: "Blastoise", height: 1.6, type: ["water"] }
];

// for loop
// function printRepository(list) {
//   for (var i = 0; i < list.length; i++) {
//     var name = list[i].name;
//     var height = list[i].height;
//     var size;
//     if (height > 1) {
//       size = "Wow, that's big!";
//       document.write("<p>" + name + "- Height: " + height + " <--- " + size + "</p>");
//     } else {
//       document.write("<p>"+ name + "- Height: " + height + "</p>");
//     }
//   }
// }

// printRepository(pokeRepository);

// forEach loop
pokeRepository.forEach(function(i){
  var name = i.name;
  var height = i.height;
  var size;
  
  if (height > 1) {
    size = "Wow, that's big!";
    document.write("<p>" + name + "- Height: " + height + " <--- " + size + "</p>");
  } else {
    document.write("<p>"+ name + "- Height: " + height + "</p>");
  }
});
