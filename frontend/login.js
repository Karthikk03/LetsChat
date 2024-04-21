const form = document.querySelector('form');

const mail = document.querySelector('#userMailInput')
const password = document.querySelector('#passwordInput');

const prevError = document.querySelector('#error');

form.addEventListener('submit', login);

form.addEventListener('input', function () {
    prevError.textContent = '';
});

async function login(e) {
    e.preventDefault();

    if (prevError.textContent) {
        prevError.textContent = '';
    }

    if (!mail.value.includes('@')) {
        prevError.textContent = 'Invalid email format';
        return;
    }

    if (password.value.length < 8) {
        prevError.textContent = 'Incorrect Password';
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/user/login', { email: mail.value, password: password.value });
        localStorage.setItem('token', response.data.token);
        form.reset();
        console.log(response)
    }
    catch (e) {
        console.error('Failed to login:', e);

        if (e.response && e.response.status < 500) {
            prevError.textContent = (e.response.status === 404) ? 'Please create account first' : 'Incorrect Password';
            return;
        }
        prevError.textContent = 'Failed to Login. Please try again.';

    }

}