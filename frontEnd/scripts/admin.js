
const backEndUrl = 'http://localhost:3000';
const tableData = document.getElementById('tbody');
const loader = document.querySelector('.loader');

async function loadTable() {
  loader.style.display = 'block';
  let response = await fetch(`${ backEndUrl }/complaints`);
  if( response.ok ) {
    loader.style.display = 'none';
    let { user: complaints } = await response.json();
    console.log(complaints)
   
    // table render
    tableData.innerHTML = '';
    complaints.map( function(complaint) {
      console.log(complaint);
      let { comp: complaintDetails, compSub: subject, complaintNumberr, dob, email, name, mobile, createdAt } = complaint;
      tableData.innerHTML += `
        <tr>
          <td>${ complaintNumberr }</td>
          <td>${ name }</td>
          <td>${ moment(dob).format("Do MMM YYYY") }</td>
          <td>${ email }</td>
          <td>${ mobile }</td>
          <td>${ subject }</td>
          <td>${ complaintDetails }</td>
          <td>${ moment(createdAt).startOf('minute').fromNow()  }</td>
        </tr>
      `;
    } )
  } else {
    loader.style.display = 'none';

    alert('Failed To Fetch Details.');
  }
  
}

window.onload = async function () {
  await loadTable();
  $('#example').DataTable();
}

setInterval( async () => {
  await loadTable();
}, 60000)
