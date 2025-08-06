// game-profile.js
document.addEventListener('DOMContentLoaded', () => {
  const menuBtns = document.querySelectorAll('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;

  // 메뉴 토글 함수
  function toggleMenu() {
    this.classList.toggle('is-active');
    sidebar.classList.toggle('is-show');
  }

  // 화면 크기 변화에 따른 바디 스크롤 제어
  const mq = window.matchMedia('(max-width: 959px)');
  function handleHeader(e) {
    menuBtns.forEach(btn => {
      btn.removeEventListener('click', toggleNoScroll);
      btn.removeEventListener('click', toggleMenu);
    });
    if (e.matches) {
      // 모바일일 때
      menuBtns.forEach(btn => {
        btn.classList.remove('is-active');
        sidebar.classList.remove('is-show');
        btn.addEventListener('click', toggleMenu);
        btn.addEventListener('click', toggleNoScroll);
      });
    } else {
      // 데스크톱일 때
      menuBtns.forEach(btn => {
        btn.classList.add('is-active');
        sidebar.classList.add('is-show');
        btn.addEventListener('click', toggleMenu);
      });
      body.classList.remove('no-scroll');
    }
  }

  function toggleNoScroll() {
    body.classList.toggle('no-scroll');
  }

  mq.addEventListener('change', handleHeader);
  handleHeader(mq);

  // (선택) 페이지 프리로더 제거
  const preloader = document.getElementById('page-preloader');
  if (preloader) {
    const spinner = preloader.querySelector('.spinner-loader');
    spinner && (spinner.style.opacity = 0);
    setTimeout(() => {
      preloader.style.opacity = 0;
      setTimeout(() => preloader.remove(), 500);
    }, 250);
  }

  // Swiper 초기화 (기존과 동일)
  const gallerySmall = new Swiper('.js-gallery-small .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.js-gallery-small .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      575: { slidesPerView: 2 },
      767: { slidesPerView: 3 },
      1599:{ slidesPerView: 4 }
    }
  });
  new Swiper('.js-gallery-big .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    thumbs: { swiper: gallerySmall }
  });
});
