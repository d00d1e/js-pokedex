var pokeRepository = [
  { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, type: ["fire"] },
  { name: "Squirtle", height: 0.5, type: ["water"] },
  { name: "Blastoise", height: 1.6, type: ["water"] }
];

for (var i = 0; i < pokeRepository.length; i++) {
  var name = pokeRepository[i].name;
  var height = pokeRepository[i].height;
  var size;
  if (height > 1) {
    size = "Wow, that's big!";
    document.write(name + "- Height: " + height + " <--- " + size + "</br>");
  } else {
    document.write(name + "- Height: " + height + "</br>");
  }
}
