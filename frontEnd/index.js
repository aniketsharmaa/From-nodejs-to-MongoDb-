// declare all var
const backEndUrl = 'http://localhost:3000';
const registerForm = document.getElementById('registerForm');
let fullName = document.getElementById('name');
let email = document.getElementById('email');
let mobile = document.getElementById('mobile');

registerForm.addEventListener( 'submit', async (event) => {
    event.preventDefault(); // stop default behaviour / stop page refresh in this case
    if( fullName.value && email.value && mobile.value ) {
        // call backend
        // step - 1 - create payload
        const payload = {
            name: fullName.value,
            email: email.value,
            mobile: mobile.value
        }

        // step - 2 - send payload to the server
        let response = await fetch(
            `${backEndUrl}/register`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        )
        console.log(response);
        let data = await response.json();
        if( response.ok ) {
            console.log(data);
            // show success message
            alert('User registered successfully');
            fullName.value = '';
            email.value = '';
            mobile.value = '';
        } else {
            if( data.err ) {
                alert(data.err.message);
            } else {
                console.log(data);
                alert('Failed To Register');
            }
        }
    } else {
        alert('Please Fill All The Fields');
    }
} )