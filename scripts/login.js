"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 3 - Chức năng Login

// ------------------
// ------------------
// ELEMENT
const loginBtn = document.getElementById("btn-submit");

// ------------------
// ------------------
// EVENT HANDLER
// 1> Bắt sự kiện Click vào nút "Login"
loginBtn.addEventListener("click", function () {
  // 2> Lấy dữ liệu nhập vào từ form Login
  const loginUser = {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  // 3> Kiểm tra validate dữ liệu
  if (!validateInput(loginUser, "login")) return;

  // 4> Gán biến User đang login
  currentUser = checkLoginUser(loginUser);

  // 5> Kiểm tra User login thành công hay không
  if (!currentUser) return;

  // 6> Khi login thành công sẽ lưu currentUser vào localStorage
  saveToStorage(CURRENT, currentUser);

  // 7> chuyển về trang Home
  window.location.href = "../index.html ";
});
