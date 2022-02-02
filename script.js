// variables
const staricon = document.querySelectorAll(".icon");
const output = document.querySelector(".result")
// function to make active state
function activeState(val) {
    // console.log(val);
    for (let i = 0; i <= val; i++) {
        // console.log(i);
        staricon[i].classList.add("active");
        console.log(staricon[i]);
    }
}

staricon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
        staricon.forEach((Element) => {
        Element.classList.remove("active")
        console.log(Element.id)
        let res = Number( icon.id ) + 1
        output.innerHTML = ` ✴️ ${res}Star Ratings`;
        console.log('removing')}); 
        activeState(icon.id);
        output.classList.remove('hidden')
        output.classList.add('show')
        console.log(icon.id);
    });
});
