const form = document.querySelector('form');
const user = document.querySelector('input');
const messageone = document.querySelector('#messageone');
const messagetwo = document.querySelector('#messagetwo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = user.value;
    console.log(location);
    messageone.textContent = 'Loading...';
    messagetwo.textContent = '';
    fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageone.textContent = data.error;
                } else {
                    messageone.textContent = data.temperature + " Degree Celcius";
                    messagetwo.textContent = data.location;
                }
            })
        })
})