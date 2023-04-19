async function signupHandler (event) {
    event.preventDefault();
    const username = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    const email = document.querySelector('#emailInput').value.trim();
    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert(`Account created! Welcome to The Tech Blog ${username}!`);
            document.location.replace('/dashboard/profile');
        } else {
            alert(response.statusText);
        }
    }
}

doucment.querySelector('#signupForm').addEventListener('submit', signupHandler);