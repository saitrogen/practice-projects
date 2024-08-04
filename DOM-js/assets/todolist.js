const todoList=[]
function handleKeydown() {
  console.log(event.key);
  if (event.key === 'Enter') {
    AddTask();
  }
}
function AddTask() {
  const inputElement =document.querySelector('.js-input');
  const inputs = inputElement.value;
  todoList.push(inputs);
  console.log(todoList);
  // to make inputbox empty after adding task
  inputElement.value = "";
}