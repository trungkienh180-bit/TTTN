// Mảng dữ liệu các slide của Banner đầu trang (chỉ có 2 slide thực tế có tài nguyên ảnh trong files)
const heroBanners = [
  {
    id: 1,
    bgImage: "images/BANNER ĐẦU TRANG/BỘ 1 (1).png",
    cardImage: "images/BANNER ĐẦU TRANG/BỘ 1 (2).png",
    caption: "HÀO KHÍ CHIẾN HỒN – siêu phẩm kiếm hiệp mobile PK rực lửa nay đã chính thức ra mắt.<br>Tải game miễn phí và chinh chiến ngay hôm nay!"
  },
  {
    id: 2,
    bgImage: "images/BANNER ĐẦU TRANG/BỘ 2 (1).png",
    cardImage: "images/BANNER ĐẦU TRANG/BỘ 2 (2).png",
    caption: "HÀO KHÍ DU HIỆP – siêu phẩm kiếm hiệp mobile phong cách vẽ tay cổ điển nay đã ra mắt.<br>Tải game miễn phí và chinh chiến ngay hôm nay!"
  }
];

// Mảng dữ liệu chứa thông tin game để render tự động
const fullGameList = [
  { id: 1, name: "HÀO KHÍ TAM QUỐC", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (1).png", badge: "", badgeColor: "", isActive: false, category: "RPG" },
  { id: 2, name: "HÀO KHÍ CHIẾN HỒN", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (2).png", badge: "GAME HOT", badgeColor: "#FF4D4D", isActive: false, category: "RPG" },
  { id: 3, name: "BOOM TANK", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (3).png", badge: "", badgeColor: "", isActive: false, category: "ACTION" },
  { id: 4, name: "HÀO KHÍ DU HIỆP", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (4).png", badge: "GAME MỚI", badgeColor: "#2ECC71", isActive: false, category: "RPG" },
  
  // Dữ liệu hiển thị thêm khi bấm nút XEM THÊM
  { id: 5, name: "HÀO KHÍ TAM QUỐC", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (1).png", badge: "", badgeColor: "", isActive: false, category: "RPG" },
  { id: 6, name: "HÀO KHÍ CHIẾN HỒN", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (2).png", badge: "GAME HOT", badgeColor: "#FF4D4D", isActive: false, category: "RPG" },
  { id: 7, name: "BOOM TANK", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (3).png", badge: "", badgeColor: "", isActive: false, category: "ACTION" },
  { id: 8, name: "HÀO KHÍ DU HIỆP", type: "THỂ LOẠI", image: "images/FRAME 2/CARD (4).png", badge: "GAME MỚI", badgeColor: "#2ECC71", isActive: false, category: "RPG" }
];

const gridGame = document.getElementById("grid-danh-sach-game");
const btnXemThem = document.getElementById("btn-xem-them");

function renderGames(games) {
  let htmlContent = "";
  games.forEach(game => {
    const activeClass = game.isActive ? "active-orange" : "";
    
    // Sử dụng ảnh ngọn lửa thực tế cho badge giống Figma
    let badgeHTML = "";
    if (game.badge === "GAME HOT") {
      badgeHTML = `<img src="images/gamehot_hover.png" alt="GAME HOT" class="badge-img-overlay">`;
    } else if (game.badge === "GAME MỚI") {
      badgeHTML = `<img src="images/gamemoi_hover.png" alt="GAME MỚI" class="badge-img-overlay">`;
    }

    htmlContent += `
      <div class="game-card ${activeClass}" data-game-id="${game.id}">
        ${badgeHTML}
        <div class="card-info">
          <h3 class="game-title">${game.name}</h3>
          <p class="game-category">${game.type}</p>
        </div>
        <div class="card-thumb">
          <img src="${game.image}" alt="${game.name}">
        </div>
        <div class="card-actions">
          <a href="#" class="btn-action btn-home">
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; margin-right: 6px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>TRANG CHỦ
          </a>
          <a href="#" class="btn-action btn-download">
            <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; display: inline-block; vertical-align: -2px; margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>TẢI XUỐNG
          </a>
        </div>
      </div>
    `;
  });
  if (gridGame) {
    gridGame.innerHTML = htmlContent;

    // Lắng nghe sự kiện click chọn card game
    const cards = gridGame.querySelectorAll(".game-card");
    cards.forEach(card => {
      card.addEventListener("click", (e) => {
        // Nếu click vào nút trang chủ hoặc tải xuống thì không đổi active card
        if (e.target.closest(".btn-action")) return;

        const gameId = parseInt(card.getAttribute("data-game-id"));

        // Xóa class active-orange cũ
        cards.forEach(c => c.classList.remove("active-orange"));
        fullGameList.forEach(g => g.isActive = false);

        // Active card mới
        card.classList.add("active-orange");
        const targetGame = fullGameList.find(g => g.id === gameId);
        if (targetGame) targetGame.isActive = true;
      });
    });
  }
}

// Hàm render dữ liệu Banner động
function renderHeroBanners() {
  const bgLayer = document.querySelector(".hero-bg-layer");
  const sliderContainer = document.querySelector(".slider-container");
  const sliderDots = document.querySelector(".slider-dots");
  if (!bgLayer || !sliderContainer || !sliderDots) return;

  let bgHtml = "";
  let cardHtml = "";
  let dotsHtml = "";

  // 1. Render slides (chỉ có 2 game có ảnh banner trong files)
  heroBanners.forEach((banner, index) => {
    const activeClass = index === 0 ? "active" : "";
    bgHtml += `<div class="bg-slide ${activeClass}" style="background-image: url('${banner.bgImage}');"></div>`;
    cardHtml += `
      <div class="slider-card-item ${activeClass}">
        <img src="${banner.cardImage}" alt="Banner Card ${index + 1}" class="banner-card-img">
        <p class="banner-caption">${banner.caption}</p>
        <button class="btn-banner-action">XEM THÊM</button>
      </div>
    `;
  });

  // 2. Định nghĩa cấu trúc 5 avatar điều hướng (Chỉ cho phép click vào avatar 2 và 3)
  const avatars = [
    { img: "images/BANNER ĐẦU TRANG/Ô NHỎ (1).png", slideIndex: -1 }, // Chai rượu (ko click)
    { img: "images/BANNER ĐẦU TRANG/Ô NHỎ (2).png", slideIndex: 0 },  // Hai nhân vật -> Slide 0 (Hào Khí Chiến Hồn) - Active mặc định
    { img: "images/BANNER ĐẦU TRANG/Ô NHỎ (5).png", slideIndex: 1 },  // Cô gái tóc trắng -> Slide 1 (Hào Khí Du Hiệp)
    { img: "images/BANNER ĐẦU TRANG/Ô NHỎ (3).png", slideIndex: -1 }, // Cô gái mũ đỏ (ko click)
    { img: "images/BANNER ĐẦU TRANG/Ô NHỎ (4).png", slideIndex: -1 }  // Chàng trai tóc trắng (ko click)
  ];

  avatars.forEach((avatar, index) => {
    const activeClass = index === 1 ? "active" : ""; // Avatar 2 (index 1) active mặc định vì tương ứng Slide 0
    const disabledClass = avatar.slideIndex === -1 ? "disabled" : "";
    const slideAttr = avatar.slideIndex !== -1 ? `data-slide-index="${avatar.slideIndex}"` : "";

    dotsHtml += `
      <div class="thumbnail-dot ${activeClass} ${disabledClass}" ${slideAttr} data-avatar-index="${index}">
        <img src="${avatar.img}" alt="Avatar ${index + 1}">
      </div>
    `;
  });

  bgLayer.innerHTML = bgHtml;
  sliderContainer.innerHTML = cardHtml;
  sliderDots.innerHTML = dotsHtml;
}

// Mảng dữ liệu tin tức sự kiện
const newsList = [
  {
    id: 1,
    image: "images/FRAME 4/TIN TỨC (1).png",
    title: "NẠP GAME XUYÊN BIÊN GIỚI CỰC DỄ VỚI APPLE PAY TRÊN SPAY",
    desc: "Nạp game quốc tế nhanh hơn với Apple Pay trên SPay. Thanh toán tiện lợi, bảo mật và tối ưu trải nghiệm cho game thủ mọi lúc mọi nơi.",
    time: "Tin tức | 02/06/2026, 14:30"
  },
  {
    id: 2,
    image: "images/FRAME 4/TIN TỨC (2).png",
    title: "MOMO TẶNG BẠN CODE SK NẠP GAME!",
    desc: "Nhận ngay code ưu đãi lên tới 50K khi nạp game qua Ví MoMo. Thanh toán cực nhanh chóng, tiện lợi săn quà hot với chi phí tiết kiệm giảm sức.",
    time: "Tin tức | 01/06/2026, 10:00"
  },
  {
    id: 3,
    image: "images/FRAME 4/TIN TỨC (3).png",
    title: "MOMO TẶNG 10K - CÁNG GAME THỦ CÀY RANK ĐUA TOP!",
    desc: "Nhận ngay quà tặng 10K từ MoMo để sẵn sàng cùng đồng đội cày rank, đua top cực sung. Nạp game nhanh chóng, săn quà dễ dàng!",
    time: "Tin tức | 30/05/2026, 09:00"
  }
];

// Hàm render Tin Tức - Sự Kiện động
function renderNews() {
  const newsContainer = document.querySelector(".news-list");
  if (!newsContainer) return;

  let newsHtml = "";
  newsList.forEach(news => {
    newsHtml += `
      <div class="news-item">
        <div class="news-img"><img src="${news.image}" alt="${news.title}"></div>
        <div class="news-detail">
          <h4>${news.title}</h4>
          <p class="news-desc">${news.desc}</p>
          <p class="news-time">${news.time}</p>
        </div>
      </div>
    `;
  });
  newsContainer.innerHTML = newsHtml;
}

// Thực thi render dữ liệu động
renderHeroBanners();
renderNews();

// Mặc định load toàn bộ 8 game (hiển thị thành 2 dòng, mỗi dòng 4 game chuẩn Figma)
let isExpanded = true;
if (gridGame) {
  renderGames(fullGameList);
}

// Xử lý sự kiện click nút xem thêm
if (btnXemThem) {
  btnXemThem.innerHTML = "THU GỌN &larr;"; // Mặc định hiển thị nút THU GỌN vì đã hiển thị 2 dòng
  btnXemThem.addEventListener("click", () => {
    if (!isExpanded) {
      renderGames(fullGameList); // Hiện toàn bộ 8 game (2 dòng)
      btnXemThem.innerHTML = "THU GỌN &larr;";
      isExpanded = true;
    } else {
      renderGames(fullGameList.slice(0, 4)); // Thu gọn về 4 game ban đầu (1 dòng)
      btnXemThem.innerHTML = "XEM THÊM &rarr;";
      isExpanded = false;
    }
    // Cập nhật lại bộ lọc khi thay đổi xem thêm/thu gọn
    const activeTag = document.querySelector(".filter-tags .tag.active");
    if (activeTag) {
      const categoryText = activeTag.textContent.trim().split(" ")[0].toUpperCase();
      if (categoryText !== "TẤT" && categoryText !== "ALL") {
        const filtered = fullGameList.filter(game => game.category === categoryText);
        renderGames(isExpanded ? filtered : filtered.slice(0, 4));
      }
    }
  });
}

// Xử lý sự kiện click lọc tag game
const tags = document.querySelectorAll(".filter-tags .tag");
tags.forEach(tag => {
  tag.addEventListener("click", () => {
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    const categoryText = tag.textContent.trim().split(" ")[0].toUpperCase();
    if (categoryText === "TẤT" || categoryText === "ALL") {
      renderGames(isExpanded ? fullGameList : fullGameList.slice(0, 4));
    } else {
      const filtered = fullGameList.filter(game => game.category === categoryText);
      renderGames(isExpanded ? filtered : filtered.slice(0, 4));
    }
  });
});

// Thực hiện nhúng file Header.html vào trang chính
fetch("Header.html")
  .then(res => res.text())
  .then(data => { 
    const container = document.getElementById("header-container");
    if (container) container.innerHTML = data; 
  })
  .catch(err => console.error("Lỗi nhúng Header:", err));

// Thực hiện nhúng file Footer.html vào trang chính
fetch("Footer.html")
  .then(res => res.text())
  .then(data => { 
    const container = document.getElementById("footer-container");
    if (container) container.innerHTML = data; 
  })
  .catch(err => console.error("Lỗi nhúng Footer:", err));

// Logic xử lý Banner Slider tự động chuyển động mượt mà (Đồng bộ ảnh nền và card trung tâm)
function initSlider() {
  const bgSlides = document.querySelectorAll(".hero-bg-layer .bg-slide");
  const cardSlides = document.querySelectorAll(".slider-container .slider-card-item");
  const dots = document.querySelectorAll(".banner-slider .thumbnail-dot");
  if (cardSlides.length === 0) return;

  let currentSlideIndex = 0;
  let slideInterval;

  function showSlide(index) {
    bgSlides.forEach(slide => slide.classList.remove("active"));
    cardSlides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlideIndex = (index + cardSlides.length) % cardSlides.length;
    
    if (bgSlides[currentSlideIndex]) bgSlides[currentSlideIndex].classList.add("active");
    if (cardSlides[currentSlideIndex]) cardSlides[currentSlideIndex].classList.add("active");
    
    // Tìm dot có data-slide-index tương ứng với slide hiện tại để active
    const activeDot = document.querySelector(`.thumbnail-dot[data-slide-index="${currentSlideIndex}"]`);
    if (activeDot) activeDot.classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, 5000); // Chuyển sau mỗi 5 giây cho mượt mà
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Lắng nghe sự kiện click trên các chấm chuyển slide (chỉ cho click nếu không bị disabled)
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const dotEl = e.currentTarget;
      if (dotEl.classList.contains("disabled")) return; // Bỏ qua nếu bị khóa click

      const targetIndex = parseInt(dotEl.getAttribute("data-slide-index"));
      showSlide(targetIndex);
      startSlideTimer(); // Reset timer khi người dùng click thủ công
    });
  });

  // Bắt đầu timer slider
  startSlideTimer();
}

// Khởi chạy slider
initSlider();