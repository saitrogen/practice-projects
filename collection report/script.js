
const tableBody = document.getElementById('revenue-table').getElementsByTagName('tbody')[0];

document.getElementById('add-revenue').addEventListener('click', function () {
  const employeeName = document.getElementById('employee-name').value;
  const revenueDate = document.getElementById('revenue-date').value;
  const revenueAmount = parseFloat(document.getElementById('revenue-amount').value);

  if (employeeName && revenueDate && revenueAmount) {
    // Check if a row for the given date already exists
    //  [...tableBody.rows] this will create an array of all the rows in the table : [row1,row2,row3 ]etc
    let dateRow = [...tableBody.rows].find(row => row.cells[0].textContent === revenueDate);

    

    if (!dateRow) {
      // If no row for the date exists, create a new one
      dateRow = tableBody.insertRow();
      dateRow.insertCell(0).textContent = revenueDate;
      dateRow.insertCell(1).textContent = "0"; // John
      dateRow.insertCell(2).textContent = "0"; // Jane
      dateRow.insertCell(3).textContent = "0"; // Doe
      dateRow.insertCell(4).textContent = "0"; // Day Total
    }

    // Update the corresponding cell for the employee
    const employeeIndex = { "John": 1, "Jane": 2, "Doe": 3 }; // Map employee names to column indexes
    const employeeCell = dateRow.cells[employeeIndex[employeeName]];
    employeeCell.textContent = parseFloat(employeeCell.textContent) + revenueAmount;

    // Update the daily total
    const dayTotalCell = dateRow.cells[4];
    dayTotalCell.textContent = parseFloat(dayTotalCell.textContent) + revenueAmount;

    // Update the overall totals
    updateTotals(employeeName, revenueAmount);
    
    // Clear the input fields after adding the data
    document.getElementById('employee-name').value = '';
    document.getElementById('revenue-date').value = '';
    document.getElementById('revenue-amount').value = '';
  } else {
    alert('Please fill out all fields.');
  }
});

function updateTotals(employeeName, amount) {
  const totalCellId = `${employeeName.toLowerCase()}-total`;
  const totalCell = document.getElementById(totalCellId);
  totalCell.textContent = parseFloat(totalCell.textContent) + amount;

  // Update the grand total
  const grandTotalCell = document.getElementById('grand-total');
  grandTotalCell.textContent = parseFloat(grandTotalCell.textContent) + amount;
}