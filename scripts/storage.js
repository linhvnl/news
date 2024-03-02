"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức

// ------------------
// ------------------
// ELEMENT
// ELEMENT - INPUT FORM (register/login)
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");

// ELEMENT - INPUT FORM (Settings)
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

// ELEMENT - NEWS PAGINATION
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const numPage = document.getElementById("page-num");

// ELEMENT - CONTAINER DISPLAY NEWS
const newsContainer = document.getElementById("news-container");

// ------------------
// ------------------
// VARIABLE
// VARIABLE mảng quản lý người dùng, chứa các Instance được tạo từ Class User
const KEY = "USER_ARRAY";
const userArr = getFromStorage(KEY, []);

// VARIABLE lưu thông tin user đang đăng nhập
const CURRENT = "USER_CURRENT";
let currentUser =
  getFromStorage(CURRENT, null) && parseUser(getFromStorage(CURRENT, null));

// VARIABLE cập nhật số thứ tự page đang hiển thị tin tức, default 1
let currentPage = 1;

// VARIABLE cập nhật số page tối đa lấy từ API news theo url
let maxPage;

// VARIABLE cập nhật dữ liệu tìm kiếm để chuyển trang
let query;

// VARIABLE lưu thông tin về các Task
const TODO = "TODO_ARRAY";
const toDoArr = getFromStorage(TODO, []);

// ------------------
// ------------------
// FUNCTION - STORAGE
////////////////////////////////////
// FUNCTION lưu DATA xuống LocalStorage ()
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

////////////////////////////////////
// FUNCTION lấy DATA từ LocalStorage theo Key tương ứng
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) || defaultVal;
}

////////////////////////////////////
// FUNCTION chuyển từ JS Object sang Class Instance như sau:
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,

    // for API news
    userData.category,
    userData.pageSize
  );
  return user;
}

// ------------------
// ------------------
// FUNCTION - VALIDATE INPUT
////////////////////////////////////
// FUNCTION: VALIDATE thông tin Input, ngược lại thì thông báo lỗi cho người dùng
// kiểm tra khi người dùng đăng ký hoặc đăng nhập, style = "register"/ "login"
const validateInput = function (user, style = "register") {
  // status variable
  let isValidate = true;

  // check data input
  for (const property in user) {
    // 1> Không có trường nào bị bỏ trống
    if (user[property] === "") {
      alert(`Please input for ${property.toUpperCase()}`);
      isValidate = false;
      break;
    }

    // 2> Username không được trùng với Username của các người dùng trước đó
    if (
      style === "register" &&
      property === "username" &&
      userArr.findIndex((u) => u.username === user.username) !== -1
    ) {
      alert(`The USERNAME has already been. Please input the ANOTHER!`);
      isValidate = false;
      break;
    }

    // 3> Password phải có ít nhất 8 ký tự
    if (
      style === "register" &&
      property === "password" &&
      user.password.length < 8
    ) {
      alert(`PASSWORD must be at least 8 characters!`);
      isValidate = false;
      break;
    }

    // 4> Password và Confirm Password phải giống nhau.
    if (
      style === "register" &&
      property === "passwordConfirm" &&
      user.password !== user.passwordConfirm
    ) {
      alert(`PASSWORD and PASSWORDCONFIRM must be the same!`);
      isValidate = false;
      break;
    }
  }

  return isValidate;
};

////////////////////////////////////
// FUNCTION: VALIDATE thông tin Login thành công (trùng với User đã có), ngược lại thì thông báo lỗi cho người dùng
const checkLoginUser = function (user) {
  // biến check và lưu user đang Login
  const checkUser = userArr.find((u) => u.username === user.username);

  // check USERNAME
  if (!checkUser)
    return alert(`The USERNAME does not exist. Please try again!`);

  // check PASSWORD
  if (checkUser.password !== user.password)
    return alert(`The PASSWORD is incorrect. Please try again!`);

  return checkUser;
};

////////////////////////////////////
// FUNCTION
// FUNCTION: VALIDATE Input khi người dùng thay đổi thiết lập tham số cho bảng tin
const validateSettings = function () {
  // status variable
  let isValidate = true;

  // kiểm tra người dùng đã thay đổi cài đặt chưa
  if (
    +pageSizeInput.value === currentUser.pageSize &&
    categoryInput.value === currentUser.category
  ) {
    alert("You haven't changed any settings!");
    isValidate = false;
    return isValidate;
  }

  // kiểm tra điều kiện là 1 <= pageSize <= 100 (max là 100 theo API news)
  if (pageSizeInput.value < 1 || pageSizeInput.value > 100) {
    alert('"News per page" must be between 1 and 100!');
    isValidate = false;
    return isValidate;
  }

  return isValidate;
};

// ------------------
// ------------------
// FUNCTION - FETCH AND DISPLAY NEWS
////////////////////////////////////
// FUNCTION: kết xuất danh sách tin tức
// articles là mảng các object
const renderNews = function (articles) {
  // 1> Tạo thành phần cho HTML
  let html = "";

  // 2> Kết xuất mỗi bài báo vào html
  articles.forEach((article) => {
    html += `
  <div class="pb-4 border rounded">
    <div class="d-flex border rounded">
      <div class="col-4 p-0">
        <img
          src="${
            article.urlToImage
              ? article.urlToImage
              : "../images/Image_not_available.png"
          }"
          alt="img"
          class="img-fluid"
        />
      </div>
      <div class="col-8">
        <h4>${article.title}</h4>
        <p>${article.description ? article.description : "No description."}</p>
        <a href="${article.url}" target="blank" class="btn btn-primary">View</a>
      </div>
    </div>
  </div>`;
  });

  // 3> Thêm html vào container để hiển thị lên trang
  newsContainer.innerHTML = html;
};

////////////////////////////////////
// FUNCTION: lấy dữ liệu tin tức từ API news và hiển thị cho người dùng
const displayNews = async function (url) {
  try {
    // 1> Tìm nạp dữ liệu API
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);

    // 2> Lấy json từ dữ liệu API
    const data = await res.json();
    if (data.status !== "ok")
      throw new Error(`ERROR: ${data.code} - ${data.message}`);

    // 3> Hiển thị tin tức
    renderNews(data.articles);

    // 4> Cập nhật số page tối đa lấy từ API news theo url hiện tại
    maxPage = Math.ceil(data.totalResults / currentUser.pageSize);
  } catch (err) {
    // thông báo lỗi
    console.error(`${err} 💥`);
    alert(`${err.message} 💥`);

    // Reject promise returned from async function
    throw err;
  }
};

////////////////////////////////////
// FUNCTION: hiển thị nút chuyển giữa các trang tin tức
const displayPagination = function () {
  // 1> Hiển thị numPage theo số trang hiện tại
  numPage.textContent = currentPage;

  // 2> Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi
  currentPage === 1
    ? (prevBtn.style.display = "none")
    : (prevBtn.style.display = "block");

  // 3> Nếu như không thể lấy thêm các bài viết nữa, nút "Next" sẽ bị ẩn đi
  currentPage === maxPage
    ? (nextBtn.style.display = "none")
    : (nextBtn.style.display = "block");
};
