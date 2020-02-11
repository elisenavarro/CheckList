class ToDoList {
  constructor(id, title, taskArray, urgent) {
    this.id = id;
    this.title = title;
    this.taskArray = taskArray || [];
    this.urgent = urgent || false;
  }

  // SAVE
  saveToStorage(array) {
    localStorage.setItem('todoListArray', JSON.stringify(array));
  }
  // DELETE
  deleteFromStorage(index) {
    cardArray.splice(index, 1); // remove card at index
    this.saveToStorage(cardArray); // updates cards array
  }
  // URGENT
  updateToDo(array) {
    this.urgent = !this.urgent;
    this.saveToStorage(array); // update status to urgent
  }
  // COMPLETE
  updateTask(index) {
    this.taskArray[index].checked = !this.taskArray[index].checked;
    this.saveToStorage(cardArray);
  }
}
