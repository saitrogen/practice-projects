const todoList = [{task:"asdfg",
  dueDate:"12/20/2020"
}];

displayList();
function displayList() {
  let todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const taskObject = todoList[i];
    
    // const task = taskObject.task; 
    // const dueDate = taskObject.dueDate;
    // shorthand property
    const {task, dueDate} = taskObject; 
    
    const html = `
    <p>
      ${task} ${dueDate}
      <button onclick="
      todoList.splice(${i}, 1);
      displayList();
      ">Delete</button>
    </p>
    
    `;
    todoListHTML += html; // todoListHTML = todoListHTML + html;
    /* it does repeat the same thing but the innerHTML will remove 
        the previous value inside the div fist then update the new value */
    document.querySelector(".js-task-area").innerHTML = todoListHTML;
    console.log(todoListHTML);
  }
}
function handleKeydown() {
  console.log(event.key);
  if (event.key === "Enter") {
    AddTask();
  }
}
function AddTask() {
  const inputElement = document.querySelector(".js-input");
  const task = inputElement.value;

  const dateinputElement = document.querySelector(".js-date-in");
  const dueDate = dateinputElement.value;

  todoList.push({
    // task:task,
    // dueDate:dueDate
    task,
    dueDate
  });
  console.log(todoList);
  // to make inputbox empty after adding task
  inputElement.value = "";
  displayList();
}
