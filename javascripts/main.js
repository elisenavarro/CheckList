// Variables -- Query Selectors
const titleIn = document.querySelector('#task-title');
const taskItem = document.querySelector('#task-item-input');
const addTaskBtn = document.querySelector('#plus-btn');
const makeTodoBtn = document.querySelector('#make-btn');
const clearBtn = document.querySelector('#clear-btn');
const rightSect = document.querySelector('.card-index')
const output = document.querySelector('output');
let todoArray = [];


// Event Listeners
titleIn.addEventListener('keyup', disableButtonHandler);
taskItem.addEventListener('keyup', disableButtonHandler);
addTaskBtn.addEventListener('click', addTaskHandler);
makeTodoBtn.addEventListener('click', makeTodoBtnHandler);
output.addEventListener('click', removeTaskItem);
clearBtn.addEventListener('click', clearTaskList);
rightSect.addEventListener('click', indexHandler);
window.addEventListener('load', handlePageload);

// Event Handlers
function addTaskHandler(){
  createTask();
  disableButtonHandler();
}

function makeTodoBtnHandler(){
  createTaskList();
  displayMessage(todoArray, 'No Tasks Yet');
  clearTaskList();
  createTasksArray();
  disableButtonHandler();
}

function handlePageload() {
  createTasksArray();
  reinstantiateTodo();
  displayMessage(todoArray, 'Add tasks here');
  disableButtonHandler();
}

function disableButtonHandler() {
  disableAddTaskBtn();
  disableButton(clearBtn);
  disableButton(makeTodoBtn);
}

function indexHandler(){
  toggleTaskComplete(event);
  removeTodo(event);
}

// Functions
// DISABLE BUTTONS
function disableMakeTodoBtn() {
  if (titleIn.value === '' || output.innerHTML === '') {
    makeTodoBtn.disabled = true;
  } else  {
    makeTodoBtn.disabled = false;
  }
}

function disableButton(button) {
  if (!titleIn.value || !output.innerHTML) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function disableAddTaskBtn() {
  if (!titleIn.value || !taskItem.value) {
    addTaskBtn.disabled = true;
  } else {
    addTaskBtn.disabled = false;
  }
}

function disableClearButton() {
  if (!titleIn.value || !output.innerHTML) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
  }
}

function enableDeleteBtn(button) {
  button.setAttribute('src', 'images/delete-active.svg');
  button.classList.add('delete-card');
}

function disableDeleteBtn(button) {
  button.setAttribute('src', 'images/delete.svg');
  button.classList.remove('delete-card');
}

// ADD PENDING TASK ITEM TO LIST
function addTask(obj) {
  output.insertAdjacentHTML('beforeend',
    `<li class="add-task" data-id=${obj.id}>
      <img src="images/delete.svg" class="list-icon-delete" id="pending-item" alt="delete icon"/>${obj.text}</p>
    </li>`);
  taskItem.value = '';
}

// CREATE NEW TASK ITEM
function createTask() {
  let task = {
      id: Date.now(),
      text: taskItem.value,
      done: false }
  let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
  tasksArray.push(task);
  pushToStorage(tasksArray);
  addTask(task);
}

// DELETE PENDING TASK ITEM FROM LIST
function removeTaskItem(e) {
  if (e.target.classList.contains('delete-task')) {
    e.target.closest('li').remove();
    let tasksArray = getTasksArray();
    let targetIndex = findTargetIndex(e, tasksArray, 'task-to-add');
    tasksArray.splice(targetIndex, 1);
    pushToStorage(tasksArray);
  }
  disableButtonHandler();
}

// GET ALL TASKS
function getTasksArray() {
  return JSON.parse(localStorage.getItem('tasksArray'));
}

// CREATE TASKS ARRAY
function createTasksArray(){
  localStorage.setItem('tasksArray', JSON.stringify([]));
}

// SAVE TASK ARRAY
function pushToStorage(array){
  localStorage.setItem('tasksArray', JSON.stringify(array));
}

// CREATE TODO TASK LIST
function createTaskList() {
  var tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
  var todo = new TodoList({title:titleIn.value, task:tasksArray});
  todoArray.push(todo);
  todo.saveToStorage(todoArray);
  displayMessage(todoArray, 'No Task Yet');
}

// CLEAR TASK LIST
function clearTaskList() {
  output.innerHTML = '';
  title.value = '';
  taskItem.value = '';
  disableButtonHandler();
  createTasksArray();
}

// REINSTANTIATE TASK ITEM
function reinstantiateTodo() {
  if (JSON.parse(localStorage.getItem('todoArray')) === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localStorage.getItem('todoArray')).map(element => {
      return new TodoList(element);
    })
  }
}

// DISPLAY TASK LIST
function displayToDo(obj){
  const deletePath = obj.delete ? 'images/delete-active.svg' : 'images/delete.svg';
  const deleteClass = obj.delete ? 'delete-card' : '';
  const urgentPath = obj.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
  const urgentClass =  obj.urgent ? 'urgent' : '';
  rightSect.insertAdjacentHTML('afterbegin',
  `<card class="card-index ${urgentClass}" data-id="${obj.id}">
            <h2 class="card-h2">${obj.title}</h2>
                <ul>${populateTasks(obj.tasks)}</ul>
            <footer class="card-footer">
              <div class="footer-urgent">
                <img src="${urgentPath}" class="img-urgent" alt="urgent">
                <p class="urgent">URGENT</p>
              </div>
              <div class="footer-delete">
                <img src="${deletePath}" class="img-delete" alt="delete">
                <p class="delete">DELETE</p>
              </div>
            </footer>
    </card>`);
}

// DISPLAY TASK LIST > POPULATE INTO ARRAY
function populateTasks(array) {
  let uList = `<ul class="card-ul">`;
  array.forEach(function(task) {
    const checkPath = task.done ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
    const checkClass = task.done ? 'checked' : '';
    uList += `<li class="taskItem ${checkClass}" data-id="${task.id}"><img src="${checkPath}" class="img-check" alt="Check off"> ${task.text} </li>`
  });
  return uList;
}

// DISPLAY CARDS
function displayCards(array){
  array.forEach(function(todos){
    displayToDo(todos)
  });
}

// FIND INDEX
function findTargetIndex(e, targetArray, className) {
  let id = e.target.closest('.' + className).dataset.id;
  const targetIndex = targetArray.findIndex(function(obj) {
    return parseInt(id) === obj.id
  });
  return targetIndex;
}

// DELETE TASK ITEM FROM CARD
function removeTodo(e) {
  if (e.target.classList.contains('.delete-card')){
    let targetIndex = findTargetIndex(e, todoArray, 'card-index');
    todoArray[targetIndex].deleteFromStorage(todoArray, targetIndex);
    e.target.closest('.card-index').remove();
    displayMessage(todoArray, 'Done')
  }
}

// DELETE ITEM FROM CARD LIST ARRAY
function checkDeleteButton(e,tasksArray, todo) {
  const deleteBtn = e.target.closet('.card-index').querySelector('.img-delete');
  if (tasksArray.every(function(tasks){
    return tasks.done === true
  })) {
    enableDeleteBtn(deleteBtn);
    todo.delete = true;
  } else {
    disableDeleteBtn(deleteBtn);
    todo.delete = false;
  }
}

// DELETE TASK CARD -- ALL ITEMS CHECKED
function deleteCards() {
  rightSect.innerHTML = '';
}

// DISPLAY MESSAGE
function displayMessage(array, message) {
  if (!array.lenth) {
    rightSect.insertAdjacentHTML('afterbegin', `<h3 id='index-message'>${message}</h3>`);
    return;
  } else {
    deleteCards();
    displayCards(array);
  }
}

// CHECK ITEM AS COMPLETE (TOGGLE)

// CHECK CARD AS URGENT (TOGGLE)

// SEARCH BY TITLE

// SEARCH BY URGENCY

// FILTER BY URGENCY
