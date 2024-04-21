const form = document.querySelector('form');

const userName = document.querySelector('#usernameInput')
const mail = document.querySelector('#userMailInput')
const password = document.querySelector('#passwordInput');

const prevError = document.querySelector('#error');

form.addEventListener('submit', signup);

form.addEventListener('input', function() {
    prevError.textContent = ''; // Clear the error message on any input change
});


async function signup(e) {
    e.preventDefault();

    if (!mail.value.includes('@')) {
        prevError.textContent = 'Invalid email format';
        return;
    }

    if (password.value.length < 8) {
        prevError.textContent = 'password must be atleast 8 characters';
        return;
    }

    const newUser = {
        userName: userName.value,
        email: mail.value,
        password: password.value
    }

    try {
        const response = await axios.post('http://localhost:3000/user/signup', newUser);
        // localStorage.setItem('token', response.data.token);

        form.reset();
    }
    catch (e) {
        console.error('Failed to register:',e);

        if (e.response && e.response.status === 409) {
            prevError.textContent = 'User already exists';
        } else {
            prevError.textContent = 'Failed to register. Please try again.';
        }
    }
}