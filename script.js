// from cities
const cities01 = [
  "Madurai","Tirunelveli","Trichy","Chennai","Coimbatore","Salem","Bangalore",];
// to cities
  const cities02 = [
  "Madurai","Tirunelveli","Trichy","Chennai","Coimbatore","Salem","Bangalore","Mumbai",];
// all months
  const allMonth = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",];
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
let array = [];
// to find the shortest route
let shortestroute = (openingobject, startpoint, endpoint) => {
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
  console.log(parent);
  while (parent) {
    console.log(parent);
    shortestPath.push(parent);
    parent = parentelements[parent];
  }
  shortestPath.reverse();
  //this is the shortestone path
  let results = {
    distance: currentdis[endpoint],
    path: shortestPath,
  };

  // return the shortestone path & the end node's distance from the start node
  console.log(results);
  return results;
};

let findingShortestDistance = (currentdis, visited) => {
  let shortestone = null;
  for (let node in currentdis) {
    let currentIsShortest =
      shortestone === null || currentdis[node] < currentdis[shortestone];
    if (currentIsShortest && !visited.includes(node)) {
      // if (inputObject[node] !== undefined) {
      shortestone = node;
      // } else {
      //   return;
      // }
    }
  }
  // console.log(shortestone, "short");
  return shortestone;
};

let finaloutput;
function calculatingDays(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const obj1 = inputObject[arr1[i]];
    if (obj1 !== undefined) {
      if (obj1[arr1[i + 1]] !== undefined) {
        array.push(obj1[arr1[i + 1]]);
      }
    }
  }
}

// getting the datas from user
const fetchingFrom = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createFrom);
};
// getting the user input from 
fetchingFrom(cities01);
const fetchingTo = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  to.insertAdjacentHTML("beforeend", createFrom);
};
fetchingTo(cities02);

// from btn adding the function
from.addEventListener("change", (e) => {
  fromInput = e.target.value;
  output.innerHTML = "";
});

// to btn adding the function
to.addEventListener("change", (e) => {
  toInput = e.target.value;
  output.innerHTML = "";
});

// 
btn.addEventListener("click", () => {
  let from = cities01[fromInput];
  let to = cities02[toInput];
  console.log(from, to);
  if (from === to && from === undefined && to === undefined) {
    output.innerHTML = "Please Enter a Valid Input";
    return;
  }
  if (from !== undefined && to !== undefined) {
    finaloutput = shortestroute(inputObject, from, to);

    if (
      finaloutput &&finaloutput.distance !== "Infinity"
    ) {
      calculatingDays(finaloutput.path);
      settingUI(finaloutput.path, finaloutput.distance, array);
    } else {
      output.innerHTML = "Route Not Found";
    }
  }
});
console.log(finaloutput);
// displaying the UI

// to show the functions
function showingDate(days) {
  let startDate = new Date();
  let endDate;
  let daysAddition = days;
  let count = 0;
  while (count < daysAddition) {
    endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    if (endDate.getDay() != 0 && endDate.getDay() != 6) {
      count++;
    }
  }
  return endDate;
}
// for making the superscript
const lastWord = function (d) {
  if (d > 3 && d < 21) return `${d}<sup>th</sup>`;
  switch (d % 10) {
    case 1:
      return `${d}<sup>st</sup>`;
    case 2:
      return `${d}<sup>nd</sup>`;
    case 3:
      return `${d}<sup>rd</sup>`;
    default:
      return `${d}<sup>th</sup>`;
  }
};
const settingUI = function (path, totaldays, numberPath) {
  // html content for route
  let htmltextcontentOutput = "";
  // fetching the date
  let startingDate = new Date();
  let dayFrom1 = startingDate.getDate();
  let dayFrom = lastWord(dayFrom1);
  // fetching the month
  let monthFrom = allMonth[startingDate.getMonth()];
  // showing the total days
  const dateShowing = showingDate(totaldays);
  let dayTo2 = dateShowing.getDate();
  let dayTo = lastWord(dayTo2);
  let monthTo = allMonth[dateShowing.getMonth()];
  // adding the from departute to arrival
  if (array.length !== 0) {
    path.forEach((e, index) => {
      if (index + 1 === path.length) {
        htmltextcontentOutput += `${e}<br>`;
      } else {
        htmltextcontentOutput += `${e} to `;
      }
    });
    // adding the input elements
    htmltextcontentOutput += `${dayFrom} ${monthFrom} to Arrive on ${dayTo} ${monthTo}`;
    output.innerHTML = htmltextcontentOutput;
  } else {
    output.innerHTML = "Route Not Found";
  }
// declaring the empty array
  array = [];
};
