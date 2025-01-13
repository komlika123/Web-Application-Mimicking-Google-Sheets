document.addEventListener('DOMContentLoaded', () => {
    const sheetBody = document.querySelector('#sheet tbody');
    const addRowButton = document.getElementById('addRow');
    const deleteRowButton = document.getElementById('deleteRow');
    const saveDataButton = document.getElementById('saveData');
    const removeDuplicatesButton = document.getElementById('removeDuplicates');
    
  
const formulaInput = document.getElementById('formulaInput');

function fetchData() {
        fetch('http://localhost:3000/api/data')
            .then(response => response.json())
            .then(data => {
                sheetBody.innerHTML = ''; // Clear existing rows
                data.forEach(row => addRow(row));
            });
}

// Function to add a new row to the sheet
function addRow(data = ['', '', '']) {
        const row = document.createElement('tr');
        for (let i = 0; i < 3; i++) { // Assuming three columns
            const cell = document.createElement('td');
            cell.contentEditable = true; // Make cell editable
            cell.textContent = data[i];
            row.appendChild(cell);
        }
        sheetBody.appendChild(row);
        updateCellDependencies();
}

// Function to delete selected rows
function deleteSelectedRows() {
        const selectedRows = Array.from(sheetBody.rows).filter(row => row.classList.contains('selected'));
        selectedRows.forEach(row => row.remove());
        updateCellDependencies();
}

// Function to evaluate formulas based on dependencies
function updateCellDependencies() {
     const cells = Array.from(sheetBody.querySelectorAll("td"));
     cells.forEach(cell => {
         if (cell.textContent.startsWith("=")) { // Check if it's a formula
             try {
                 const formulaResult = evalFormula(cell.textContent.slice(1));
                 cell.textContent = formulaResult; // Update cell with result of formula
             } catch (error) {
                 console.error("Error evaluating formula:", error);
             }
         }
     });
}

// Function to evaluate formulas like SUM, AVERAGE etc.
function evalFormula(formula) {
     let result;

     if (formula.startsWith("SUM")) { 
         const range = formula.slice(4, -1).split(":").map(cellRef => getCellValue(cellRef.trim()));
         result = range.reduce((acc, val) => acc + val, 0); 
     } else if (formula.startsWith("AVERAGE")) { 
         const range = formula.slice(8, -1).split(":").map(cellRef => getCellValue(cellRef.trim()));
         result = range.reduce((acc, val) => acc + val, 0) / range.length; 
     } else if (formula.startsWith("MAX")) { 
         const range = formula.slice(4, -1).split(":").map(cellRef => getCellValue(cellRef.trim()));
         result = Math.max(...range); 
     } else if (formula.startsWith("MIN")) { 
         const range = formula.slice(4, -1).split(":").map(cellRef => getCellValue(cellRef.trim()));
         result = Math.min(...range); 
     } else if (formula.startsWith("COUNT")) { 
         const range = formula.slice(6, -1).split(":").map(cellRef => getCellValue(cellRef.trim()));
         result = range.filter(val => typeof val === 'number').length; 
     } else { 
         throw new Error("Unsupported formula");
     }

     return result; 
}

// Function to get value from a cell reference like A1 or B2.
function getCellValue(ref) { 
      const colIndex = ref.charCodeAt(0) - 'A'.charCodeAt(0); 
      const rowIndex = parseInt(ref.slice(1)) - 1; 

      if (sheetBody.rows[rowIndex]) { 
          return parseFloat(sheetBody.rows[rowIndex].cells[colIndex].textContent) || 0; 
      }
      return 0; 
}

// Add event listener to add row button
addRowButton.addEventListener('click', () => {
     addRow(); // Add an empty row by default
});

// Add event listener to delete row button
deleteRowButton.addEventListener('click', deleteSelectedRows);

// Add event listener to save data button
saveDataButton.addEventListener('click', () => {
     const rows = Array.from(sheetBody.rows);
     const dataToSave = rows.map(row => Array.from(row.cells).map(cell => cell.textContent));
     
     fetch('http://localhost:3000/api/data', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(dataToSave)
     })
     .then(response => response.text())
     .then(message => alert(message));
});

// Function to remove duplicate rows from the table.
removeDuplicatesButton.addEventListener('click', () => {
     let seenRows = new Set();
     let uniqueRows = [];

     Array.from(sheetBody.rows).forEach(row => {
         let rowData = Array.from(row.cells).map(cell => cell.textContent).join('|'); // Join cell values for comparison

         if (!seenRows.has(rowData)) {
             seenRows.add(rowData);
             uniqueRows.push(row);
         }
     });

     sheetBody.innerHTML = ''; // Clear existing rows and re-add unique rows.
     uniqueRows.forEach(row => sheetBody.appendChild(row));
});

// Functionality for Find and Replace feature.
document.getElementById('findAndReplace').addEventListener('click', () => {
     const findText = prompt("Enter text to find:");
     const replaceText = prompt("Enter text to replace with:");

     Array.from(sheetBody.querySelectorAll("td")).forEach(cell => {
         if (cell.textContent.includes(findText)) {
             cell.textContent = cell.textContent.replace(new RegExp(findText, 'g'), replaceText);
         }
     });
});

fetchData(); // Load existing data when page loads

});
