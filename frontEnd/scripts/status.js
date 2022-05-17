function display() {
    let mobile = document.getElementById("mobile").value;
    let complaintNumber = document.getElementById("complaintNumber").value;

    if (mobile == "" || complaintNumber == "") {
        return alert("Please fill Credentials")
    }

    axios.get('http://localhost:3000/complaints', {})
        .then(function (response) {

            // something wrong in this function 
            let dataArray = response.data.user;
            let foundComplaint = dataArray.filter(function (data) {
                console.table(data );
                // Using every() function because in forEach() loop we cant use break statement
                
                if (mobile == data.mobile && complaintNumber == data.complaintNumberr) {
                    return data;
                }
            });
            console.log({foundComplaint});
            if( foundComplaint.length == 0 ) return alert('Complaint Not Found');
            let status;
            if(foundComplaint[0].status == 'pending') {
                status = 'Pending'
            } else if( foundComplaint[0].status == 'partially_solved' ) {
                status = 'Partially Solved';
            } else if( foundComplaint[0].status == 'solved' ) {
                status = 'Solved';
            } else if( foundComplaint[0].status == 'not_feasible' ) {
                status = 'Not Feasible';
            } else {
                status = 'N/A';
            }
            alert('Your Status is '+ status)
        })
        .catch(function (error) {
            alert("Error Occurs", error)
        })
        .then(function () {
            // always executed
        });
}