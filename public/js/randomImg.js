const imgArr = ['./img/1.jpg', './img/2.jpeg', './img/2.jpg', './img/3.jpg']
const cardImgArr = document.querySelectorAll('.card-img')
for( i = 0;i< cardImgArr.length;i++){
    randIdx = Math.floor(Math.random() * 4)     // returns a random integer from 0 to 100;
    cardImgArr[i].src = imgArr[randIdx]
}