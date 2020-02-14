// Variables -- Query Selectors
const titleIn = document.querySelector('#task-title');
const taskItem = document.querySelector('#task-item-input');
const addTaskBtn = document.querySelector('#plus-btn');
const makeTodoBtn = document.querySelector('#make-btn');
const clearBtn = document.querySelector('#clear-btn');
const rightSect = document.querySelector('.card-index')
//const pendingItemList = document.querySelector('#task-item-list');
const output = document.querySelector('output');
let todoArray = [];


// Event Listeners
titleIn.addEventListener('keyup', disableButtonHandler);
taskItem.addEventListener('keyup', disableButtonHandler);
addTaskBtn.addEventListener('click', addTaskHandler);
makeTodoBtn.addEventListener('click', createTaskList);
output.addEventListener('click', removeTaskItem);
clearBtn.addEventListener('click', clearTaskList);
// pendingItemList.addEventListener('click', deleteTask);
rightSect.addEventListener('click', sectionHandler);
window.addEventListener('load', handlePageload);

// Event Handlers
function addTaskHandler(){
  createTask();
  disableButtonHandler();
}

function makeTodoBtnHandler(){
  createTask();
  createTaskList();
  displayMessage(todoArray, 'No Tasks Yet');
  clearTaskList();
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

function sectionHandler(){
  toggleTaskComplete(event);
  removeTodo(event);
}

// Functions
// CREATE NEW TASK ITEM
function createTask() {
  const task = {
      id: Date.now(),
      text: taskItem.value,
      done: false }
    let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    tasksArray.push(task);
    saveToStorage(tasksArray);
    addTask(task);
  }

// DISABLE MAKE TODO BUTTON
function disableMakeTodoBtn() {
  if (titleIn.value === '' || output.innerHTML === '') {
    makeTodoBtn.disabled = true;
  } else  {
    makeTodoBtn.disabled = false;
  }
}

// DISABLE BUTTONS
function disableButton(button) {
  if (!titleIn.value || !output.innerHTML) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

// ADD PENDING TASK ITEM TO LIST
function addTask(obj) {
  output.insertAdjacentHTML('beforeend',
    `<li class="add-task" data-id=${obj.id}>
      <img src="images/delete.svg" class="list-icon-delete" id="pending-item" alt="delete icon"/>${obj.text}</p>
    </li>`);
  taskItem.value = '';
}

// DISABLE ADD PENDING TASK ITEM BUTTON
function disableAddTaskBtn() {
  if (!titleIn.value || !taskItem.value) {
    addTaskBtn.disabled = true;
  } else {
    addTaskBtn.disabled = false;
  }
}

// DELETE PENDING TASK ITEM FROM LIST
function removeTaskItem(e) {
  if (e.target.classList.contains('delete-task')) {
    e.target.closest('li').remove();
    let tasksArray = getTasksArray();
    let targetIndex = findTargetIndex(e, tasksArray, 'task-to-add');
    tasksArray.splice(targetIndex, 1);
    saveToStorage(tasksArray);
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
function saveToStorage(array){
  localStorage.setItem('tasksArray', JSON.stringify(array));
}

// CREATE TODO TASK LIST
function createTaskList() {
  let tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
  const todo = new TodoList(Date.now(), titleInput.value, tasksArray);
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

// DISABLE CLEAR TASKS BUTTON
function disableClearButton() {
  if (!titleIn.value || !output.innerHTML) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
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
  const uList = `<ul>`;
  array.forEach(function(task) {
    const checkPath = task.done ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
    const checkClass = task.done ? 'checked' : '';
    uList += `<li class="taskItem ${checkClass}" data-id="${task.id}"><img src="${checkPath}" class="img-check" alt="Check off"> ${task.text} </li>`
  });
  return uList;
}

// CREATE TASK CARD
function createCard(e) {
  e.preventDefault();
  let todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  let taskCard = new TodoList(Date.now(), titleInput.value, todoTasks);
  cardsArray.push(taskCard);
  taskCard.saveToStorage(cardsArray);
  if (localStorage.getItem('taskListArray')) {
    createTodoTask();
    localStorage.removeItem('todoTasks');
  }
  generateCard(taskCard);
}

// DISPLAY CARDS
function displayCards(array){
  array.forEach(function(todos){
    displayToDo(todos)
  });
}

// DELETE TASK ITEM FROM CARD
function removeTodo(e) {
  if (e.target.classList.contains('delete-card')){
    let targetIndex = findTargetIndex(e, todoArray, 'card-index');
    todoArray[targetIndex].deleteFromStorage(todoArray, targetIndex);
    e.target.closest('card-index').remove();
    displayMessage(todoArray, 'Done')
  }
}

// FIND CARD BY ID

// FIND TASK BY ID

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

// DELETE ITEM FROM CARD LIST ARRAY
function checkDeleteButton(e,tasksArray) {
  if (tasksArray.every(function(tasks){
    return tasks.done === true
  })) {
    e.target.closest('card-index').querySelector('.img-delete').setAttribute('src', 'images/delete.svg')
  } else {e.target.closest('card-index').querySelector('.img-delete').setAttribute('src', 'images/delete-active.svg')
  }
}

// DELETE TASK CARD -- ALL ITEMS CHECKED
function deleteCards() {
  rightSect.innerHTML = '';
}

// DISPLAY MESSAGE
function displayMessage(array, message) {
  if (!array.lenth) {
    rightSect.insertAdjacentHTML('afterbegin', `<h3 id='h3'>${message}</h3>`);
    return;
  } else {
    deleteCards();
    displayCards(array);
  }
}

// CHECK ITEM AS COMPLETE (TOGGLE)
function toggleTaskComplete(e) {
  if (e.target.classList.contains('img-check')) {
    const todoIndex = findTargetIndex(e, todoArray, 'card-index');
    const listIndex = findTargetIndex(e, todoArray[todoIndex].tasks, 'taskItem');
    let task = todoArray[todoIndex].tasks[listIndex];
    let tasksArray = todoArray[todoIndex].tasks;
    task.done = !task.done;
    toggleCheckbox(e, task, listIndex);
    toggleCheckedClass(e);
    checkDeleteButton(e, tasksArray, todoArray[todoIndex]);
    todoArray[todoIndex].saveToStorage(todoArray);
  }
}

function toggleCheckbox(e, task, liIndex){
  let checked = 'images/checkbox-active.svg';
  let unchecked = 'images/checkbox.svg';
  let imgArray = e.target.closest('card-index').querySelectorAll('.img-check');
  targetImage = imgArray[liIndex];
  if (task.done === true) {
    targetImage.setAttribute('src', checked)
  } else {
    targetImage.setAttribute('src', unchecked)
  }
}

// CHECK CARD AS URGENT (TOGGLE)

// SEARCH BY TITLE

// SEARCH BY URGENCY

// FILTER BY URGENCY
