# Google Sheets Mimic

# Overview
This project is a web application that mimics Google Sheets' functionality with features such as mathematical functions, data quality functions, data entry validation, saving/loading capabilities, and data visualization.

# Technology Stack
- Backend: Node.js with Express for handling API requests.
- Frontend: HTML/CSS/JavaScript for building the user interface.
- Data Storage: Local storage for saving spreadsheet data.

# Data Structures
- The spreadsheet is represented as a two-dimensional array where each element corresponds to a cell's content.
- Rows are managed as DOM elements in an HTML table structure.

# Features Implemented
- Mathematical Functions: SUM, AVERAGE, MAX, MIN, COUNT.
- Data Quality Functions: TRIM, UPPER, LOWER, REMOVE_DUPLICATES.
- Support for complex formulas with relative/absolute references.
- Drag-and-drop functionality for cell content.
- Save/load functionality using local storage.
- Data visualization capabilities using Chart.js.

# Usage
To run the application locally:
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Open your browser at `http://localhost:3001`.

## Future Enhancements
- Implement user authentication for saving spreadsheets online.
- Add more advanced data visualization options.
