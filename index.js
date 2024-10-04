// Import stylesheets
import './style.css';

class BMIPlugin {
  constructor() {
  }
  
  install(context, option) {
  }

  localDate(lang, date) {
  }

  calculate(height, weight) {
  }

  greeting(lang, profile) {
  }
}

// Binding HTML elements
const h1Element = document.querySelector("h1");
const h2Element = document.querySelector("h2");
const h5Element = document.querySelector("h5");
const heightElement = document.querySelector("#height");
const weightElement = document.querySelector("#weight");
const btnElement = document.querySelector("button");

// Function to fetch and display form data
async function fetchFormData() {
  try {
    const response = await fetch('https://tally.so/r/mRYPbl');
    const data = await response.json();
    
    // Assuming the data is an array of form responses
    const tableBody = document.querySelector("#data-table tbody");
    data.forEach(response => {
      const row = document.createElement("tr");
      Object.values(response).forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching form data:", error);
  }
}

// Call the function to fetch and display data
fetchFormData();
