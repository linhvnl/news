"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 9 - Thay đổi thiết lập: cài đặt một số tham số cho bảng tin

// ------------------
// ------------------
// ELEMENT
const saveSettingsBtn = document.getElementById("btn-submit");

// ------------------
// ------------------
// INIT
// Khi vào trang, hiển thị các tham số cài đặt trước đó cho người dùng xem
if (currentUser) {
  pageSizeInput.value = currentUser.pageSize;
  categoryInput.value = currentUser.category;
}

// ------------------
// ------------------
// EVENT HANDLER
// EVENT HANDLER: thiết lập lại tham số cho bảng tin
// 1> Bắt sự kiện Click vào nút "Save Settings"
saveSettingsBtn.addEventListener("click", function () {
  // 2> Guard: Validate input
  if (!validateSettings()) return;

  // 3> Cập nhật Settings mới cho User hiện tại
  currentUser.pageSize = +pageSizeInput.value;
  currentUser.category = categoryInput.value;

  // 4> Cập nhật lại mảng User
  const indexOfCurrentUser = userArr.findIndex(
    (user) => user.username === currentUser.username
  );
  userArr.splice(indexOfCurrentUser, 1, currentUser);

  // 5> Cập nhật dữ liệu vào LocalStorage
  saveToStorage(KEY, userArr);
  saveToStorage(CURRENT, currentUser);

  // 6> thông báo cho người dùng: đã thay đổi thiết lập thành công
  alert("Your new settings have been saved!");
});
