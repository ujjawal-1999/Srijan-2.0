const wsPrice = {
  stock_market: 100,
  digital_marketing: 0,
  cyber_security: 0,
}
// const tsPrice = 350;

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

function setPrice(){
  // if(tsCheckbox.checked){
  //   priceToBePaid += tsPrice;
  //   showSizeSelect(1);
  // }
  // else{
  //   showSizeSelect(0);
  // }
  for(let i=0 ; i<wsCheckbox.length ; i++){
    let ws = wsCheckbox[i];
    if( ws.checked ){
      priceToBePaid += wsPrice[ ws.id ];
    }
  }
  priceDisplay.value = parseInt(priceToBePaid);
}

function changePrice(){
  // console.log(this.checked);
    var chosen = 0;
    for(i=0;i<wsCheckbox.length;i++){
      if(wsCheckbox[i].checked)
      chosen++;
    }
    if(chosen>2){
      this.checked = false;
      return;
    }
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
    priceDisplay.value = parseInt(priceToBePaid);
}


for(var i=0; i<wsCheckbox.length; i++){
    var ws = wsCheckbox[i];
    ws.addEventListener('click', changePrice );
}

function validateForm(){
  var chosen = 0;
  for(i=0;i<wsCheckbox.length;i++){
    if(wsCheckbox[i].checked)
    chosen++;
  }
  if(chosen ==0){
    window.alert("Select atleast 1 Workshop");
    return false;
  }
}

// tsCheckbox.addEventListener('click', changePrice );
// var limit = 2;
// for(var i=0; i<wsCheckbox.length; i++){
//   var ws = wsCheckbox[i];
//   ws.addEventListener('change', function(evt){
    
//   if(ws[i].siblings(':checked').length >= limit) {
//       this.checked = false;
//   }
//   } );
// }

// for(var i=0; i<wsCheckbox.length; i++){
//   var ws = wsCheckbox[i];
  
//   ws.addEventListener('change', maxLimitCheck);
// }

// let stockMarket = document.querySelector("#stock_market")
// let workshopForm = document.querySelector("#workshop-form")
// function maxLimitCheck(){
//   var k = 0;
//   for(var i=0; i<wsCheckbox.length; i++){
//     if(wsCheckbox[i].checked === true ){
//       k++;
//     }
   
//   }
//   if(k>2){
//     return false
//   }
// }




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




{/* <script type="text/javascript"> */}
      function printDiv() {
        var printContents = document.getElementById("print").innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
        window.location = window.location.origin;
      }
    // </script>




{/* <div class="registration-event" id="hello">
      <div class="container event-form">
        <div>
          <section>
            <div class="text">
              <div class="form-heading">
                <h1>Register Yourself</h1>
              </div>
              <label>Name</label>
              <input type="text" id="student-name" name="name" required />
              <label>Email Id</label>
              <input type="email" id="student-email" name="email" required />
              <label>Phone number</label>
              <input type="number" id="student-number" name="phone" required />
              <button id="proceed" onclick="printDiv()">Proceed</button>
            </div>
          </section>
        </div>
      </div>
    </div> */}

    function onlyNumberKey(evt) {
          
      // Only ASCII charactar in that range allowed
      var ASCIICode = (evt.which) ? evt.which : evt.keyCode
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
          return false;
      return true;
  }