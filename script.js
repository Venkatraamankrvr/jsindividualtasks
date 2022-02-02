// variables
const inputField = document.querySelector(".searchbox");
const btn = document.querySelector(".btn");
const result = document.querySelector(".final");

var hobbies = {
  "Steve": ['Fashion', 'Piano', 'Reading'],
  "Patty": ['Drama', 'Magic', 'Pets'], 
  "Chad": ['Puzzles', 'Pets', 'Yoga']
};

// to validate the input
btn.addEventListener("click", () => {
      const inputs = inputField.value;
      if(inputs !== ""){
        const last = findHobbyists( hobbies,inputs);
        if(last !== undefined){
          result.innerText = last; 
        }else if(last.length === 0){
          result.textContent = "Invalid Input" 
        }
      }else{
        result.textContent = "Invalid Input"
        return
      }
    });
    // findhobbylistfunction
function findHobbyists(hobbies, hobby1) {
  console.log(hobby1);
  
  let arr = [];
  const val = Object.keys(hobbies);
  let hobby = hobby1.toLocaleLowerCase()
  
  for (i = 0; i < val.length; i++) {
    if (
      hobbies[val[i]].find(
        (e) => e.toLocaleLowerCase() == hobby
      ) ) 
    {
      arr.push(val[i]);
    }
  }
  // for (let val in hobbies) {
  //   hobbies[val].includes(hobby) ? arr.push(val) : null;
  // }
  if(arr.length == 0 ){
    console.log('hi');
    // alert('hi')
    alert('invalid input');
  }
  else{
    console.log('dfghjk');
  }
  return arr;
}
// input object

