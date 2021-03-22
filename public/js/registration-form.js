const wsPrice = [300, 300, 300, 300];
const tsPrice = 350;

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
        priceToBePaid += wsPrice[ parseInt(this.id) - 1 ]
        else
        priceToBePaid -= wsPrice[ parseInt(this.id) - 1 ]
    }
    priceDisplay.innerHTML =   `INR ${priceToBePaid}/-`;
}

changePrice.call(tsCheckbox);

for(var i=0; i<wsCheckbox.length; i++){
    var ws = wsCheckbox[i];

    ws.addEventListener('click', changePrice );
}

tsCheckbox.addEventListener('click', changePrice );