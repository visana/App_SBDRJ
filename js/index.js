function toggleClassMenu(prevent) {    
    if(prevent) {
        event.preventDefault();
    }
    myMenu.classList.add("menu--animatable");
    if (!myMenu.classList.contains("menu--visible")) {
        myMenu.classList.add("menu--visible");
    } else {
        myMenu.classList.remove('menu--visible');
    }
}

function touchReturnPositionsX() {
    return event.changedTouches[0].screenX;
}

var start;
var move;
var end;


function menuTouchStart() {
    start = touchReturnPositionsX();
}

function menuTouchMove() {
    move = touchReturnPositionsX();
    if (move < start) {
        appMenu.style.left = '-' + (start - move) + 'px';
    } else {
        appMenu.style.left = '';
    }
}

function menuTouchEnd(func) {
    end = touchReturnPositionsX();
    if (end < start) {
        toggleClassMenu(false);
        setTimeout(function() {
            appMenu.removeAttribute('style');
        }, 301);
    }
}
function setCloseTouch(target, funcMove, funcStart, funcEnd) {
    target.addEventListener("touchmove", funcMove, {
        passive: true
    });
    target.addEventListener("touchstart", funcStart, {
        passive: true
    });
    target.addEventListener("touchend", funcEnd, {
        passive: true
    });
}
function OnTransitionEnd() {
    myMenu.classList.remove("menu--animatable");
}
var myMenu = document.querySelector(".menu");
var oppMenu = document.querySelector(".menu-icon");
var clsMenu = document.querySelector(".close");
var appMenu = document.querySelector(".app-menu");
if (myMenu && oppMenu && clsMenu && appMenu) {
    myMenu.addEventListener("transitionend", OnTransitionEnd, false);
    oppMenu.addEventListener("click", toggleClassMenu, false);
    clsMenu.addEventListener("click", toggleClassMenu, false);
    setCloseTouch(myMenu, menuTouchMove, menuTouchStart, menuTouchEnd);    
}

// SETUP PUSH
document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("81d314d6-e1a4-4ecc-a378-1207d58b2098")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);

  // StatusBar.backgroundColorByHexString("#000000");
}, false);




