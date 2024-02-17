function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))

  //add here event listener to delete button
  document.getElementById('dataTable').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
      const id = event.target.closest('tr').children[0].textContent;
      deleteEmployee(id);
    }
  });
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function (event) {
  event.preventDefault();
  createEmployee();
});
// TODO
// add event listener to delete button

// TODO
function createEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  if (!name || !id) return alert('Please fill all fields');
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
      document.getElementById('name').value = '';
      document.getElementById('id').value = '';
    })
    .catch(error => console.error('Error:', error));
}

// TODO
function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => fetchEmployees())
    .catch(error => console.error('Error:', error));
}
fetchEmployees()