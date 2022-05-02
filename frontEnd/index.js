

// declare all var
const backEndUrl = 'http://localhost:3000';
const registerForm = document.getElementById('registerForm');
// let fullName = document.getElementById('name');
// let email = document.getElementById('email');
// let mobile = document.getElementById('mobile');

let fullName = document.getElementById('Name');
let dob = document.getElementById('dob');
let email = document.getElementById('Email');
let mobile = document.getElementById('number');
let compSub = document.getElementById('compSub');
let comp = document.getElementById('Message');

registerForm.addEventListener( 'submit', async (event) => {
    event.preventDefault(); // stop default behaviour / stop page refresh in this case
    if( fullName.value && email.value && mobile.value && compSub.value && comp.value  ) {
        // call backend
        // step - 1 - create payload
        const payload = {
            // name: fullName.value,
            // email: email.value,
            // mobile: mobile.value
            name: fullName.value,
            dob: dob.value,
            email: email.value,
            mobile: mobile.value,
            compSub: compSub.value,
            comp: comp.value
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
            alert('Complaint registered successfully.' + 'The status will be updated on '+ mobile.value + ' Thanks!!');
            // fullName.value = '';
            // email.value = '';
            // mobile.value = '';
            fullName.value='';
            dob.value='';
            email.value='';
            mobile.value='';
            compSub.value='';
            comp.value='';
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

