var inputVal = document.querySelector('#myInput')
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");
let head = document.querySelector('#table-head');
let body = document.querySelector('#body-part');
let val;

btn.addEventListener('click',(e)=>{
  val = inputVal.value;
  console.log(val)
  if(val !== ""){
    table.classList.remove('hidden')
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
  clear();
}
});

const clearit = function(){
  // inputVal.value = "";
  // tableHead.innerHTML = "";
  table.classList.add('hidden')
  body.innerText = ""
  head.innerText = ""


}

function getInputValue(val){
  console.log(val);
  return val;
}
// let input = getInputValue();

function getWordCount(val){
const myString1 = val;
console.log(myString1);
const capitalize = myString1.toLowerCase()
let desired = capitalize.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g,' ');
console.log(desired);
const split = desired.split(' ',capitalize.length);
console.log(split)
// const split1 = split.trim();
// console.log(split)
let arr= split;
let array = [];
arr.forEach((el)=>
{
if (el !== '')
{
  array.push(el)
}
})
console.log(array);
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
const clear = function(){
  // inputField.value = "";
  inputVal.value = "";

};
