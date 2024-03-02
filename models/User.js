"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức

/////////////////////////
// YÊU CẦU 1 - Tạo Class User
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    category = "Science",
    pageSize = 2 ////////////////////////
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;

    // for API news
    // Danh mục tin tức
    this.category = category;
    // Số lượng bài viết trả về/1 lần gọi API
    this.pageSize = pageSize;
  }

  // url cho News
  newsURL(page = 1) {
    // Địa chỉ nguồn
    const endpointsAPI = "https://newsapi.org/v2/top-headlines" + "?";

    // Mã code đất nước muốn lấy tin tức
    const countryAPI = "country=" + "us" + "&";

    // Danh mục tin tức: business / entertainment / general / health / science / sports / technology
    const categoryAPI = "category=" + this.category.toLowerCase() + "&";

    // Số lượng bài viết trả về/1 lần gọi API, defaut 20, max 100
    const pageSizeAPI = "pageSize=" + this.pageSize + "&";

    // Page là thứ tự của lần trả về dữ liệu, phân trang theo pageSize
    const pageAPI = "page=" + page + "&";

    // Khóa để xác thực API
    const apiKeyAPI = "apiKey=" + "426bc14427e74aa685a2ff2c3d663ffe";

    // ví dụ url
    // GET https://newsapi.org/v2/everything?q=Apple&from=2023-09-22&sortBy=popularity&apiKey=API_KEY

    const url = [
      endpointsAPI,
      countryAPI,
      categoryAPI,
      pageSizeAPI,
      pageAPI,
      apiKeyAPI,
    ].join("");

    return url;
  }

  // url cho News tìm kiếm theo từ khóa
  searchNewsURL(query, page = 1) {
    // Địa chỉ nguồn
    const endpointsAPI = "https://newsapi.org/v2/everything" + "?";

    // Mã code ngôn ngữ muốn lấy tin tức
    const languageAPI = "language=" + "en" + "&";

    // Từ khóa để tìm kiếm News
    const queryAPI = "q=" + query + "&";

    // Số lượng bài viết trả về/1 lần gọi API, defaut 20, max 100
    const pageSizeAPI = "pageSize=" + this.pageSize + "&";

    // Page là thứ tự của lần trả về dữ liệu, phân trang theo pageSize
    const pageAPI = "page=" + page + "&";

    // Khóa để xác thực API
    const apiKeyAPI = "apiKey=" + "426bc14427e74aa685a2ff2c3d663ffe";

    const url = [
      endpointsAPI,
      languageAPI,
      queryAPI,
      pageSizeAPI,
      pageAPI,
      apiKeyAPI,
    ].join("");

    return url;
  }
}
