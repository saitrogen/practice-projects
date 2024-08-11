let employees = ["asher"];
let revenueData = {
  "2024-08-01": {
    asher: 100,
  },
};

const employeeSelector = document.getElementById("employeeSelector");
const dateInput = document.getElementById("date-input");
const amountInput = document.getElementById("amount-input");

updateTableColumns();
function addEmployee() {
  const inputAddEmployeeElement = document.getElementById("input-addEmployee");
  const newEmployee = inputAddEmployeeElement.value.trim();

  if (newEmployee !== "" && employees && !employees.includes(newEmployee)) {
    employees.push(newEmployee);
    inputAddEmployeeElement.value = "";
    updateEmployeeOption();
  } else if (newEmployee === "") {
    alert("Please enter employee name");
  } else {
    alert("Employee already exists,\nplease enter a new employee name");
  }
  console.log(revenueData);
  updateTableColumns();
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

/*For example, if the employees array contains the values ["John", "Jane", "Bob"], 
then the forEach loop will iterate over each value and assign it to the employee variable, like this:

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
function clearEmployees() {
  employees = [];
  updateEmployeeOption();
  updateTableColumns();
  console.log(employees);
  console.log(employeeSelector);
}
function updateTableColumns() {
  const tableHeadRow = document.getElementById("table-head-row");
  const totalRow = document.getElementById("table-foot-row");
  const fragment1 = document.createDocumentFragment("1");
  const fragment2 = document.createDocumentFragment("2");


  while (tableHeadRow.children.length > 2) {
    tableHeadRow.removeChild(tableHeadRow.children[1]);
  }
  while (totalRow.children.length > 2) {
    totalRow.removeChild(totalRow.children[1]);
  }

  employees.forEach((employee) => {
    const th = document.createElement("th");
    th.textContent = employee;
    fragment1.appendChild(th);

    const totalTh = document.createElement("th");
    totalTh.textContent = 0;
    fragment2.appendChild(totalTh);
  });
  tableHeadRow.insertBefore(fragment1, tableHeadRow.lastElementChild);
  totalRow.insertBefore(fragment2, totalRow.lastElementChild);
  
}

/**
 * Function to add revenue data
 * It retrieves the selected employee, date, and amount from the input fields
 * and checks if all fields are filled. If not, it displays an alert and returns.
 * Then it checks if the revenue data for the selected date already exists.
 * If not, it creates an empty object for that date in the revenueData.
 *
 * @returns {void}
 */

function addRevenue() {
  // Retrieve the selected employee, date, and amount from the input fields
  const { value: employee } = employeeSelector;
  const { value: date } = dateInput;
  const { value: amount } = amountInput;

  // Check if all fields are filled. If not, display an alert and return.
  if (!employee || !date || !amount) {
    alert("Please fill in all fields");
    return;
  }

  // Check if the revenue data for the selected date already exists.
  // If not, create an empty object for that date in the revenueData.
  if (!revenueData[date]) {
    revenueData[date] = {};
    console.log(revenueData);
  }
  // Add revenue to the corresponding employee
  if (!revenueData[date][employee]) {
    revenueData[date][employee] = 0;
  }
  revenueData[date][employee] += parseFloat(amount);
  console.log(revenueData);
}
