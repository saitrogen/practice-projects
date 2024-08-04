const todoList = ['eat', 'sleep', 'code'];

displayList();
function displayList() {
  let todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const task = todoList[i];

    // const li = document.createElement('li');
    // li.textContent = task;
    // document.querySelector('ul').appendChild(li);

    // document.querySelector('.js-task-area').innerHTML += `<p>${task}</p>`;

    const html = `
    
    <p>
      ${task}
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
  const inputs = inputElement.value;
  todoList.push(inputs);
  console.log(todoList);
  // to make inputbox empty after adding task
  inputElement.value = "";
  displayList();
}
