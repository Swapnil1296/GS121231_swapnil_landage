# Data Viewer

This is a progressive web app built with React, TypeScript, Tailwind CSS, and D3.js for manipulating and analyzing data. The app includes:

- A top navigation bar with a company logo and a placeholder for sign-in/sign-out.
- A left sidebar for navigation between pages.
- A **Stores** page to add, update, remove, and reorder stores.
- A **SKUs** page to add, update, and remove SKUs (including price and cost).
- A **Planning** page that displays a cross join of Stores and SKUs along with a calendar view (weeks grouped by months) where you can enter sales units. Calculated fields (Sales Dollars, GM Dollars, GM %) are computed with conditional formatting for the GM %.
- A **Chart** page that uses D3.js to show a dual-axis chart for GM Dollars (bar) and GM % (line) over weeks for a selected store.

### Frontend
- React 19 with TypeScript
- React Router Dom for routing
- D3.js for charts
- Tailwind CSS for styling
- Heroicons for UI elements
- jest for testing purpose

## Getting Started

1. **Install Dependencies:**  
   Run: npm install
   -this will install all the required dependencies
2. **To Run the Project :**   
   Run: npm run dev 
   -this will run the project in dev mode. click on the link http://localhost:3000/ to open it in browser. 
3. **To Run the Test cases:**   
   Run: npm run test  
   - this will run the test cases for the project.
   -the result should be: 
        -Test Suites: 4 passed, 4 total
        -Tests:       13 passed, 13 total

