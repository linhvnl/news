"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 2 - Chức năng Register

// ------------------
// ------------------
// ELEMENT
const registerBtn = document.getElementById("btn-submit");

// ------------------
// ------------------
// EVENT HANDLER
// 1> Bắt sự kiện Click vào nút "Register"
registerBtn.addEventListener("click", function () {
  // 2> Lấy dữ liệu nhập vào từ form
  const regUser = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
    passwordConfirm: passwordConfirmInput.value.trim(),
  };

  // 3> Gọi hàm validate để kiểm tra form hợp lệ
  if (validateInput(regUser)) {
    // 4> Tạo user mới với các dữ liệu hợp lệ
    const newUser = parseUser(regUser);

    // 5> Thêm user vào mảng, lưu mảng vào localStorage
    userArr.push(newUser);
    saveToStorage(KEY, userArr);

    // 6> Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});
