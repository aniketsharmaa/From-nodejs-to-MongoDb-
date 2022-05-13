function display() {
    let mobile = document.getElementById("mobile").value;
    let complaintNumber = document.getElementById("complaintNumber").value;



    axios.get('http://localhost:3000/complaints', {

    })
        .then(function (response) {

            response.data.user.every(function (data) {

                // Using every() function because in forEach() loop we cant use break statement
                
                if (mobile == data.mobile && complaintNumber == data.complaintNumberr) {
                    alert("Complaint is available")
                }
                else {
                    alert("Complaint is not available")
                  

                }


            })
        })
        .catch(function (error) {
            alert("Error Occurs")
        })
        .then(function () {
            // always executed
        });
}