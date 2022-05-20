const map = document.getElementById("map");
const body = document.getElementById("body");
const addInput = document.getElementById("addInput");
const header = document.getElementById("header");
const dotMenu = document.getElementById("dotMenu");
const dotMenu2 = document.getElementById("dotMenu2");
const addSum = document.getElementById("addSum");
const runInput = document.getElementById("runInput")
let mapPosition = map.getBoundingClientRect();
let headerHeight = header.getBoundingClientRect().height;
let dotList = [];
let sum = 0;
// pushes dot coordinates to dotList
function addDot() {
    stopRefresh(event);
    function stopRefresh(e) {
        e.preventDefault();
    }
    if (addInput.value !== "") {
        let numbers = addInput.value.split(" ");
        let x = numbers[0] * 25;
        let y = numbers[1] * 25;
        if (x <= 500 && y <= 500) {
            dotList.push(x / 25 + " " + y / 25);
            addInput.value = "";
            // runs map
            createMap();
        }
    }
}
// run algorithms
function run() {
    stopRefresh(event);
    function stopRefresh(e) {
        e.preventDefault();
    }
    let a = runInput.value
    if (a > 0) {
        createMap(a)
    }
}
// save configuration for later use
function saveSum() {
    stopRefresh(event);
    function stopRefresh(e) {
        e.preventDefault();
    }
    // header.setAttribute("list", dotList)
    // console.log(header.attributes[1].value)
    const dotDiv = document.createElement("div");
    dotDiv.setAttribute("class", "dotDiv2")
    dotMenu2.appendChild(dotDiv);
    const dotText = document.createElement("p")
    dotText.setAttribute("class", "dotText2");
    dotText.textContent = sum.toFixed(2);
    dotText.setAttribute("list", String(dotList))
    dotDiv.appendChild(dotText);
    const dotButton = document.createElement("button")
    dotButton.setAttribute("class", "dotButton2");
    dotButton.textContent = "+"
    dotDiv.appendChild(dotButton);
    dotText.addEventListener("click", function () {
        dotList = dotText.attributes[1].value.split(",");
        createMap()
    })
    dotButton.addEventListener("click", function () {
        dotDiv.remove()
    })
}
function createMap(a) {
    sum = 0
    let dots = document.querySelectorAll(".dot");
    dots.forEach(dot => {
        // refreshes by deleting all existing dots
        dot.remove();
    })
    for (let i = 0; i < dotList.length; i++) {
        let numbers = dotList[i].split(" ");
        let x = numbers[0] * 25;
        let y = numbers[1] * 25;
        const dot = document.createElement("div");
        dot.setAttribute("class", "dot");
        dot.setAttribute("id", x / 25 + " " + y / 25);
        body.appendChild(dot);
        let xzero = mapPosition.left - 7 + x;
        dot.style.left = xzero + "px";
        let yzero = mapPosition.bottom - 515 - headerHeight + y;
        dot.style.bottom = yzero + "px";
        dot.addEventListener("click", function () {
            // when Dot is pressed, deletes dot and runs map again to refresh
            let index = dotList.indexOf(dot.attributes[1].value);
            dotList.splice(index, 1);
            createMap();
        })
    }
    let dotDivs = document.querySelectorAll(".dotDiv")
    dotDivs.forEach(dotDiv => {
        dotDiv.remove();
    })
    let dotTexts = document.querySelectorAll(".dotText")
    dotTexts.forEach(dotText => {
        dotText.remove();
    })
    let dotInputs = document.querySelectorAll(".dotButton")
    dotInputs.forEach(dotInput => {
        dotInput.remove();
    })
    for (let i = 0; i < dotList.length; i++) {
        let numbers = dotList[i].split(" ");
        let x = numbers[0]
        let y = numbers[1]
        const dotDiv = document.createElement("div");
        dotDiv.setAttribute("class", "dotDiv")
        dotMenu.appendChild(dotDiv);
        const dotText = document.createElement("p")
        dotText.setAttribute("class", "dotText");
        dotDiv.appendChild(dotText);
        const dotInput = document.createElement("input")
        dotInput.setAttribute("class", "dotInput");
        dotInput.placeholder = "0"
        dotInput.type = "text"
        dotDiv.appendChild(dotInput);
        dotText.textContent = x + " " + y
        dotText.setAttribute("name", x + " " + y);
        dotText.addEventListener("click", function () {
            middleIndex = dotList.indexOf(dotText.attributes[1].value)
            index = dotInput.value - 1
            dotAtIndex = dotList[index]
            if (dotList[index] != "" && dotInput.value > 0) {
                dotList[index] = dotText.attributes[1].value
                dotList[middleIndex] = dotAtIndex
            }
            createMap();
        })
    }
    let lines = document.querySelectorAll(".line")
    lines.forEach(line => {
        // refreshes by deleting all existing lines
        line.remove();
    })
    if (dotList.length > 1) {
        for (i = 0; i < dotList.length - 1; i++) {
            dot1 = dotList[i].split(" ");
            dot2 = dotList[i + 1].split(" ");
            x1 = parseFloat(dot1[0]);
            y1 = parseFloat(dot1[1]);
            x2 = parseFloat(dot2[0]);
            y2 = parseFloat(dot2[1]);
            createLines(x1, y1, x2, y2);
        }
    }
    if (dotList.length > 2) {
        dot1 = dotList[dotList.length - 1].split(" ");
        dot2 = dotList[0].split(" ");
        x1 = parseFloat(dot1[0]);
        y1 = parseFloat(dot1[1]);
        x2 = parseFloat(dot2[0]);
        y2 = parseFloat(dot2[1]);
        createLines(x1, y1, x2, y2);
    }
    function createLines(x1, y1, x2, y2) {
        hypotenuse = (((y2 - y1) ** 2) + ((x2 - x1) ** 2)) ** (1 / 2);
        sum += hypotenuse;
        let tan = Math.abs(y2 - y1) / Math.abs(x2 - x1);
        atanDeg = Math.atan(tan) * 180 / Math.PI;
        let xzero = 0;
        let yzero = 0;
        if (y2 > y1 && x2 > x1) {
            xzero = mapPosition.left + x1 * 25 + 5;
            yzero = mapPosition.bottom - 506 - 5 - headerHeight + y1 * 25;
            atanDeg = -atanDeg;
        }
        else if (y2 > y1 && x2 < x1) {
            xzero = mapPosition.left + x1 * 25 + 5;
            yzero = mapPosition.bottom - 501 - headerHeight + y1 * 25;
            atanDeg = atanDeg - 180;
        }
        else if (y2 < y1 && x2 > x1) {
            xzero = mapPosition.left + x2 * 25 + 5;
            yzero = mapPosition.bottom - 501 - headerHeight + y2 * 25;
            atanDeg = atanDeg - 180;
        }
        else if (y2 < y1 && x2 < x1) {
            xzero = mapPosition.left + x2 * 25 + 5;
            yzero = mapPosition.bottom - 506 - 5 - headerHeight + y2 * 25;
            atanDeg = -atanDeg;
        }
        else if (x1 == x2 && y1 > y2) {
            xzero = mapPosition.left + x2 * 25 + 8;
            yzero = mapPosition.bottom - 506 - 5 - headerHeight + y2 * 25;
            atanDeg = -90;
        }
        else if (x1 == x2 && y1 < y2) {
            xzero = mapPosition.left + x2 * 25 + 8;
            yzero = mapPosition.bottom - 501 - headerHeight + y1 * 25;
            atanDeg = -90;
        }
        else if (y1 == y2 && x1 > x2) {
            xzero = mapPosition.left + x2 * 25 + 5;
            yzero = mapPosition.bottom - 506 - 3 - headerHeight + y2 * 25;
            atanDeg = 0;
        }
        else if (y1 == y2 && x1 < x2) {
            xzero = mapPosition.left + x1 * 25 + 5;
            yzero = mapPosition.bottom - 506 - 3 - headerHeight + y2 * 25;
            atanDeg = 0;
        }
        // create lines between dots
        const line = document.createElement("div");
        line.setAttribute("class", "line");
        body.appendChild(line);
        line.style.width = hypotenuse * 25 + "px";
        line.style.left = xzero + "px";
        line.style.bottom = yzero + "px";
        line.style.transform = `rotate(${atanDeg}deg)`;
        line.style.transformOrigin = "bottom left";
    }
    addSum.textContent = sum.toFixed(4);
    if (a == 1) {
        a = 0
        function swap(index1, index2) {
            let placeHolder = dotList[index1 - 1]
            dotList[index1 - 1] = dotList[index2 - 1]
            dotList[index2 - 1] = placeHolder
        }
        console.log(dotList)
        createMap()
    }
    else if (a == 2) {
    // Vizualization of the Travelling Sallesman Problem, Flashing Paths
        a = 0
        let i = 0
        while (i < 100) {
            setTimeout(function () {
                shuffleArray(dotList)
            }, 1000 * i);
            i += 1
        }
    }
    else if (a == 3) {
    // Solves the Problem Randomly
        a = 0
        let shorterList = String(dotList)
        let shorter = sum
        for (let i = 0; i < 500; i++) {
            shuffleArray(dotList)
            if (sum < shorter) {
                shorter = sum
                shorterList = String(dotList)
            }
        }
        dotList = shorterList.split(",");
        createMap()
    }
    // shuffles DotList array
    function shuffleArray(dotList) {
        for (var i = dotList.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = dotList[i];
            dotList[i] = dotList[j];
            dotList[j] = temp;
            createMap()
        }
    }
}
