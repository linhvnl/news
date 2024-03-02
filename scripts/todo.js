"use strict";

// ASSIGNMENT 03 - Ứng dụng đọc tin tức
// YÊU CẦU 8 - Hiển thị Todo List

// ------------------
// ------------------
// CLASS
class Task {
  // field: Task này đã hoàn thành hay chưa
  isDone = false;

  constructor(task, owner) {
    this.task = task; // nội dung công việc
    this.owner = owner; // username của người tạo
  }
}

// ------------------
// ------------------
// ELEMENT
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const toDoContainer = document.getElementById("todo-list");

// ------------------
// ------------------
// YÊU CẦU 8b - Hiển thị các Task
// FUNCTION: Hiển thị Todo List theo user
const renderToDoList = function () {
  // 1> Xóa nội dung hiện có của bảng trong HTML
  toDoContainer.innerHTML = "";

  // 2> Tạo html và hiển thị lên trang cho người dùng
  toDoArr.forEach((toDo, i) => {
    // chỉ lấy dữ liệu của user hiện tại
    if (toDo.owner === currentUser.username) {
      // tạo html
      const html = `
          <li 
            data-index="${i}"
            class="${toDo.isDone === true ? "checked" : ""}">
            ${toDo.task}
            <span class="close">×</span>
          </li>`;

      // chèn vào container trên trang hiển thị
      toDoContainer.insertAdjacentHTML("beforeend", html);
    }
  });
};

// ------------------
// ------------------
// INIT
// khởi tạo trang hiển thị danh sách Task ban đầu khi tải trang
renderToDoList();

// ------------------
// ------------------
// EVENT HANDLER
////////////////////////////////////
// EVENT HANDLER
// YÊU CẦU 8a - Thêm mới Todo và Lưu dữ liệu vào LocalStorage
// 1> Bắt sự kiện Click vào nút "Add" 1 task mới
addBtn.addEventListener("click", function () {
  // 2> Lấy dữ liệu nhập vào từ form
  const task = taskInput.value.trim();

  // 3> Kiểm tra dữ liệu hợp lệ
  if (task === "") {
    alert(`Please input for TITLE of your task`);
    return;
  }

  // 4> tạo task mới với các dữ liệu hợp lệ
  const newTask = new Task(task, currentUser.username);

  // 5> Thêm task mới vào mảng, lưu mảng vào localStorage
  toDoArr.push(newTask);
  saveToStorage(TODO, toDoArr);

  // 6> Hiển thị cập nhật lên trang cho người dùng
  renderToDoList();

  // 7> Reset lại input
  taskInput.value = "";
  taskInput.focus();
});

////////////////////////////////////
// EVENT HANDLER
// YÊU CẦU 8c. Toggle Task (đánh dấu Task hoàn thành)
//  1> Bắt sự kiện Click vào vùng chứa danh sách ToDo
toDoContainer.addEventListener("click", function (e) {
  // 2> Guard: nếu không Click vào 1 task bất kỳ
  if (e.target.classList.contains("close")) return;

  // 3> Chọn task được click vào
  const editToDo = e.target;

  // 4> Toggle để đánh dấu trạng thái của Task là đã/chưa hoàn thành
  editToDo.classList.toggle("checked");

  // 5> Cập nhật dữ liệu vào LocalStorage tương ứng
  toDoArr[editToDo.dataset.index].isDone =
    toDoArr[editToDo.dataset.index].isDone === true ? false : true;
  saveToStorage(TODO, toDoArr);
});

////////////////////////////////////
// EVENT HANDLER
// YÊU CẦU 8d. Delete Task
// 1> Bắt sự kiện Click vào vùng chứa danh sách ToDo
toDoContainer.addEventListener("click", function (e) {
  // 2> Guard: nếu không Click vào nút "Delete" của task
  if (!e.target.classList.contains("close")) return;

  // 3> Chọn task có nút "Delete" được click vào
  const deleteToDo = e.target.closest("li");

  // 4> Xóa task khỏi mảng và cập nhật dữ liệu LocalStorage
  toDoArr.splice(deleteToDo.dataset.index, 1);
  saveToStorage(TODO, toDoArr);

  // 5> Hiển thị cập nhật lên trang cho người dùng
  renderToDoList();
});
