// DOM에서 버튼 요소를 가져옵니다.
const headerButton = document.querySelector('.header__button');

// DOM에서 타이틀 요소를 가져옵니다.
const contentTitle = document.querySelector('.content__title');
// DOM에서 h5 태그를 가져옵니다.
const contentH5 = document.querySelector('#content h5');

// 버튼을 클릭할 때 이벤트를 추가합니다.
let isTextVisible = true; // 텍스트가 보이는지 여부를 저장하는 변수

headerButton.addEventListener('click', function() {
    // contentTitle 요소의 visibility 속성을 변경하여 숨기거나 보이도록 설정합니다.
    if (isTextVisible) {
        contentTitle.style.visibility = 'hidden';
        contentH5.style.visibility = 'hidden';
    } else {
        contentTitle.style.visibility = 'visible';
        contentH5.style.visibility = 'visible';
    }
    
    // #content 내 이미지들의 가시성을 변경합니다.
    const contentImages = document.querySelectorAll('#content img');
    contentImages.forEach((img) => {
        img.style.display = isTextVisible ? 'none' : 'block';
    });
    
    // 텍스트 및 이미지 표시 여부를 반대로 변경합니다.
    isTextVisible = !isTextVisible;
});








document.addEventListener("DOMContentLoaded", () => {
  const revealerNav = window.revealer({
    revealElementSelector: ".nav-js",
    options: {
      anchorSelector: ".nav-btn-js",
    },
  });

  const actionBtn = document.querySelector(".nav-btn-js");
  const contentImgs = document.querySelectorAll(".content__img");

  actionBtn.addEventListener("click", () => {
    if (!revealerNav.isRevealed()) {
      revealerNav.reveal();
      actionBtn.setAttribute("data-open", "true");
      stopImageMotion(); // 이미지 모션 중단 함수 호출
    } else {
      revealerNav.hide();
      actionBtn.setAttribute("data-open", "false");
      resumeImageMotion();
    }
  });

  function stopImageMotion() {
    contentImgs.forEach((img) => {
      img.style.animationPlayState = "paused";
    });
  }

  function resumeImageMotion() {
    contentImgs.forEach((img) => {
      img.style.animationPlayState = "running";
    });
  }





  // 마우스 움직임에 따라 효과 추가
  const content = document.getElementById("content");
  let angle = 0;

  function loop() {
    angle += 0.03; // 각도 증가량

    // 8자 형태의 무한 루프 모션
    const x = Math.sin(angle) * 50;
    const y = Math.sin(angle * 2) * 20;

    content.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(loop);
  }

  loop(); // 무한 루프 시작




  // 일정 시간 후에 효과 숨기기
  setTimeout(() => {
    content.style.display = "none";
  }, 5000); // 5초(5000밀리초) 후에 숨김

  const body = document.body;

  // helper functions
  const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
  };

  // get the mouse position
  const getMousePos = (ev) => {
    let posx = 0;
    let posy = 0;
    if (!ev) ev = window.event;
    if (ev.pageX || ev.pageY) {
      posx = ev.pageX;
      posy = ev.pageY;
    } else if (ev.clientX || ev.clientY) {
      posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
      posy = ev.clientY + body.scrollTop + docEl.scrollTop;
    }
    return { x: posx, y: posy };
  };

  let mousePos = (lastMousePos = cacheMousePos = { x: 0, y: 0 });

  // update the mouse position
  window.addEventListener("mousemove", (ev) => (mousePos = getMousePos(ev)));

  const getMouseDistance = () =>
    MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

  class Image {
    constructor(el) {
      this.DOM = { el: el };
      this.defaultStyle = {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 0,
      };
      this.getRect();
    }

    getRect() {
      this.rect = this.DOM.el.getBoundingClientRect();
    }
    isActive() {
      return TweenMax.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
    }
  }

  class ImageTrail {
    constructor() {
      this.DOM = { content: document.querySelector(".content") };
      this.images = [];
      [...this.DOM.content.querySelectorAll("img")].forEach((img) =>
        this.images.push(new Image(img))
      );
      this.imagesTotal = this.images.length;
      this.imgPosition = 0;
      this.zIndexVal = 1;
      this.threshold = 100;
      requestAnimationFrame(() => this.render());
    }
    render() {
      let distance = getMouseDistance();
      cacheMousePos.x = MathUtils.lerp(
        cacheMousePos.x || mousePos.x,
        mousePos.x,
        0.1
      );
      cacheMousePos.y = MathUtils.lerp(
        cacheMousePos.y || mousePos.y,
        mousePos.y,
        0.1
      );

      if (distance > this.threshold) {
        this.showNextImage();

        ++this.zIndexVal;
        this.imgPosition =
          this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

        lastMousePos = mousePos;
      }

      let isIdle = true;
      for (let img of this.images) {
        if (img.isActive()) {
          isIdle = false;
          break;
        }
      }
      if (isIdle && this.zIndexVal !== 1) {
        this.zIndexVal = 1;
      }

      requestAnimationFrame(() => this.render());
    }
    showNextImage() {
      const img = this.images[this.imgPosition];
      TweenMax.killTweensOf(img.DOM.el);

      new TimelineMax()
        .set(
          img.DOM.el,
          {
            startAt: { opacity: 0, scale: 1 },
            opacity: 1,
            scale: 1,
            zIndex: this.zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2,
          },
          0
        )
        .to(
          img.DOM.el,
          0.9,
          {
            ease: Expo.easeOut,
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2,
          },
          0
        )
        .to(
          img.DOM.el,
          1,
          {
            ease: Power1.easeOut,
            opacity: 0,
          },
          0.4
        )
        .to(
          img.DOM.el,
          1,
          {
            ease: Quint.easeOut,
            scale: 0.2,
          },
          0.4
        );



        
    }
    showNextImage() {
      const img = this.images[this.imgPosition];
      TweenMax.killTweensOf(img.DOM.el);
    
      // 이미지 클래스에 따른 배경색 설정
      const colors = {
        ci1: '#CCCCCC',
        ci2: '#FDFFA8',
        ci3: '#C5FFF1',
        ci4: '#FFD3FB',
        ci5: '#ffffff'
      };
    
      // 이미지의 두 번째 클래스명 가져오기
      const imgClass = img.DOM.el.className.split(' ')[1];
    
      // 배경색 변경
      document.body.style.backgroundColor = colors[imgClass];
    
      // 이미지 등장 및 애니메이션 효과 적용
      new TimelineMax()
        .set(
          img.DOM.el,
          {
            startAt: { opacity: 0, scale: 1 },
            opacity: 1,
            scale: 1,
            zIndex: this.zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2,
          },
          0
        )
        .to(
          img.DOM.el,
          0.9,
          {
            ease: Expo.easeOut,
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2,
          },
          0
        )
        .to(
          img.DOM.el,
          1,
          {
            ease: Power1.easeOut,
            opacity: 0,
          },
          0.4
        )
        .to(
          img.DOM.el,
          1,
          {
            ease: Quint.easeOut,
            scale: 0.2,
          },
          0.4
        );
    }
  }





//nav창을 켜서 date-open이 true일 시에 이미지 안보이게 

  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll(".content__img"), resolve);
    });
  };
  
  preloadImages().then(() => {
    const navButton = document.querySelector(".header__button.nav-btn-js");
    const contentImages = document.querySelectorAll(".content__img");
  
    navButton.addEventListener("click", () => {
      const isOpen = navButton.getAttribute("data-open") === "true";
  
      if (isOpen) {
        contentImages.forEach((img) => {
          img.style.display = "none";
        });
      } else {
        contentImages.forEach((img) => {
          img.style.display = "block";
        });
      }
    });
  
    new ImageTrail();
  });
});







