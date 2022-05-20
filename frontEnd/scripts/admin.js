
const backEndUrl = 'http://localhost:3000';
const tableData = document.getElementById('tbody');
const loader = document.querySelector('.loader');

async function loadTable() {
  loader.style.display = 'block';
  let response = await fetch(`${backEndUrl}/complaints`);
  if (response.ok) {
    loader.style.display = 'none';
    let { user: complaints } = await response.json();
    console.log(complaints)

    // table render
    tableData.innerHTML = '';
    complaints.map(function (complaint) {
      console.log(complaint);
      let { comp: complaintDetails, compSub: subject, complaintNumberr, dob, email, name, mobile, createdAt, status } = complaint;
      tableData.innerHTML += `
        <tr>
          <td>${complaintNumberr}</td>
          <td>${name}</td>
          <td>${moment(dob).format("Do MMM YYYY")}</td>
          <td>${email}</td>
          <td>${mobile}</td>
          <td>${subject}</td>
          <td>${complaintDetails}</td>
          <td>${moment(createdAt).startOf('minute').fromNow()}</td>
          <td>
            <select onchange="changeStatus(this.value, ${complaintNumberr})">
              <option ${status == 'pending' ? 'selected' : ''} value="pending">Pending</option>
              <option ${status == 'solved' ? 'selected' : ''} value="solved">Solved</option>
              <option ${status == 'partially_solved' ? 'selected' : ''} value="partially_solved">Partially Solved</option>
              <option ${status == 'not_feasible' ? 'selected' : ''} value="not_feasible">Not Feasible</option>
            </select>
          </td>
        </tr>
      `;
    })
  } else {
    loader.style.display = 'none';

    alert('Failed To Fetch Details.');
  }

}

window.onload = async function () {
  await loadTable();
  $('#example').DataTable();
}

setInterval(async () => {
  await loadTable();
}, 90000);

async function changeStatus(value, complaintNumber) {
  // update status in the backend
  if (value == 'pending' || value == 'solved' || value == 'partially_solved' || value == 'not_feasible') {
    let response = await fetch(
      `${backEndUrl}/complaints/${complaintNumber}/update`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value })
      }
    )
    let data = await response.json();
    if( !response.ok ) {
      return alert(data.message ? data.message : 'Something went wrong')
    }
    console.log(data);
    alert('Complaint Updated Successfully');
  } else {
    alert('Please Select A Valid Option');
  }
}
