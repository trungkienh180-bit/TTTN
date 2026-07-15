// script.js - JavaScript tùy chỉnh
document.addEventListener("DOMContentLoaded", function() {
    console.log("Ready!");

    // Logic Tăng Giảm Hoa Popup
    const minusBtn = document.querySelector(".btn-minus");
    const plusBtn = document.querySelector(".btn-plus");
    const maxBtn = document.querySelector(".btn-max");
    const input = document.querySelector(".flower-input");

    if(minusBtn && plusBtn && maxBtn && input) {
        minusBtn.addEventListener("click", () => {
            let val = parseInt(input.value.replace(/\./g, ''));
            if(val > 1) {
                val--;
                input.value = val.toLocaleString('vi-VN');
            }
        });
        plusBtn.addEventListener("click", () => {
            let val = parseInt(input.value.replace(/\./g, ''));
            val++;
            input.value = val.toLocaleString('vi-VN');
        });
        maxBtn.addEventListener("click", () => {
            // Mock giá trị tối đa
            input.value = "99.999"; 
        });
    }

    // Logic Tặng Hoa -> Hiện Modal Thành Công
    const btnTangHoa = document.getElementById("btnTangHoa");
    if(btnTangHoa) {
        btnTangHoa.addEventListener("click", () => {
            const successModal = new bootstrap.Modal(document.getElementById('successVoteModal'));
            successModal.show();
        });
    }

    // Logic Lịch Sử Tặng -> Hiện Modal Lịch Sử
    const btnLsTang = document.getElementById("btnLsTang");
    if(btnLsTang) {
        btnLsTang.addEventListener("click", () => {
            const historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
            historyModal.show();
        });
    }

    // Fix body scroll issue khi có nhiều modal chồng lên nhau
    const successVoteModalEl = document.getElementById('successVoteModal');
    if (successVoteModalEl) {
        successVoteModalEl.addEventListener('hidden.bs.modal', function () {
            if (document.getElementById('candidateModal').classList.contains('show')) {
                document.body.classList.add('modal-open');
            }
        });
    }
    
    const historyModalEl = document.getElementById('historyModal');
    if (historyModalEl) {
        historyModalEl.addEventListener('hidden.bs.modal', function () {
            if (document.getElementById('candidateModal').classList.contains('show')) {
                document.body.classList.add('modal-open');
            }
        });
    }
});
