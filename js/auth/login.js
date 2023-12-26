import {
  backendURL,
  successNotification,
  errorNotification,
} from "../utils/utils.js";

// Form Login
const form_login = document.getElementById("form_login");
console.log("Okay");
form_login.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#form_login button").disabled = true;
  document.querySelector(
    "#form_login button"
  ).innerHTML = `<div class="spinner-border text-su me-3" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(form_login);

  // Fetch API User Login Endpoint
  const response = await fetch(backendURL + "/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  // Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();

    // Store Token
    localStorage.setItem("token", json.token);

    // Store Role
    localStorage.setItem("role", json.user.role);

    form_login.reset();

    successNotification("Successfully login account.");

    // Redirect Page
    window.location.pathname = "/dashboard.html";
  }
  // Get response if 422 status code
  else if (response.status == 422) {
    const json = await response.json();

    errorNotification(json.message, 5);
  }

  // Enable Button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Login`;
};
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://a57d-216-247-39-181.ngrok-free.app/api/login';

fetch(apiUrl, {
  method: 'POST', // or any other HTTP method you need
  headers: {
    'Content-Type': 'application/json',
  },
  // Add your request body if needed
  // body: JSON.stringify({ key: 'value' }),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Fetch error:', error);
  });