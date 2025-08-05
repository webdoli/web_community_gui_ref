const filterData = [
  { label: "Sort By: Price",   options: ["Price 1", "Price 2", "Price 3"] },
  { label: "Category: Strategy", options: ["Category 1", "Category 2", "Category 3"] },
  { label: "Platform: All",    options: ["Platform 1", "Platform 2", "Platform 3"] },
  { label: "# of Players: All", options: ["1 Player", "2 Players", "Multiplayer"] }
];

// custom.js
document.addEventListener('DOMContentLoaded', () => {
  initCustomDropdowns('#filter-container', filterData);
});

function initCustomDropdowns(containerSelector, dataArray) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  dataArray.forEach(({ label, options }) => {
    // 1) 드롭다운 래퍼
    const dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown';

    // 2) 버튼 (선택된 값을 표시)
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'custom-dropdown-btn';
    btn.textContent = label;
    dropdown.appendChild(btn);

    // 3) 옵션 리스트
    const ul = document.createElement('ul');
    ul.className = 'custom-dropdown-list';
    options.forEach(optText => {
      const li = document.createElement('li');
      li.className = 'custom-dropdown-option';
      li.textContent = optText;
      li.dataset.value = optText;
      ul.appendChild(li);

      // 옵션 클릭 시 버튼 텍스트 변경 및 리스트 닫기
      li.addEventListener('click', () => {
        btn.textContent = optText;
        ul.classList.remove('open');
        // 필요하다면 change 이벤트 디스패치
        dropdown.dispatchEvent(new CustomEvent('dropdownChange', {
          detail: { value: optText }
        }));
      });
    });
    dropdown.appendChild(ul);

    // 4) 버튼 클릭 시 리스트 토글
    btn.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      ul.classList.toggle('open');
    });

    container.appendChild(dropdown);
  });

  // 외부 클릭 시 모든 드롭다운 닫기
  document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
  document.querySelectorAll('.custom-dropdown-list.open')
    .forEach(ul => ul.classList.remove('open'));
}


/**
 * 2) 사이드바 토글 + 반응형 바디 스크롤 잠금
 * @param btnSel     - 메뉴 버튼 셀렉터
 * @param sidebarSel - 사이드바 셀렉터
 * @param mqString   - 미디어쿼리 문자열, 예: '(max-width:959px)'
 */
function initSidebarToggle(btnSel, sidebarSel, mqString) {
  const btn = document.querySelector(btnSel);
  const sidebar = document.querySelector(sidebarSel);
  const mq = window.matchMedia(mqString);
  if (!btn || !sidebar) return;

  // 버튼 클릭 처리
  btn.addEventListener('click', () => {
    btn.classList.toggle('is-active');
    sidebar.classList.toggle('is-show');
    if (mq.matches) {
      document.body.classList.toggle('no-scroll');
    }
  });

  // 초기 및 리사이즈 처리
  const syncState = e => {
    if (e.matches) {
      // 모바일 모드
      btn.classList.remove('is-active');
      sidebar.classList.remove('is-show');
      document.body.classList.remove('no-scroll');
    } else {
      // 데스크탑 모드
      btn.classList.add('is-active');
      sidebar.classList.add('is-show');
      document.body.classList.remove('no-scroll');
    }
  };
  mq.addEventListener('change', syncState);
  syncState(mq);
}
