"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 10 - (Nâng cao) Tìm kiếm bài viết theo từ khóa

// ------------------
// ------------------
// ELEMENT
const queryInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");

// ------------------
// ------------------
// INIT
// gọi hàm hiển thị nút chuyển trang đầu tiên
displayPagination();

// FUNCTION: khởi tạo hiển thị trang tin tức tìm kiếm (cả tin tức và nút chuyển trang)
const initSearchNews = function () {
  // 1> Lấy url theo user
  const url = currentUser.searchNewsURL(query, currentPage);

  // 2> hiển thị trang tin tức tìm kiếm theo query, currentPage và maxPage cập nhật
  displayNews(url);

  // 3> Hiển thị nút chuyển trang
  displayPagination();
};

// ------------------
// ------------------
// EVENT HANDLER
////////////////////////////////////
// EVENT HANDLER cho nút Search
// 1> Bắt sự kiện vào nút Search
searchBtn.addEventListener("click", function () {
  // 2> Nếu không có người dùng đang đăng nhập thì không search tin tức
  if (!currentUser) return;

  // 3> Kiểm tra người dùng đã nhập dữ liệu tìm kiếm chưa
  if (!queryInput.value.trim()) {
    alert("Please input keys to search!");
    return;
  }

  // 4> Lấy dữ liệu người dùng nhập để tìm kiếm
  query = queryInput.value.trim().toLowerCase();

  // 5> Đặt lại trang tìm kiếm đầu tiên cho currentPage
  currentPage = 1;

  // 6> Hiển thị trang tin tức tìm kiếm đầu tiên
  initSearchNews();
});

////////////////////////////////////
// EVENT HANDLER cho nút Previous
// 1> Bắt sự kiện vào nút Previous
prevBtn.addEventListener("click", function () {
  // 2> Nếu không có người dùng đang đăng nhập thì không hiển thị tin tức
  if (!currentUser) return;

  // Nếu người dùng đã đăng nhập thì xử lý dữ liệu
  // 3> Kiểm tra người dùng đã nhập dữ liệu tìm kiếm chưa
  if (!query) {
    alert("Please input keys to search!");
    return;
  }

  // 4> Cập nhật biến currentPage
  currentPage--;

  // 5> Hiển thị trang tin tức tìm kiếm cập nhật
  initSearchNews();
});

////////////////////////////////////
// EVENT HANDLER cho nút Next
// 1> Bắt sự kiện vào nút Next
nextBtn.addEventListener("click", function () {
  // 2> Nếu không có người dùng đang đăng nhập thì không hiển thị tin tức
  if (!currentUser) return;

  // Nếu người dùng đã đăng nhập thì xử lý dữ liệu
  // 3> Kiểm tra người dùng đã nhập dữ liệu tìm kiếm chưa
  if (!query) {
    alert("Please input keys to search!");
    return;
  }

  // 4> Cập nhật biến currentPage
  currentPage++;

  // 5> Hiển thị trang tin tức tìm kiếm cập nhật
  initSearchNews();
});
