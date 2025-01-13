function saveSpreadsheet() {
    const rows = Array.from(document.querySelectorAll('#sheet tbody tr'));
    const dataToSave = rows.map(row => Array.from(row.cells).map(cell => cell.textContent));
    localStorage.setItem('spreadsheetData', JSON.stringify(dataToSave));
}

function loadSpreadsheet() {
    const savedData = JSON.parse(localStorage.getItem('spreadsheetData'));
    if (savedData) {
        savedData.forEach(row => addRow(row));
    }
}
