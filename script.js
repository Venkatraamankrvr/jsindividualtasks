var inputVal = document.querySelector('#myInput')
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");
let head = document.querySelector('#table-head');
let body = document.querySelector('#body-part');
let val;

btn.addEventListener('click',(e)=>{
  val = inputVal.value;
  
   getWordCount(val)
   let output = getWordCount(val) ;
   const key = Object.keys(output);
   const value = Object.values(output);
   table.classList.remove("hidden");
   const tableHead =  document.createElement('tr');
  tableHead.innerHTML = `<th> Words</th>
                     <th> Words count</th>
  `;
  head.appendChild(tableHead);
  
  for(let i = 0;i< key.length ; i++){
    const tablebody = document.createElement('tr');
    tablebody.innerHTML = `
    <td>${key[i]}</td>
    <td>${value[i]}</td>
    `;
body.appendChild(tablebody);

  }
  

})

function getInputValue(val){
  console.log(val);
  return val;
}
// let input = getInputValue();

function getWordCount(val){
const myString1 = val;
console.log(myString1);
const capitalize = myString1.toLowerCase()
const split = capitalize.split(' ',capitalize.length);
// const split1 = split.trim();
// console.log(split)
 let array = split;
  let map = {};
  // console.log(array);
  for (let i = 0; i < array.length; i++) 
  {
    let item = array[i];
    map[item] = (map[item] + 1) || 1; // key is map[item]
    console.log(map[item]);
  }
   return map ; 
   console.log(map);
   
  
  
}
// getWordCount(array); 

// console.log(getWordCount(array));

