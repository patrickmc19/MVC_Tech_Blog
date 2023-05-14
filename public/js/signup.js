const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#usernameInput").value.trim();
  const email = document.querySelector("#emailInput").value.trim();
  const password = document.querySelector("#passwordInput").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPasswordInput")
    .value.trim();

  if (!username || !password || !email) {
    alert("You must provide an email, username, password.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (username && password && email) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".signupForm").addEventListener("submit", signupHandler);
