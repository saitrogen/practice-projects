
let employees = ['John', 'Jane', 'Doe']; // Initial list of employees

// Function to populate the dropdown with employee names
function populateEmployeeDropdown() {
    const select = document.getElementById('employeeSelect');
    select.innerHTML = ''; // Clear current options
    employees.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee;
        option.textContent = employee;
        select.appendChild(option);
    });
}

// Function to add a new employee
function addEmployee() {
    const employeeName = document.getElementById('newEmployeeName').value.trim();
    if (employeeName && !employees.includes(employeeName)) {
        employees.push(employeeName); // Add the new employee to the list
        populateEmployeeDropdown(); // Update the dropdown with the new employee
        addEmployeeColumn(employeeName); // Add a new column to the table
        document.getElementById('newEmployeeName').value = ''; // Clear the input field
    } else {
        alert('Please enter a unique employee name.');
    }
}

// Function to remove an employee
function removeEmployee() {
    const employeeName = document.getElementById('employeeSelect').value;
    if (employeeName) {
        const index = employees.indexOf(employeeName);
        if (index > -1) {
            employees.splice(index, 1); // Remove the employee from the list
            populateEmployeeDropdown(); // Update the dropdown
            removeEmployeeColumn(index + 1); // Remove the column (adjusting for Date column)
        }
    } else {
        alert('Please select an employee to remove.');
    }
}

// Function to add a new column to the table
function addEmployeeColumn(employeeName) {
    const table = document.getElementById('revenueTable');

    // Add header for the new employee
    const headerRow = table.rows[0];
    const newHeaderCell = document.createElement('th');
    newHeaderCell.innerText = employeeName;
    headerRow.insertBefore(newHeaderCell, headerRow.cells[headerRow.cells.length - 1]); // Add before the "dayTotal" column

    // Add cells for the new employee in each row
    for (let i = 1; i < table.rows.length; i++) {
        const newRowCell = document.createElement('td');
        newRowCell.innerText = '0';
        table.rows[i].insertBefore(newRowCell, table.rows[i].cells[table.rows[i].cells.length - 1]); // Add before the "dayTotal" cell
    }
}

// Function to remove a column from the table and clear associated revenue data
function removeEmployeeColumn(columnIndex) {
    const table = document.getElementById('revenueTable');

    // Remove header for the employee
    const headerRow = table.rows[0];
    headerRow.deleteCell(columnIndex);

    // Remove cells for the employee in each row and update day totals
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].deleteCell(columnIndex);
        updateDayTotal(table.rows[i]); // Update day total after removal
    }
    updateOverallTotals(); // Update overall totals after removal
}

// Function to find or create a row for a specific date
function findOrCreateRowForDate(date) {
    const table = document.getElementById('revenueTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerText === date) {
            return table.rows[i];
        }
    }
    // If no row for this date, create a new one
    const newRow = table.insertRow();
    const dateCell = newRow.insertCell(0);
    dateCell.innerText = date;
    // Add empty cells for each employee
    for (let i = 1; i <= employees.length + 1; i++) {
        newRow.insertCell(i).innerText = '0'; // +1 for the "dayTotal" column
    }
    return newRow;
}

// Function to update the day total for a specific row
function updateDayTotal(row) {
    let dayTotal = 0;
    for (let i = 1; i < row.cells.length - 1; i++) {
        dayTotal += parseFloat(row.cells[i].innerText) || 0;
    }
    row.cells[row.cells.length - 1].innerText = dayTotal;
}

// Function to update the overall totals in the footer row
function updateOverallTotals() {
    const table = document.getElementById('revenueTable');
    const footerRow = document.getElementById('totalRow');
    for (let i = 1; i < footerRow.cells.length; i++) {
        let columnTotal = 0;
        for (let j = 1; j < table.rows.length - 1; j++) { // Skip header and footer
            columnTotal += parseFloat(table.rows[j].cells[i].innerText) || 0;
        }
        footerRow.cells[i].innerText = columnTotal;
    }
}

// Function to add revenue for the selected employee and date
function addRevenue() {
    const date = document.getElementById('dateInput').value;
    const employeeName = document.getElementById('employeeSelect').value;
    const revenue = parseFloat(document.getElementById('revenueInput').value);

    if (isNaN(revenue)) {
        alert('Please enter a valid revenue amount.');
        return;
    }

    // Find the correct row for the given date or create a new one
    let row = findOrCreateRowForDate(date);

    // Find the correct cell for the selected employee
    const employeeIndex = employees.indexOf(employeeName) + 1; // Adjust for 0-based index and the Date column
    const cell = row.cells[employeeIndex];

    // Update the revenue for the employee
    const currentRevenue = parseFloat(cell.innerText) || 0;
    cell.innerText = currentRevenue + revenue;

    // Update the day total
    updateDayTotal(row);

    // Update overall totals
    updateOverallTotals();

    // Reset the input field
    document.getElementById('revenueInput').value = '';
}

// Function to edit revenue for the selected employee and date
function editRevenue() {
    const date = document.getElementById('dateInput').value;
    const employeeName = document.getElementById('employeeSelect').value;
    const revenue = parseFloat(document.getElementById('revenueInput').value);

    if (isNaN(revenue)) {
        alert('Please enter a valid revenue amount.');
        return;
    }

    // Find the correct row for the given date
    const row = findOrCreateRowForDate(date);

    // Find the correct cell for the selected employee
    const employeeIndex = employees.indexOf(employeeName) + 1; // Adjust for 0-based index and the Date column
    const cell = row.cells[employeeIndex];

    // Update the revenue for the employee
    cell.innerText = revenue;

    // Update the day total
    updateDayTotal(row);

    // Update overall totals
    updateOverallTotals();

    // Reset the input field
    document.getElementById('revenueInput').value = '';
}

// Function to delete a specific revenue entry
function deleteRevenue() {
    const date = document.getElementById('dateInput').value;
    const employeeName = document.getElementById('employeeSelect').value;

    // Find the correct row for the given date
    const row = findOrCreateRowForDate(date);

    // Find the correct cell for the selected employee
    const employeeIndex = employees.indexOf(employeeName) + 1; // Adjust for 0-based index and the Date column
    const cell = row.cells[employeeIndex];

    // Delete the revenue for the employee (set to 0)
    cell.innerText = '0';

    // Update the day total
    updateDayTotal(row);

    // Update overall totals
    updateOverallTotals();
}

// Function to filter table by date
function filterByDate() {
    const date = document.getElementById('filterDateInput').value;
    const table = document.getElementById('revenueTable');
    for (let i = 1; i < table.rows.length - 1; i++) { // Skip header and footer
        if (table.rows[i].cells[0].innerText !== date) {
            table.rows[i].style.display = 'none';
        } else {
            table.rows[i].style.display = '';
        }
    }
}

// Function to filter table by employee
function filterByEmployee() {
    const employeeName = document.getElementById('filterEmployeeSelect').value;
    const employeeIndex = employees.indexOf(employeeName) + 1; // Adjust for Date column
    const table = document.getElementById('revenueTable');
    for (let i = 1; i < table.rows.length - 1; i++) { // Skip header and footer
        for (let j = 1; j < table.rows[i].cells.length - 1; j++) {
          if (j !== employeeIndex) {
            table.rows[i].cells[j].style.display = 'none';
        } else {
            table.rows[i].cells[j].style.display = '';
        }
    }
}
}

// Function to clear all filters and show the full table
function clearFilters() {
const table = document.getElementById('revenueTable');
for (let i = 1; i < table.rows.length - 1; i++) { // Skip header and footer
    table.rows[i].style.display = '';
    for (let j = 1; j < table.rows[i].cells.length - 1; j++) {
        table.rows[i].cells[j].style.display = '';
    }
}
}

// Function to export the table data to CSV
function exportToCSV() {
let csvContent = "data:text/csv;charset=utf-8,";
const table = document.getElementById('revenueTable');

for (let i = 0; i < table.rows.length; i++) {
    let row = [];
    for (let j = 0; j < table.rows[i].cells.length; j++) {
        row.push(table.rows[i].cells[j].innerText);
    }
    csvContent += row.join(",") + "\n";
}

const encodedUri = encodeURI(csvContent);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "revenue_data.csv");
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

// Function to clear all data from the table
function clearAllData() {
if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
    const table = document.getElementById('revenueTable');
    for (let i = 1; i < table.rows.length - 1; i++) { // Skip header and footer
        for (let j = 1; j < table.rows[i].cells.length - 1; j++) {
            table.rows[i].cells[j].innerText = '0';
        }
    }
    updateOverallTotals(); // Reset the totals to zero
}
}

// Initial population of the employee dropdown and table setup
populateEmployeeDropdown();
updateOverallTotals();
