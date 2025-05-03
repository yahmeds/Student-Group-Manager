document.getElementById('createUpdate').addEventListener('click', function () {
  const name = document.getElementById('name').value.trim();
  const firstnames = document.getElementById('firstnames').value.trim();
  const number = document.getElementById('number').value.trim();

  if (!name || !firstnames || !number ) {
    showMessage("Tous les champs doivent être remplis !", "error");
    return;
  }

  const student = {
    name,
    firstnames,
    number
  };

  fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student) 
  })
  
  .then(response => response.json())
  .then(data => {
    if (data && data._id) {
      addStudentToList(data);
      showMessage(`Étudiant ${data.name} créé (numéro ${data.number})`, "success");    }
      clearForm();
  })

});

function addStudentToList(student) {
  const studentTable = document.getElementById('studentTable');
  const studentRow = document.createElement('tr');
  
  
  studentRow.setAttribute('data-student-id', student._id); 

  studentRow.innerHTML = `
    <td>${student.name}</td>
    <td>${student.firstnames}</td>
    <td>${student.number}</td>
  <td>
    <button class="update">MAJ</button>
    <button class="delete">Supprimer</button>
  </td>
`;
  
  studentTable.appendChild(studentRow);
  const deleteButton = studentRow.querySelector('.delete');
  deleteButton.addEventListener('click', function () {
    const studentId = studentRow.getAttribute('data-student-id');  
    if (!studentId) {
      console.error('Student ID is undefined or missing!');
    } else {
      deleteStudent(studentId); 
    }
  });
  const updateButton = studentRow.querySelector('.update');
updateButton.addEventListener('click', function() {
  const studentId = studentRow.getAttribute('data-student-id');
  if (!studentId) {
    console.error('Student ID is undefined for update!');
  } else {
    updateStudent(studentId);
  }
});
}

function loadStudents() {
  fetch('/api/students')
    .then(response => response.json())
    .then(students => {
      const studentTable = document.getElementById('studentTable');
      studentTable.innerHTML = ''; 
      students.forEach(student => {
        addStudentToList(student); 
      });
    })
    .catch(error => {
      console.error('Erreur:', error);
      showMessage("Erreur lors du chargement des étudiants", "error");
    });
}

document.addEventListener('DOMContentLoaded', loadStudents);

function updateStudent(studentId) {
  const row = document.querySelector(`tr[data-student-id="${studentId}"]`);
  if (!row) return;

  const cells = row.cells;
  const currentData = {
    name: cells[0].textContent,
    firstnames: cells[1].textContent,
    number: cells[2].textContent 
  };

  cells[0].innerHTML = `<input type="text" value="${currentData.name}" class="edit-name">`;
  cells[1].innerHTML = `<input type="text" value="${currentData.firstnames}" class="edit-firstnames">`;
  cells[2].textContent = currentData.number; 
  cells[3].innerHTML = `
    <button class="save">Enregistrer</button>
    <button class="cancel">Annuler</button>
  `;

  row.querySelector('.save').addEventListener('click', () => {
    const newData = {
      name: row.querySelector('.edit-name').value.trim(),
      firstnames: row.querySelector('.edit-firstnames').value.trim(),
      number: currentData.number 
    };
    if (!newData.name || !newData.firstnames) {
      showMessage("Le nom et le prénom sont obligatoires", "error");
      return;
    }

    fetch(`/api/students/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(updatedStudent => {
      loadStudents(); 
    })
    .catch(error => {
      showMessage("échec de la mise à jour", "error");
    });
  });

  row.querySelector('.cancel').addEventListener('click', () => {
    loadStudents(); 
  });
}

function deleteStudent(studentId) {
  fetch(`/api/students/${studentId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    const row = document.querySelector(`tr[data-student-id="${studentId}"]`);
    if (row) {
      row.remove();
      showMessage(data.message, "success");
    }
  })
  .catch(error => {
    showMessage(error.message, "error");  });
}

function showMessage(message, type = 'info') {
  const container = document.getElementById('message-container');
  const messageEl = document.createElement('div');
  
  messageEl.className = `message ${type}`;
  messageEl.textContent = message;
  
  container.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}
 
function clearDatabase() {
  fetch('/api/students', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      document.getElementById('studentTable').innerHTML = '';
      showMessage(data.message, 'success');
    }
  })
  .catch(error => {
    showMessage("Erreur lors de la suppression", 'error');
    console.error('Erreur:', error);
  });
}

document.getElementById('clear').addEventListener('click', clearDatabase);
