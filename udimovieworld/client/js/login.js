const loginFormEl = document.querySelector("[data-login-form]");
const usernameInputlogin = document.querySelector("[data-login-username]");
const passwordInputlogin = document.querySelector("[data-login-password]");

const errorMsglogin = document.querySelector("[data-login-error]");

loginFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginBody = {
    username: usernameInputlogin.value,
    password: passwordInputlogin.value,
  };
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  });
  const data = await res.json();
  console.log(data);

  localStorage.setItem("token", data.token);
  if (data.error != undefined) {
    errorMsglogin.innerHTML = `<span style="color:#eb2f06"; class="material-icons-outlined">
    do_not_disturb
    </span> ${data.error}`;
    setTimeout(() => {
      errorMsglogin.innerHTML = "";
    }, 4000);
  } else {
    errorMsglogin.innerHTML =
      '<span style="color:#2ecc71"; class="material-icons-outlined">verified_user</span>';

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  }
});

function showPassword() {
  if (passwordInputlogin.type === "password") {
    passwordInputlogin.type = "text";
  } else {
    passwordInputlogin.type = "password";
  }
}
