// 定義一個通用函數來載入 HTML
async function loadComponent(element, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    element.innerHTML = await response.text();
  } catch (err) {
    console.error(`無法載入組件 ${filePath}:`, err);
  }
}

class MainHeader extends HTMLElement {
  connectedCallback() {
    loadComponent(this, './components/header.html');
  }
}
class MainFooter extends HTMLElement {
  connectedCallback() {
    loadComponent(this, './components/footer.html');
  }
}
class MainShoppingCart extends HTMLElement {
  connectedCallback() {
    loadComponent(this, './components/shopping-cart.html');
  }
}

customElements.define('main-header', MainHeader);
customElements.define('main-footer', MainFooter);
customElements.define('main-shopping-cart', MainShoppingCart);

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.myProductSwiper')) {
    var swiper = new Swiper('.myProductSwiper', {
      slidesPerView: 2, // 手機版顯示 2 張
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next', // 指定下一張按鈕
        prevEl: '.swiper-button-prev' // 指定上一張按鈕
      },
      // 移除了 pagination 設定
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 30
        }
      }
    });
  }

  // 選取所有要放大的圖片連結
  const lightboxLinks = document.querySelectorAll(
    '.tf-product-media-main a.item'
  );

  lightboxLinks.forEach((link) => {
    const img = link.querySelector('img');

    // 建立一個新圖片物件來讀取原始尺寸
    const tempImg = new Image();
    tempImg.src = img.getAttribute('src') || img.src;

    tempImg.onload = function () {
      // 當圖片讀取完畢，把真實的寬高寫入 data 屬性
      link.setAttribute('data-pswp-width', tempImg.naturalWidth);
      link.setAttribute('data-pswp-height', tempImg.naturalHeight);
      link.setAttribute('href', tempImg.src); // 確保連結也是對的
    };
  });
});
