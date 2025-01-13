function fetchData() {
    fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            const sheetBody = document.querySelector('#sheet tbody');
            sheetBody.innerHTML = ''; // Clear existing rows
            data.forEach(row => addRow(row));
        });
}

function addRow(data = ['', '', '']) {
    const sheetBody = document.querySelector('#sheet tbody');
    const row = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
        const cell = document.createElement('td');
        cell.contentEditable = true;
        cell.textContent = data[i];
        row.appendChild(cell);
    }
    sheetBody.appendChild(row);
}

// Additional functions for deleting rows, handling selection, etc.
