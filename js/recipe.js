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






let scrollimg = document.getElementById('scrollimg');

setInterval(function() {
    let firstChild = scrollimg.firstElementChild;
    let cloneChild = firstChild.cloneNode(true);
    scrollimg.appendChild(cloneChild);
    scrollimg.removeChild(firstChild);
}, 50000); /* 애니메이션 시간과 동일하게 설정 */
