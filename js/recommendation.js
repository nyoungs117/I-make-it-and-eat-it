 //nav

 document.addEventListener("DOMContentLoaded", () => {
    const revealerNav = window.revealer({
        revealElementSelector: ".nav-js",
        options: {
            anchorSelector: ".nav-btn-js",
        },
    });

    const actionBtn = document.querySelector(".nav-btn-js");
    actionBtn.addEventListener("click", () => {
        if (!revealerNav.isRevealed()) {
            revealerNav.reveal();
            actionBtn.setAttribute("data-open", true);
        } else {
            revealerNav.hide();
            actionBtn.setAttribute("data-open", false);
        }
    });
});



//testresult img 위치 값 계산

var proBoxes = document.querySelectorAll('.proBox');
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;
var radius = window.innerWidth * 1500 / 1920;
var angleStep = 360 / proBoxes.length;

proBoxes.forEach(function (proBox, i) {
    var angle = angleStep * i;
    var x = centerX + radius * Math.cos(angle * Math.PI / 180) - proBox.getBoundingClientRect().width / 2;
    var y = centerY + radius * Math.sin(angle * Math.PI / 180) - proBox.getBoundingClientRect().height / 2;
    proBox.style.transform = 'translate(' + (x - centerX) + 'px, ' + (y - centerY) + 'px)';
});

//testresult img 돌아가게
var testresult = document.querySelector('#testresult article');
var counter = 0;

window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
        counter += 15;
    } else if (event.deltaY > 0) {
        counter -= 15;
    }
    testresult.style.transform = "rotate(" + counter + "deg)";

}, false);


