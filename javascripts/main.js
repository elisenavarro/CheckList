// Variables -- Query Selectors
const titleIn = document.querySelector('#task-title');
const taskItem = document.querySelector('#task-item-input');
const addTaskBtn = document.querySelector('#plus-btn');
const makeTodoBtn = document.querySelector('#make-btn');
const clearBtn = document.querySelector('#clear-btn');
const rightSect = document.querySelector('.card-index')
const pendingItemList = document.querySelector('#task-item-list');
let todoArray = [];


// Event Listeners
addTaskBtn.addEventListener('click', addTaskHandler);
makeTodoBtn.addEventListener('click', createTaskList);
clearBtn.addEventListener('click', clearTaskList);
pendingItemList.addEventListener('click', deleteTask);
window.addEventListener('load', handlePageload);

// Event Handlers
function addTaskHandler(){
  createTask();
}

function makeTodoBtnHandler(){
  createTaskList();
  clearTaskList();
}

function handlePageload() {
  createTasksArray();
  reinstantiateTodo();
  displayCards(todoArray)
}

// Functions
// CREATE NEW TASK ITEM
function createTask() {
  const task = {
      id: Date.now(),
      text: taskItem.value,
      done: false }
    var tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    tasksArray.push(task);
    saveToStorage(tasksArray)
    addTask(task)
    console.log(task)
  }

// ADD PENDING TASK ITEM TO LIST
function addTask(obj) {
  output.insertAdjacentHTML('beforeend',
    `<li class="add-task" data-id=${obj.id}>
    <p><img src="images/delete.svg" class="list-icon-delete" id="pending-item" alt="delete icon"/>${obj.text}</p>
    </li>`);
  taskItem.value = '';
}

// DELETE PENDING TASK ITEM FROM LIST
function deleteTask(e) {
  if (e.target.classList.contains('delete-task')) {
    e.target.closest('li').remove();
  }
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
  const tasksArray = JSON.parse(localStorage.getItem('taskListArray'));
  const newList = new ToDoList(Date.now(), titleInput.value, tasksArray);
  cardsArray.push(newList);
  newList.saveToStorage();
  generateCard(newList);
}

// CLEAR TASK LIST
function clearTaskList() {
  output.innerHTML = '';
  title.value = '';
  taskItem.value = '';
}

// DISPLAY TASK LIST
function displayToDo(obj){
  rightSect.insertAdjacentHTML('afterbegin',
  `<card class="card-index" data-id="${obj.id}">
            <h2 class="card-h2">${obj.title}</h2>
                ${populateTasks(obj.tasks)}</ul>
            <footer class="card-footer">
              <img src="images/urgent.svg" class="img-urgent" alt="urgent">
              <img src="images/delete.svg" class="img-delete" alt="delete">
            </footer>
    </card>`)
}

// DISPLAY TASK LIST > POPULATE INTO ARRAY
function populateTasks(array){
  const uList = `<ul>`;
  array.forEach(function(task) {
    uList += `<li class="taskItem" data-id="${task.id}"><img src="images/checkbox.svg" class="img-check" alt="Check off"> ${task.text} </li>`
  })
  return uList
}


// CREATE TASK CARD
function createCard(e) {
  e.preventDefault();
  var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  var taskCard = new ToDoList(Date.now(), titleInput.value, todoTasks);
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
  })
}

// DELETE TASK CARD -- ALL ITEMS CHECKED

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

// ADD TASK TO CARD LIST ARRAY

// DELETE ITEM FROM CARD LIST ARRAY

// CHECK ITEM AS COMPLETE (TOGGLE)

// CHECK CARD AS URGENT (TOGGLE)

// SEARCH BY TITLE

// SEARCH BY URGENCY

// FILTER BY URGENCY
