//register

const registerFormEl = document.querySelector("[data-register-form]");
const usernameInput = document.querySelector("[data-register-username]");
const passwordInput = document.querySelector("[data-register-password]");
const ageInput = document.querySelector("[data-register-age]");
const emailInput = document.querySelector("[data-register-email]");
const firstNameInput = document.querySelector("[data-register-firstname]");
const lastNameInput = document.querySelector("[data-register-lastname]");
const countryInput = document.querySelector("[data-register-country]");
const cityInput = document.querySelector("[data-register-city]");
const zipInput = document.querySelector("[data-register-zipcode]");
const errorMsgregister = document.querySelector("[data-register-error]");

registerFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const registerBody = {
    username: usernameInput.value,
    password: passwordInput.value,
    age: ageInput.value,
    email: emailInput.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: {
      country: countryInput.value,
      city: cityInput.value,
      zipCode: zipInput.value,
    },
  };
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerBody),
  });
  const data = await res.json();
  console.log(data);
  errorMsgregister.innerHTML = "Register Complete!";

  if (data.error != undefined) {
    errorMsgregister.innerHTML = `<i class="material-icons">&#xe002;</i> ${data.error}`;
    setTimeout(() => {
      errorMsgregister.innerHTML = "";
    }, 4000);
  } else window.location.href = "./login.html";
});

function showPassword() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
