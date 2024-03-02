"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 4 - Home Page
// YÊU CẦU 5 - Chức năng Logout

// ------------------
// ------------------
// ELEMENT
const loginContainer = document.getElementById("login-modal");
const logoutContainer = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

// ------------------
// ------------------
// INIT
// 2 chế độ hiển thị Home Page
if (!currentUser) {
  // ẩn phần Logout
  logoutContainer.setAttribute("hidden", "");
} else {
  // message "Wellcome to user"
  welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  // ẩn phần Login
  loginContainer.setAttribute("hidden", "");
}

// ------------------
// ------------------
// EVENT HANDLER
// Bắt sự kiện Click vào nút "Logout"
logoutBtn.addEventListener("click", function () {
  // 1> xóa User hiện tại ở LocalStorage
  localStorage.removeItem(CURRENT);

  // 2> chuyển về trang Login
  window.location.href = "../pages/login.html";
});
