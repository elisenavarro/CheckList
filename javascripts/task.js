class Tasks {
  // each task item has a unique ID and Text details and belongs to list
  constructor(text, id){
    this.text = text;
    this.checked = false;
    this.id = id;
  }

  // GET TASK
  getFromStorage() {
    const newTask = JSON.parse(localStorage.getItem('newTask'));
    return newTask;
  }

  // SAVE TASK TO LIST
  saveToStorage(updateArray) {
    localStorage.setItem('tasks', JSON.stringify(updateArray));
  }
}
