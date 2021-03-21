const wsPrice = [300, 300, 300, 300];
const tsPrice = 350;

var priceToBePaid = 0;

var tsCheckbox = document.querySelector('#tsCheckbox');
var wsCheckbox = document.querySelectorAll(".ws");

var priceDisplay = document.querySelector('.amount');

function changePrice(){
    if(this.id == 'tsCheckbox'){
        if(this.checked)
        priceToBePaid += tsPrice;
        else
        priceToBePaid -= tsPrice;
    }
    else{
        if(this.checked)
        priceToBePaid += wsPrice[ parseInt(this.id) - 1 ]
        else
        priceToBePaid -= wsPrice[ parseInt(this.id) - 1 ]
    }
    priceDisplay.innerHTML =   `INR ${priceToBePaid}`;
}

changePrice.call(tsCheckbox);

for(var i=0; i<wsCheckbox.length; i++){
    var ws = wsCheckbox[i];

    ws.addEventListener('click', changePrice );
}

tsCheckbox.addEventListener('click', changePrice );
