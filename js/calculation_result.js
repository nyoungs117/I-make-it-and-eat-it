$(document).ready(function () {
    // VARIABLES
    var calc = $('.calculator');
    var calcDisplay = calc.find('.calculator__display');
    var calcKeys = calc.find('.calculator__key');
    var calcButton = calc.find('.calculator__button');
    var calcClear = calc.find('.calculator__clear');
    var calcEqual = calc.find('.calculator__key--equal');
    var calcPower = calc.find('.calculator__power');
    var calcSpace = calc.find('.calculator__backspace');
    var currentInput = null; // 현재 입력 대상을 저장하는 변수

    // INIT CALC KEYS
    calcKeys.each(function () {
        var current = $(this).attr('value');
        $(this).text(current);
    });

    // 클릭한 .result1 또는 .result2의 input에 클릭한 값을 추가
    $('.result1 input, .result2 input').on('click', function () {
        currentInput = $(this); // 현재 클릭한 input을 저장
    });

    // 계산기 버튼 클릭 시 해당 input에 값을 추가
    calcButton.on('click', function () {
        if (currentInput) {
            var value = $(this).attr('value');
            currentInput.val(currentInput.val() + value);
            calcDisplay.val(calcDisplay.val() + value); // 계산기 디스플레이에도 값을 추가
        }
    });

    // 등호 버튼 클릭 시 결과값을 해당 input에 표시
    calcEqual.on('click', function () {
        if (currentInput) {
            var result = eval(currentInput.val());
            currentInput.val(result);
            calcDisplay.val(result); // 계산기 디스플레이에도 결과값을 표시
        }
    });

    // CLEAR INPUT
    calcClear.on('click', function () {
        if (currentInput) {
            currentInput.val('');
            calcDisplay.val(''); // 계산기 디스플레이도 초기화
        }
    });

    // POWER BUTTON
    calcPower.on('click', function () {
        if (currentInput) {
            var result = Math.pow(currentInput.val(), 3);
            currentInput.val(result);
            calcDisplay.val(result); // 계산기 디스플레이에도 결과값을 표시
        }
    });

    // BACKSPACE BUTTON
    calcSpace.on('click', function () {
        if (currentInput) {
            var value = currentInput.val().substring(0, currentInput.val().length - 1);
            currentInput.val(value);
            calcDisplay.val(value); // 계산기 디스플레이에도 값을 갱신
        }
    });
});








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





    //타이핑 효과 
    $(document).ready(function(){
        function typing(element, callback){
            $(element).css('visibility', 'visible');
            var lines = $(element).html().split('<br>');
            $(element).html('');
            var i = 0, j = 0;
            var timer = setInterval(function(){
                if (i < lines.length){
                    if (j < lines[i].length){
                        $(element).append(lines[i].charAt(j));
                        j++;
                    } else {
                        $(element).append('<br>');
                        i++;
                        j = 0;
                    }
                } else {
                    clearInterval(timer);
                    callback && callback();
                }
            }, 40); //타이핑 스피드 조절 가능
        }
        
        $('.n_left p, .n_right p').css('visibility', 'hidden');
        typing('.n_left p', function(){
            typing('.n_right p');
        });
    });
    
    




