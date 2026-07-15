document.addEventListener('DOMContentLoaded', function() {
    // Xử lý sự kiện click cho nút chọn Giới tính (Thi Miss / Thi Mister)
    const radioButtons = document.querySelectorAll('.radio-custom');
    const genderInput = document.getElementById('genderInput');

    radioButtons.forEach(radio => {
        radio.addEventListener('click', function() {
            // Xóa class active ở tất cả
            radioButtons.forEach(r => r.classList.remove('active'));
            // Thêm class active cho nút vừa click
            this.classList.add('active');
            // Cập nhật giá trị input hidden
            genderInput.value = this.getAttribute('data-target');
            
            console.log("Đã chọn:", genderInput.value);
        });
    });

    // Thêm hiệu ứng đơn giản khi người dùng tương tác các box upload ảnh
    const uploadBoxes = document.querySelectorAll('.upload-box, .upload-btn');
    uploadBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Nơi này sau có thể gọi hàm mở hộp thoại chọn file
            alert("Sự kiện mở hộp thoại chọn ảnh sẽ được xử lý ở đây!");
        });
    });
    
    // Nút Đồng ý, Hủy bỏ
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const alt = this.getAttribute('alt');
            if(alt === 'Đồng Ý') {
                alert('Đã gửi thông tin đăng ký!');
            } else if(alt === 'Hủy Bỏ') {
                if(confirm('Bạn có chắc chắn muốn hủy thông tin đã nhập?')) {
                    // Reset form...
                    const inputs = document.querySelectorAll('.custom-input');
                    inputs.forEach(input => input.value = '');
                }
            }
        });
    });
});
