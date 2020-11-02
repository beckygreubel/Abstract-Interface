// setting heights and widths for responsive viewing
var pymChild = new pym.Child();

let theBody = document.getElementsByTagName("body")[0];
theBody.style.height = window.innerHeight + "px";
let container = document.getElementById("container");
let containerHeight = window.innerHeight * 0.6;
container.style.height = containerHeight + "px";
let rowLength = window.innerWidth * 0.6;
let numRows = containerHeight / 20;
let numSquares = rowLength / 16;


// creating the rows
for (let i = 1; i < numRows; i++) {
  let row = document.createElement("div");
  row.className = "row";
  row.id = "row_" + i;
  row.style.length = rowLength + "px";

  // creating the squares and dots, j=i%8 allows for rotation so that each line starts with the next dot in line
  for (let j = i % 8; j < numSquares + (i % 8); j++) {
    const square = document.createElement("div");
    square.className = "square";
    square.id = "square_" + i + "_" + (j - (i % 8));
    const left = Math.floor(Math.random() * (50));
    const top = Math.floor(Math.random() * (50));
    
    // creating the dots
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.id = "dot_" + i + "_" + (j - (i % 8));
    dot.setAttribute('data-left', left);
    dot.setAttribute('data-top', top);
    dot.setAttribute('data-newLeft', left);
    dot.setAttribute('data-newTop', top);
    dot.setAttribute('data-scale', 1);
    
    dot.style.transform = 'translate('+left+'px, '+top+'px)'
    
    // hover function
    square.addEventListener('mouseover', function(){
      dot.classList.add('hovered');
      dot.style.backgroundColor = 'hsl('+200+i+', 100%, 50%)';
      setTimeout(function(){
        dot.classList.remove('hovered');
        dot.style.backgroundColor = 'black';
      }, 1500)
    })
    
    //assigning type of dot
    if (j % 8 == 1) {
      dot.className += " dot1";
    } else if (j % 8 == 2) {
      dot.className += " dot2";
    } else if (j % 8 == 3) {
      dot.className += " dot3";
    } else if (j % 8 == 4) {
      dot.className += " dot4";
    } else if (j % 8 == 5) {
      dot.className += " dot5";
    } else if (j % 8 == 6) {
      dot.className += " dot6";
    } else if (j % 8 == 7) {
      dot.className += " dot7";
    } else {
      dot.className += " dot8";
    }

    
    //appending to the DOM
    pymChild.sendHeight()
    square.appendChild(dot);
    row.appendChild(square);
    container.appendChild(row);
  }
}

// creating an array with all dot elements
const dots = document.querySelectorAll('.dot');

// grid mechanism
const gridSlider = document.getElementById("myGrid");
let initialGridValue = 1;

gridSlider.addEventListener('input', function(){
  let newValue = parseInt(this.value);
  dots.forEach(function(dot, index){
    const left = parseInt(dot.getAttribute('data-left'));
    const top = parseInt(dot.getAttribute('data-top'));
    
    let dim = {};
    
    if(newValue > 49){ 
      // added to set the maximum "snap"
      dim = {
        left : 0,
        top : 0,
        scale : parseInt(dot.getAttribute('data-scale')),
        }

    }else {      
        dim = {
          // using a percentage to calculate change in the slider
          left : left - (left*(newValue/50)),
          top : top - (top*(newValue/50)),
          scale : parseInt(dot.getAttribute('data-scale')),
        }
      }
    
    // added to limit translation
    if(dim.left < 0){
      dim.left = 0
    }
    
    if(dim.top < 0){
      dim.top = 0
    }
    
    //setting for the scaling function so that it has the current positions of dots
    dot.setAttribute('data-newLeft', dim.left);
    dot.setAttribute('data-newTop', dim.top);
    
    //create the transform using the dim attributes
    dot.style.transform = createTransform(dim);
  });
  initialGridValue = newValue;
})

// setting up size slider mechanism
let sizeSlider = document.getElementById("mySize");

sizeSlider.oninput = function(){
  let newValue = this.value;
  
  dots.forEach(function(dot){
    dot.setAttribute('data-scale', newValue/10) // setting the scaling number as value of slider/10
    const dim = {
      left : parseInt(dot.getAttribute('data-newLeft')),
      top : parseInt(dot.getAttribute('data-newTop')),
      scale : parseInt(dot.getAttribute('data-scale')),
      }
    // create and set the transform
    dot.style.transform = createTransform(dim);
  })
}

// transform function to create the online transform with scale and translate
function createTransform(dim){
  const left = dim.left;
  const top = dim.top;
  const scale = dim.scale
  
  return 'translate('+left+'px, '+top+'px) scale('+scale+')';
}
