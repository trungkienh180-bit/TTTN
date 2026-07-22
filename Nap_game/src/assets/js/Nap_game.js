document.addEventListener("DOMContentLoaded", function () {
    // Game List Logic
    const gameGrid = document.getElementById("gameGrid");
    const games = [
        { isSpecial: true, name: "MYE COIN", img: "../assets/images/Nap_Game/MYECOIN.png" },
        { isSpecial: false, name: "HÀO KHÍ CHIẾN HỒN", img: "../assets/images/Nap_Game/CARD(4).png" },
        { isSpecial: false, name: "HÀO KHÍ DU HIỆP", img: "../assets/images/Nap_Game/CARD(1).png" },
        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "CHÂN VƯƠNG", img: "../assets/images/Nap_Game/CARD(3).png" },

        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "HÀO KHÍ CHIẾN HỒN", img: "../assets/images/Nap_Game/CARD(4).png" },
        { isSpecial: false, name: "HÀO KHÍ DU HIỆP", img: "../assets/images/Nap_Game/CARD(1).png" },
        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "CHÂN VƯƠNG", img: "../assets/images/Nap_Game/CARD(3).png" },

        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "HÀO KHÍ CHIẾN HỒN", img: "../assets/images/Nap_Game/CARD(4).png" },
        { isSpecial: false, name: "HÀO KHÍ DU HIỆP", img: "../assets/images/Nap_Game/CARD(1).png" },
        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "CHÂN VƯƠNG", img: "../assets/images/Nap_Game/CARD(3).png" },

        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "HÀO KHÍ CHIẾN HỒN", img: "../assets/images/Nap_Game/CARD(4).png" },
        { isSpecial: false, name: "HÀO KHÍ DU HIỆP", img: "../assets/images/Nap_Game/CARD(1).png" },
        { isSpecial: false, name: "BOOM TANK", img: "../assets/images/Nap_Game/CARD(2).png" },
        { isSpecial: false, name: "CHÂN VƯƠNG", img: "../assets/images/Nap_Game/CARD(3).png" }
    ];

    if (gameGrid) {
        games.forEach(game => {
            const col = document.createElement("div");
            col.className = "col";

            if (game.isSpecial) {
                col.innerHTML = `
                    <div class="game-card-container cursor-pointer text-center" onclick="switchView('view-nap-mye-coin')">
                        <div class="game-card shadow-sm mb-2">
                            <img src="${game.img}" class="w-100 h-100" style="object-fit: cover;" alt="Coin">
                        </div>
                        <div class="game-title" style="color: #f97316;">${game.name}</div>
                    </div>
                `;
            } else {
                col.innerHTML = `
                    <div class="game-card-container cursor-pointer text-center" onclick="switchView('view-chon-goi-nap')">
                        <div class="game-card shadow-sm mb-2 position-relative">
                            <img src="${game.img}" class="w-100 h-100" style="object-fit: cover;" alt="${game.name}">
                        </div>
                        <div class="game-title">${game.name}</div>
                    </div>
                `;
            }
            gameGrid.appendChild(col);
        });
    }

    // Packages Logic
    const packageGrid = document.getElementById("packageGrid");
    const totalPriceEl = document.getElementById("totalPrice");

    const packages = [
        { id: "pkg1", price: 20000, items: "40 Quân Huy", bonus: "+2 Bonus" },
        { id: "pkg2", price: 50000, items: "100 Quân Huy", bonus: "+5 Bonus", popular: true },
        { id: "pkg3", price: 100000, items: "210 Quân Huy", bonus: "+10 Bonus" },
        { id: "pkg4", price: 200000, items: "425 Quân Huy", bonus: "+25 Bonus" },
        { id: "pkg5", price: 500000, items: "1070 Quân Huy", bonus: "+70 Bonus" }
    ];

    if (packageGrid) {
        packages.forEach(pkg => {
            const col = document.createElement("div");
            col.className = "col";

            const badge = pkg.popular ? `<span class="badge bg-danger position-absolute top-0 start-50 translate-middle rounded-pill px-3 shadow-sm" style="font-size: 0.65rem; z-index: 2;">HOT</span>` : '';

            col.innerHTML = `
                <div class="package-option position-relative rounded-4 p-3 h-100 text-center cursor-pointer bg-white" data-price="${pkg.price}">
                    ${badge}
                    <div class="position-absolute top-0 end-0 p-2 text-primary check-icon">
                        <i class="fa-solid fa-circle-check fs-5"></i>
                    </div>
                    <img src="../assets/images/MYECOIN.png" width="40" class="mb-2" alt="Coin">
                    <h6 class="fw-bold text-dark mb-1 fs-7">${pkg.items}</h6>
                    <span class="badge bg-warning bg-opacity-25 text-warning fw-bold fs-8 mb-3">${pkg.bonus}</span>
                    <div class="fw-bold text-primary">${pkg.price.toLocaleString('vi-VN')} VNĐ</div>
                </div>
            `;
            packageGrid.appendChild(col);
        });

        // Add event listeners to packages
        const packageEls = document.querySelectorAll(".package-option");
        packageEls.forEach(el => {
            el.addEventListener("click", function () {
                packageEls.forEach(p => p.classList.remove("selected"));
                this.classList.add("selected");

                const price = parseInt(this.getAttribute("data-price"));
                totalPriceEl.textContent = price.toLocaleString('vi-VN') + ' VNĐ';
            });
        });
    }

    // MyE Coin Packages
    const myeCoinPackages = [
        { img: '../assets/images/Chon_goi_nap/20_MYE_COIN.png', title: '20 MyE Coin', price: '20.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/50_MYE_COIN.png', title: '50 MyE Coin', price: '50.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/100_MYE_COIN.png', title: '100 MyE Coin', price: '100.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/500_MYE_COIN.png', title: '500 MyE Coin', price: '500.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/1000_MYE_COIN.png', title: '1.000 MyE Coin', price: '1.000.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/2000_MYE_COIN.png', title: '2.000 MyE Coin', price: '2.000.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/5000_MYE_COIN.png', title: '5.000 MyE Coin', price: '5.000.000 VNĐ' },
        { img: '../assets/images/Chon_goi_nap/10000_MYE_COIN.png', title: '10.000 MyE Coin', price: '10.000.000 VNĐ' }
    ];

    const myeCoinPackageGrid = document.getElementById("myeCoinPackageGrid");
    const otherPackageGrid = document.getElementById("otherPackageGrid");

    myeCoinPackages.forEach(pkg => {
        const cardHtml = `
            <div class="col">
                <div class="card border border-light shadow-sm rounded-4 overflow-hidden bg-white hover-scale cursor-pointer" onclick="switchView('view-thong-tin-giao-dich')">
                    <img src="${pkg.img}" class="card-img-top w-100" alt="${pkg.title}">
                    <div class="card-body p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <div class="fw-bold mb-1" style="font-size: 0.85rem; color: #1e3a8a;">${pkg.title}</div>
                            <div class="fw-bold" style="color: #f97316; font-size: 0.8rem;">${pkg.price}</div>
                        </div>
                        <button class="btn text-white rounded-3 fw-bold px-3 py-1" style="background-color: #f97316; font-size: 0.85rem;">MUA</button>
                    </div>
                </div>
            </div>
        `;

        if (myeCoinPackageGrid) {
            myeCoinPackageGrid.insertAdjacentHTML('beforeend', cardHtml);
        }
        if (otherPackageGrid) {
            otherPackageGrid.insertAdjacentHTML('beforeend', cardHtml);
        }
    });


    // Filter active states
    const filters = document.querySelectorAll('.filters .btn');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active-filter'));
            btn.classList.add('active-filter');
        });
    });
});

window.switchView = function (viewId) {
    // Hide all views
    document.getElementById('view-home').style.display = 'none';
    document.getElementById('view-chon-goi-nap').style.display = 'none';
    document.getElementById('view-nap-mye-coin').style.display = 'none';
    document.getElementById('view-tai-khoan').style.display = 'none';
    document.getElementById('view-lich-su').style.display = 'none';
    if (document.getElementById('view-dang-nhap')) document.getElementById('view-dang-nhap').style.display = 'none';
    if (document.getElementById('view-thong-tin-giao-dich')) document.getElementById('view-thong-tin-giao-dich').style.display = 'none';

    // Show the requested view
    document.getElementById(viewId).style.display = 'block';


    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.handleLogin = function (loginType = 'mye') {
    // Switch to the correct sync case if the function exists
    if (typeof switchSyncCase === 'function') {
        switchSyncCase(loginType);
    }

    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userProfileBlock').style.display = 'block';
    switchView('view-home');
}

window.handleLogout = function () {
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('userProfileBlock').style.display = 'none';
    switchView('view-home');
}

window.switchSyncCase = function (caseId) {
    // Hide all cases
    if (document.getElementById('sync-case-fb')) document.getElementById('sync-case-fb').style.display = 'none';
    if (document.getElementById('sync-case-gg')) document.getElementById('sync-case-gg').style.display = 'none';
    if (document.getElementById('sync-case-mye')) document.getElementById('sync-case-mye').style.display = 'none';

    // Reset Google states so they start from state 1
    if (document.getElementById('sync-gg-state-1')) document.getElementById('sync-gg-state-1').style.display = 'block';
    if (document.getElementById('sync-gg-state-2')) document.getElementById('sync-gg-state-2').style.display = 'none';
    if (document.getElementById('sync-gg-state-3')) document.getElementById('sync-gg-state-3').style.display = 'none';
    if (document.getElementById('sync-gg-state-4')) document.getElementById('sync-gg-state-4').style.display = 'none';

    // Reset FB states
    if (document.getElementById('sync-state-1')) document.getElementById('sync-state-1').style.display = 'block';
    if (document.getElementById('sync-state-2')) document.getElementById('sync-state-2').style.display = 'none';
    if (document.getElementById('sync-state-3')) document.getElementById('sync-state-3').style.display = 'none';
    if (document.getElementById('sync-state-4')) document.getElementById('sync-state-4').style.display = 'none';

    // Reset MYE states
    if (document.getElementById('sync-mye-state-1')) document.getElementById('sync-mye-state-1').style.display = 'block';
    if (document.getElementById('sync-mye-state-2')) document.getElementById('sync-mye-state-2').style.display = 'none';

    // Show the selected case
    if (caseId === 'fb') {
        if (document.getElementById('sync-case-fb')) document.getElementById('sync-case-fb').style.display = 'block';
        if (document.getElementById('activity-history-card')) document.getElementById('activity-history-card').style.display = 'flex';
    } else if (caseId === 'gg') {
        if (document.getElementById('sync-case-gg')) document.getElementById('sync-case-gg').style.display = 'block';
        if (document.getElementById('activity-history-card')) document.getElementById('activity-history-card').style.display = 'flex';
    } else if (caseId === 'mye') {
        if (document.getElementById('sync-case-mye')) document.getElementById('sync-case-mye').style.display = 'block';
        if (document.getElementById('activity-history-card')) document.getElementById('activity-history-card').style.display = 'flex';
    }
}

window.toggleProfileEdit = function (isEdit) {
    const editableFields = document.querySelectorAll('.editable-field');
    
    if (isEdit) {
        if (document.getElementById('profile-edit-btn')) document.getElementById('profile-edit-btn').style.setProperty('display', 'none', 'important');
        if (document.getElementById('profile-action-btns')) document.getElementById('profile-action-btns').style.setProperty('display', 'flex', 'important');
        
        editableFields.forEach(field => {
            field.setAttribute('contenteditable', 'true');
            field.classList.add('border-bottom', 'border-primary', 'rounded-1', 'bg-light');
            field.style.outline = 'none';
        });
        if (editableFields.length > 0) editableFields[0].focus();
    } else {
        if (document.getElementById('profile-edit-btn')) document.getElementById('profile-edit-btn').style.setProperty('display', 'block', 'important');
        if (document.getElementById('profile-action-btns')) document.getElementById('profile-action-btns').style.setProperty('display', 'none', 'important');
        
        editableFields.forEach(field => {
            field.setAttribute('contenteditable', 'false');
            field.classList.remove('border-bottom', 'border-primary', 'rounded-1', 'bg-light');
            field.style.outline = '';
        });
    }
}

window.showSyncSuccess = function(platform) {
    if (platform === 'fb') {
        if(document.getElementById('sync-state-2')) document.getElementById('sync-state-2').style.display = 'none';
        if(document.getElementById('sync-state-3')) document.getElementById('sync-state-3').style.display = 'block';
    } else if (platform === 'gg') {
        if(document.getElementById('sync-gg-state-2')) document.getElementById('sync-gg-state-2').style.display = 'none';
        if(document.getElementById('sync-gg-state-3')) document.getElementById('sync-gg-state-3').style.display = 'block';
    }
}

window.collapseSyncCard = function() {
    // For Facebook
    if (document.getElementById('sync-state-3') && document.getElementById('sync-state-3').style.display === 'block') {
        document.getElementById('sync-state-3').style.display = 'none';
        document.getElementById('sync-state-4').style.display = 'block';
    } else if (document.getElementById('sync-state-4') && document.getElementById('sync-state-4').style.display === 'block') {
        document.getElementById('sync-state-4').style.display = 'none';
        document.getElementById('sync-state-3').style.display = 'block';
    }
    
    // For Google
    if (document.getElementById('sync-gg-state-3') && document.getElementById('sync-gg-state-3').style.display === 'block') {
        document.getElementById('sync-gg-state-3').style.display = 'none';
        document.getElementById('sync-gg-state-4').style.display = 'block';
    } else if (document.getElementById('sync-gg-state-4') && document.getElementById('sync-gg-state-4').style.display === 'block') {
        document.getElementById('sync-gg-state-4').style.display = 'none';
        document.getElementById('sync-gg-state-3').style.display = 'block';
    }
    
    // For MYE
    if (document.getElementById('sync-mye-state-1') && document.getElementById('sync-mye-state-1').style.display === 'block') {
        document.getElementById('sync-mye-state-1').style.display = 'none';
        document.getElementById('sync-mye-state-2').style.display = 'block';
    } else if (document.getElementById('sync-mye-state-2') && document.getElementById('sync-mye-state-2').style.display === 'block') {
        document.getElementById('sync-mye-state-2').style.display = 'none';
        document.getElementById('sync-mye-state-1').style.display = 'block';
    }
}
