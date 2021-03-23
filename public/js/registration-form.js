const wsPrice = {
  a: 300,
  b: 300,
  c: 300,
  d: 300
}
const tsPrice = 350;

// const wsPrice = {
//   workshopX : 300,
//   workshopY : 400,
//   workShopZ : 500
// }
// price+=wsPrice[name]

var priceToBePaid = 0;

const tsCheckbox = document.querySelector('#tsCheckbox');
const wsCheckbox = document.querySelectorAll(".ws");
const sizeSelect = document.querySelector('.size');

const priceDisplay = document.querySelector('.amount');

function showSizeSelect(status){
    if( status ){
        sizeSelect.style.display = 'block';
    }
    if( !status ){
        sizeSelect.style.display = 'none';
    }
}

function changePrice(){
    if(this.id == 'tsCheckbox'){
        if(this.checked){
            priceToBePaid += tsPrice;
            showSizeSelect(1);
        }
        else{
            priceToBePaid -= tsPrice;
            showSizeSelect(0)
        }
    }
    else{
        if(this.checked)
        priceToBePaid += wsPrice[ this.id ]
        else
        priceToBePaid -= wsPrice[ this.id ]
    }
    priceDisplay.value =   parseInt(priceToBePaid);
}

changePrice.call(tsCheckbox);

for(var i=0; i<wsCheckbox.length; i++){
    var ws = wsCheckbox[i];

    ws.addEventListener('click', changePrice );
}

tsCheckbox.addEventListener('click', changePrice );




const content = document.querySelectorAll('section');
const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const idlePeriod = 100;
const animationDuration = 1000;

let lastAnimation = 0;
let index = 0;


const toggleText = (index, state) => {
  if (state === 'show') {
    content[index].querySelector('.text').classList.add('show-section');  
  } else {
    content[index].querySelector('.text').classList.remove('show-section');  
  } 
}

toggleText(0, 'show');

prev.addEventListener('click', () => {
  if (index < 1) return;
  toggleText(index, 'hide');
  index--;
  
  content.forEach((section, i) => {
    if (i === index) {
      toggleText(i, 'show');
      section.scrollIntoView({behavior: "smooth"});
    }
  });
})

next.addEventListener('click', () => {
  if (index > 2) return;
  toggleText(index, 'hide');
  index++;
  content.forEach((section, i) => {
    if (i === index) {
      toggleText(i, 'show');
      section.scrollIntoView({behavior: "smooth"});
    }
  })
})

document.addEventListener('wheel', event => {
  var delta = event.wheelDelta;
  var timeNow = new Date().getTime();
  // Cancel scroll if currently animating or within quiet period
  if(timeNow - lastAnimation < idlePeriod + animationDuration) {
    event.preventDefault();
    return;
  }
  
  if (delta < 0) {
    var event = new Event('click');
    next.dispatchEvent(event);
  } else {
    var event = new Event('click');
    prev.dispatchEvent(event);
  }
  
  lastAnimation = timeNow;
}) 




