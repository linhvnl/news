"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 6 - Hiển thị các bài viết
// YÊU CẦU 7 - Chuyển trang cho các bài viết

// ------------------
// ------------------
// INIT
// FUNCTION: khởi tạo hiển thị trang tin tức (cả tin tức và nút chuyển trang)
const initNews = function () {
  // 1> nếu có người dùng đang đăng nhập thì hiển thị tin tức
  if (currentUser) {
    // lấy url theo user
    const url = currentUser.newsURL(currentPage);

    // hiển thị tin tức
    displayNews(url);
  }

  // 2> hiển thị nút chuyển trang
  displayPagination();
};

// gọi hàm INIT
initNews();

// ------------------
// ------------------
// EVENT HANDLER
////////////////////////////////////
// EVENT HANDLER cho nút Previous
// 1> Bắt sự kiện vào nút Previous
prevBtn.addEventListener("click", function () {
  // 2> nếu không có người dùng đang đăng nhập thì không hiển thị tin tức
  if (!currentUser) return;

  // nếu người dùng đã đăng nhập thì xử lý dữ liệu
  // 3> cập nhật biến currentPage
  currentPage--;

  // 4> hiển thị tin tức theo currentPage và maxPage cập nhật
  initNews();
});

////////////////////////////////////
// EVENT HANDLER cho nút Next
// 1> Bắt sự kiện vào nút Next
nextBtn.addEventListener("click", function () {
  // 2> nếu không có người dùng đang đăng nhập thì không hiển thị tin tức
  if (!currentUser) return;

  // nếu người dùng đã đăng nhập thì xử lý dữ liệu
  // 3> cập nhật biến currentPage
  currentPage++;

  // 4> hiển thị tin tức theo currentPage và maxPage cập nhật
  initNews();
});
