let employees = [];

const employeeSelector = document.getElementById("employeeSelector");
const dateInput = document.getElementById("date-input");
const amountInput = document.getElementById("amount-input");
const addBtn = document.getElementById("add-btn");

//
function addEmployee() {
  const inputAddEmployeeElement = document.getElementById("input-addEmployee");
  const newEmployee = inputAddEmployeeElement.value.trim();
  if (newEmployee) {
    employees.push(newEmployee);
    inputAddEmployeeElement.value = "";
    updateEmployeeOption();
  }
  
}
function updateEmployeeOption() {
  employeeSelector.innerHTML = ""; // Clear the existing options
  const fragment = document.createDocumentFragment(); // Create a document fragment
  employees.forEach((employee) => {
    const option = new Option(employee, employee); // Create a new option element
    fragment.appendChild(option); // Append the option to the fragment
  });
  employeeSelector.appendChild(fragment); // Append the fragment to the select element
}
/*For example, if the employees array contains the values ["John", "Jane", "Bob"], then the forEach loop will iterate over each value and assign it to the employee variable, like this:

employee = "John" (first iteration)
employee = "Jane" (second iteration)
employee = "Bob" (third iteration) */

/* function updateEmployeeOption(){
     employees.forEach(employee => {
      const option = document.createElement("option");
      option.value = employee;
      option.textContent = employee;
      employeeSelector.appendChild(option);
    });
  }
*/
