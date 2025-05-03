let users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
  const user = {
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    mobile: document.getElementById("regMobile").value,
    dob: document.getElementById("regDob").value,
    city: document.getElementById("regCity").value,
    address: document.getElementById("regAddress").value,
    password: document.getElementById("loginPassword").value || "default",
  };

  if (
    !user.name ||
    !user.email ||
    !/^[0-9]{10}$/.test(user.mobile) ||
    !user.dob ||
    !user.city ||
    !user.address
  ) {
    alert("Please fill all the fields correctly.");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now log in.");
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }
  const user = users.find(
    (u) => u.name === username && u.password === password
  );
  if (user) {
    window.location.href = "user.html";
  } else {
    alert("Invalid username or password.");
  }
}
