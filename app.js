document.addEventListener('DOMContentLoaded', () => {
    // Initialize the spreadsheet
    fetchData(); // Load existing data when page loads

    // Event listeners for toolbar buttons
    document.getElementById('addRow').addEventListener('click', addRow);
    document.getElementById('deleteRow').addEventListener('click', deleteSelectedRows);
    document.getElementById('saveData').addEventListener('click', saveSpreadsheet);
    document.getElementById('removeDuplicates').addEventListener('click', removeDuplicates);
    document.getElementById('findAndReplace').addEventListener('click', findAndReplace);
});
