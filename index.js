// Import stylesheets
import './style.css';

class SurveyPlugin {
  constructor() {
    this.name = 'survey';
  }

  install(context, option) {
    return {
      today: this.localDate(context.liff.getLanguage(), option.date),
    };
  }

  localDate(lang, date) {
    const locale = lang === 'en' ? 'en-US' : 'th-TH';
    return date.toLocaleDateString(locale, {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  }

  greeting(lang, profile) {
    const prefix = (lang === "en") ? "Hello" : "สวัสดี";
    return `${prefix} ${profile.displayName}!`;
  }
}

// Binding HTML elements
const nameElement = document.querySelector('#name');
const dobElement = document.querySelector('#dob');
const genderElement = document.querySelector('#gender');
const heightElement = document.querySelector('#height');
const weightElement = document.querySelector('#weight');
const phoneElement = document.querySelector('#phone');
const btnElement = document.querySelector('button');
const resultElement = document.querySelector('#result');
const h1Element = document.querySelector('h1');

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

// Initialize LIFF
async function initializeLiff() {
  try {
    await liff.init({ liffId: U9714467bf7310a81da22146ed10705ca }); // Replace YOUR_LIFF_ID with your actual LIFF ID
    liff.use(new SurveyPlugin(), { date: new Date() });

    // Display locale date
    document.querySelector('#date').innerHTML = liff.$survey.today;

    // Check login status
    if (liff.isLoggedIn()) {
      // Get user profile
      const profile = await liff.getProfile();
      h1Element.innerHTML = liff.$survey.greeting(liff.getLanguage(), profile);
    } else {
      liff.login();
    }

    // Fetch and display form data
    fetchFormData();
  } catch (error) {
    console.error('LIFF initialization failed', error);
  }
}

initializeLiff();

// Add event listener to Submit button
btnElement.addEventListener('click', () => {
  const name = nameElement.value;
  const dob = dobElement.value;
  const gender = genderElement.value;
  const height = parseFloat(heightElement.value);
  const weight = parseFloat(weightElement.value);
  const phone = phoneElement.value;

  resultElement.innerHTML = `
    <p>ชื่อ: ${name}</p>
    <p>วัน เดือน ปีเกิด: ${dob}</p>
    <p>เพศ: ${gender}</p>
    <p>น้ำหนัก: ${weight} kg</p>
    <p>ส่วนสูง: ${height} cm</p>
    <p>เบอร์ติดต่อกลับ: ${phone}</p>
  `;
});
