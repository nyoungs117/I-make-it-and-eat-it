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








//c_left를 클릭하면 c_right의 내용이 나오도록

$(document).ready(function(){
    $(".c_right div.cr").hide(); // 'div.cr'만 숨김
    $(".cr1").show(); // 페이지가 로드될 때 'div.cr1' 내의 'div.cr'를 보임

    $(".left_1").click(function(){
      $(".c_right div.cr").hide(); // 'div.cr'를 모두 숨김
      $(".cr1").show(); // 'div.cr1' 내의 'div.cr'를 보임
      $(this).animate({top: "-=3vw"}, 200).animate({top: "+=3vw"}, 200); // 클릭한 요소를 위로 3vw만큼 움직임
    });
    
    $(".left_2").click(function(){
      $(".c_right div.cr").hide(); // 'div.cr'를 모두 숨김
      $(".cr2").show(); // 'div.cr2' 내의 'div.cr'를 보임
      $(this).animate({top: "-=3vw"}, 200).animate({top: "+=3vw"}, 200); // 클릭한 요소를 위로 3vw만큼 움직임
    });
    
    $(".left_3").click(function(){
      $(".c_right div.cr").hide(); // 'div.cr'를 모두 숨김
      $(".cr3").show(); // 'div.cr3' 내의 'div.cr'를 보임
      $(this).animate({top: "-=3vw"}, 200).animate({top: "+=3vw"}, 200); // 클릭한 요소를 위로 3vw만큼 움직임
    });
    
    $(".left_4").click(function(){
      $(".c_right div.cr").hide(); // 'div.cr'를 모두 숨김
      $(".cr4").show(); // 'div.cr4' 내의 'div.cr'를 보임
      $(this).animate({top: "-=3vw"}, 200).animate({top: "+=3vw"}, 200); // 클릭한 요소를 위로 3vw만큼 움직임
    });
    
    $(".left_5").click(function(){
      $(".c_right div.cr").hide(); // 'div.cr'를 모두 숨김
      $(".cr5").show(); // 'div.cr5' 내의 'div.cr'를 보임
      $(this).animate({top: "-=3vw"}, 200).animate({top: "+=3vw"}, 200); // 클릭한 요소를 위로 3vw만큼 움직임
    });
});



