// from cities
const cities01 = [
  "Madurai","Tirunelveli","Trichy","Chennai","Coimbatore","Salem","Bangalore",];
// to cities
  const cities02 = [
  "Madurai","Tirunelveli","Trichy","Chennai","Coimbatore","Salem","Bangalore","Mumbai",];
// variables
const from = document.querySelector(".from");
const to = document.querySelector(".to");
const output = document.querySelector(".answer");
const btn = document.querySelector(".btn");
let fromInput;
let toInput;
let inputsVal;
// the object in which the neighbour nodes are mapped using Dijkstra’s Algorithm
const inputObject = {
  Bangalore: {
    Mumbai: 3,
  },
  Tirunelveli: {
    Madurai: 2,
  },
  Salem: {
    Bangalore: 2,
  },
  Trichy: {
    Chennai: 3,
  },
  Chennai: {
    Bangalore: 2,
    Mumbai: 5,
  },
  Madurai: {
    Tirunelveli: 2,
    Trichy: 2,
    Coimbatore: 3,
    Salem: 3,
  },
  Coimbatore: {
    Chennai: 3,
    Bangalore: 3,
  },
};
// empty array to store the visted nodes to give the route
let array = [];
// to find the shortest inputObject
let shortestroute = (openingobject,startpoint,endpoint) => {
  if (openingobject[startpoint] === undefined) {
    return;
  }
  // track distances from the start node using a object
  let currentdis = {};
  //setting infinity to calculate later
  currentdis[endpoint] = "Infinity";
  currentdis = Object.assign(currentdis, openingobject[startpoint]);
  // track paths using a  object
  let parentelements = { endpoint: null };
  for (let child in openingobject[startpoint]) {
    parentelements[child] = startpoint;
  }
  // visited array at intial to be empty
  let visited = [];
  let node = findingShortestDistance(currentdis, visited);
  while (node) {
    let distance = currentdis[node];
    let childElements = openingobject[node];
    for (let child in childElements) {
      if (String(child) === String(startpoint)) {
        continue;
      } else {
        let newdistance = distance + childElements[child];
        if (!currentdis[child] || currentdis[child] > newdistance) {
          // saving distance to current object
          currentdis[child] = newdistance;
          //recording the path
          parentelements[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = findingShortestDistance(currentdis, visited);
  }
  // using the stored paths from start node to end node
  // record the shortestone path
  let shortestPath = [endpoint];
  let parent = parentelements[endpoint];
  // console.log(parent);
  while (parent) {
    // console.log(parent);
    shortestPath.push(parent);
    parent = parentelements[parent];
  }
  shortestPath.reverse();
  //this is the shortestone path
  let results = {
    distance: currentdis[endpoint],
    path: shortestPath,
  };
  
  let dis = results.distance;
  // return the shortestone path & the end node's distance from the start node
  console.log(dis);
  return results;
};


let findingShortestDistance = (currentdis, visited) => {
  // at intialisation we cannot find the shortest distance so make it as null
  let shortestone = null;
  // if we see into the currentdis path whether the previous node is the shortest or not
  for (let node in currentdis) {
    // if there is no shortest distance availabe in neighbour node or the curretnode is whether less than the shortest distance
    let currentIsShortest = shortestone === null || currentdis[node] < currentdis[shortestone];
    // if the urretnode is whether less than the shortest distance and also visited array does not contains the neighbour node
    if (currentIsShortest && !visited.includes(node)) {
      shortestone = node;
    }
  }
  // console.log(shortestone, "short");
  return shortestone;
};

let finaloutput;
// fetching the datas from above input array cities01
const fetchFrom = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createFrom);
  output.classList.add('hidden')
 output.classList.remove('show');
  // to.insertAdjacentHTML("beforeend", createFrom);
};
fetchFrom(cities01);

// fetching the datas from above input array cities02
const fetchTo = function (data) {
    let createFrom = "";
    Object.keys(data).forEach((e, index) => {
      createFrom += `<option value = '${e}'>${data[e]}</option>`;
    });
    to.insertAdjacentHTML("beforeend", createFrom);
  };
  fetchTo(cities02);

  // getting the from input by using the from 
from.addEventListener("change", (e) => {
  fromInput = e.target.value;
 output.innerHTML = "";
 output.classList.add('hidden')
 output.classList.remove('show');
});

to.addEventListener("change", (e) => {
  toInput = e.target.value;
 output.innerHTML = "";
});

// for get the route btn adding the events.
btn.addEventListener("click", () => {
  let from = cities01[fromInput];
  let to = cities02[toInput];
  // console.log(from, to);
  // if the from or to ,anything is undefined,then return
  if (from !== undefined && to !== undefined) {
    finaloutput = shortestroute(inputObject, from, to);

    if (
      finaloutput &&
      // inputObject[finaloutput.path] !== undefined &&
      finaloutput.distance !== "Infinity"
    ) {
     settingUI(finaloutput.path, finaloutput.distance);
    } else {
     output.innerHTML = "route can't be found";
     output.classList.add('show');
   output.classList.remove('hidden');
    }
  }
});
// console.log(finaloutput);
var d = (new Date()).toString().split(' ').splice(1,3).join(' ');
console.log(d);
//  let currentdate = document.write(d);

// var d1 = (new Date(+1)).toString().split(' ').splice(1,3).join(' ');
// console.log(d1) ;
const settingUI = function (path, numberPath) {
  let htmltextcontentOutput = "";
    path.forEach((e, index) => {
      if (index + 1 === path.length) {
        htmltextcontentOutput += `${e} ✋🏻<br> `;
      } else {
        htmltextcontentOutput += `${e}  ➡️ `; //  ⏩  →
      }
    });
    function addDays(theDate, days) {
      // let currentdate
      return (new Date(theDate.getTime() + days*24*60*60*1000)).toString().split(' ').splice(1,3).join(' ');
    }
    var newDate = addDays(new Date(),finaloutput.distance)
//////

function getBusinessDays(dateObj, days) {
  for (var i = 0; i < days; i++) {
      if (days > 0) {
          switch (dateObj.getDay()) {
            // 6 being Saturday and 0 being Sunday.
            case 6, 0:
              dateObj.setDate(dateObj.getDate() + 2)
              break;
              // sunday.
            case 0:
                dateObj.setDate(dateObj.getDate() + 1)
                break;
                //5 = Friday.
            case 6:
                  dateObj.setDate(dateObj.getDate() + 2)
                  break;
                //handle Monday, Tuesday, Wednesday and Thursday!
            default:
                  dateObj.setDate(dateObj.getDate() + 1)
                  //console.log(dateObj)
                  break;
                }
            console.log('hioooo');
      }
  }
  return dateObj;
}

console.log('hii');
//Mon Dec 20 2021 18:56:01 GMT+0530 (India Standard Time)
console.log(getBusinessDays(new Date(), finaloutput.distance))
    let weekendday = (getBusinessDays(new Date(),finaloutput.distance)).toString().split(' ').splice(1,3).join(' ')
    console.log(weekendday);
// console.log(currentdate);

    htmltextcontentOutput = htmltextcontentOutput + `Totally it take <span style="font-weight:bold"; color:green"> ${numberPath} Days</span>
    to Reach <br>` +  `Starts at ${d}`+`,then reach on ${weekendday}`;
   output.innerHTML = htmltextcontentOutput;
   output.classList.add('show');
   output.classList.remove('hidden');
  //  output.classList.remove('hidden');
  array = [];
};


