// variables
const inputField = document.querySelector(".searchbox");
const btn = document.querySelector(".btn");
const result = document.querySelector(".final");

// to validate the input
btn.addEventListener("click", () => {
      const inputs = inputField.value;
      console.log(findHobbyists(hobbies,inputs))
      const last = findHobbyists( hobbies,inputs);
      console.log(last)
      result.innerText = last;
     
    });

    // findhobbylistfunction
function findHobbyists(hobbies, hobby) {
  var arr = [];
  for (let val in hobbies) {
    hobbies[val].includes(hobby) ? arr.push(val) : null;
  }
  return arr;
}

// input object.
var hobbies = {
  "Steve": ['Fashion', 'Piano', 'Reading'],
  "Patty": ['Drama', 'Magic', 'Pets'], 
  "Chad": ['Puzzles', 'Pets', 'Yoga']
};

console.log(findHobbyists(hobbies, inputField));

