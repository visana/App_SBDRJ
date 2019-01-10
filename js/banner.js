var number = 0;
var direction = 'center';
var windowWidthTransition = window.innerWidth * 2;

function setMargin() {
    var value = number;
    myBanner.style.marginLeft = value + 'px';
}

function lessBanner() {
    number -= windowWidthTransition;
    setMargin();
}

function moreBanner() {
    number += windowWidthTransition;
    setMargin();
}

function limitBanner(target, limit, oposto) {
    var disable = document.querySelector('.arrow.' + target);
    var enable = document.querySelector('.arrow.' + oposto);

    if (limit) {
        disable.style.zIndex = '-9999';
        disable.style.opacity = '0';
    }
    enable.style.zIndex = '1';
    enable.style.opacity = '1';
}
function bannerFunc(event, key) {
    var value;
    
    var target = event.target;

    var left = target.classList.contains('left');
    var right = target.classList.contains('right');
    
    if ((left || key === 'left') && direction !== 'left' ) {
        lessBanner();

        value = parseInt(myBanner.style.marginLeft) - 1;
        limitBanner('left', value < -windowWidthTransition, 'right');
        direction = 'left';
    } else if ((right || key === 'right') && direction !== 'right') {
        moreBanner();

        value = parseInt(myBanner.style.marginLeft) + 1;
        limitBanner('right', value > windowWidthTransition, 'left');
        direction = 'right';
    }
    
    if(parseInt(myBanner.style.marginLeft) === 0){
        direction = 'center';
    }
}



function bannerTouchStart() {
    
        start = touchReturnPositionsX();
        initialMargin = parseInt(myBanner.style.marginLeft) || 0;
        myBanner.style.transition = 'none';
    
 }

function bannerTouchMove() {
    move = touchReturnPositionsX();
    var moveElement = (move - start) + initialMargin;
    if( moveElement < windowWidthTransition && moveElement > -windowWidthTransition ){
        myBanner.style.marginLeft =  moveElement + 'px';
    }
    
}


function bannerTouchEnd() {
    end = touchReturnPositionsX();
    
    myBanner.style.transition = '';
    if(start < end){
            bannerFunc(event, 'right');
    }else if(start > end){
            bannerFunc(event, 'left');
    }
    
}


var myBanner = document.querySelector('.banner-list');
var btns = document.querySelectorAll('.servico-bar .arrow');

setCloseTouch(myBanner, bannerTouchMove, bannerTouchStart, bannerTouchEnd);

for (var index = 0; index < btns.length; index++) {
    var element = btns[index];
    element.addEventListener('click', bannerFunc, false);
}