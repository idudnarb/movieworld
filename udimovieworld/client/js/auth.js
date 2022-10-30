const headerUserStatusEl = document.getElementById("user-status");
const welcomeEl = document.getElementById("welcometag");
const logoutBut2 = document.querySelector("[data-logout-link]");
const favLinkEl = document.querySelector("[data-favorite-link]");

async function initialTokencheck() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const res = await fetch("http://localhost:3000/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const user = await res.json();
  return user;
}

async function initialApp() {
  const { user } = await initialTokencheck();
  //   console.log(headerUserStatusEl);
  if (!user) {
    headerUserStatusEl.innerHTML = `<a style="text-decoration: none;color:orange" href="register.html"  ><i class="material-icons"   style="color:orange">app_registration</i>Register</a>
    
    <a style="text-decoration: none;color:orange" id="pleaselogin" href="login.html"><i class="material-icons" style="color:orange">login</i>Login</a>`;

    logoutBut2.style.display = "none";
    favLinkEl.style.display = "none";
  } else {
    // headerUserStatusEl.innerHTML = `<i class="material-icons" style="color:orange">person</i> ${user.username}`;
    const firstUserLetter = user.username.charAt(0);
    welcomeEl.innerHTML = "Welcome!";
    headerUserStatusEl.innerHTML = `${firstUserLetter.toUpperCase()}`;

    headerUserStatusEl.style.fontSize = "1em";
    // headerUserStatusEl.style.border = "1px solid #f5f6fa";
    headerUserStatusEl.style.borderRadius = "50%";
    headerUserStatusEl.style.backgroundColor = "#4cd137";
    headerUserStatusEl.style.width = "1.5em";
    headerUserStatusEl.style.height = "1.5em";
    headerUserStatusEl.style.textAlign = "center";
    headerUserStatusEl.style.verticalAlign = "middle";
    headerUserStatusEl.style.lineHeight = "1.5";
    headerUserStatusEl.style.fontFamily = "Verdana, sans-serif";
  }
}

initialApp();
