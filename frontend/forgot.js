const mail = document.querySelector('#mail');
const btn = document.querySelector('.btn')

const prevError = document.querySelector('#error');
const msg = document.querySelector('#msg');

mail.addEventListener('input',()=>{
    prevError.textContent='';
})

btn.addEventListener('click', async () => {

    if (prevError.textContent) return;

    if (!mail.value.includes('@')) {
        prevError.textContent = 'Invalid Email entered';
        return;
    }

    try {

        const response = await axios.post(`${baseUrl}/password/forgot`, { mail });
        msg.textContent = `Reset link has been sent to your mail`;
    }
    catch(e){
        console.error('Something went wrong',e);
        if (e.response && e.response.status == 400) prevError.textContent = `Account doesn't exist`;
    }
})