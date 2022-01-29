const input1=document.querySelector('input')
const btn = document.querySelector(".btn");
let val;

// working of button
btn.addEventListener('click',(e)=>{
  isValid(val);
  finalResult();
})
// output showing in UI
function finalResult(val) {
	if(isValid()) {
	console.log('valid');
  document.querySelector(".result").innerHTML = '🎉 valid input';
	}
	else{
	console.log('invalid');
  document.querySelector(".result").innerHTML = '⛔️ invalid input';
	}
	}

  // validator function
 function isValid (){
    val = input1.value;
   console.log(val);
  if(!val)
  return false;
  // making an empty array
  let array = [];
  let match = {
    ')' : '(',
    '}' : '{',
    ']' : '['
  };
  for ( let i = 0;i<val.length;i++){
    
   let matchChar= match[val[i]];
if(matchChar){
  let last = array[array.length - 1];
    if(last == matchChar){
      // to remove the opener
      array.pop();
    }else{return false;}
}
else{
  // to add the opener into the array
  array.push(val[i]);
}
  }
  console.log(array);
  // when the stack empty,the return the output
  return (array.length === 0) ? true : false ;
//  document.querySelector(".result").innerHTML = isValid(val) ? 'valid' : 'invalid'; 
}



