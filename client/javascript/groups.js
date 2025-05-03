document.addEventListener('DOMContentLoaded', function() {
  loadGroupStudents('none');
  document.querySelectorAll('.group-tag').forEach(group => {
    group.addEventListener('click', function() {
      const selectedGroup = this.dataset.group;
      loadGroupStudents(selectedGroup);
            document.querySelectorAll('.group-tag').forEach(g => g.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
  

  function loadGroupStudents(groupNumber) {
  const url = groupNumber === 'none' 
    ? '/api/groups/none/students' 
    : `/api/groups/${groupNumber}/students`;

  const title = document.getElementById('currentGroupTitle');
  title.textContent = groupNumber === 'none' 
    ? 'Étudiants sans groupe' 
    : `Groupe ${groupNumber}`;


  fetch(url)
    .then(response => response.json())
    .then(students => {
      const container = document.getElementById('ungroupedStudents');
      container.innerHTML = '';

      if (students.length === 0) {
        container.innerHTML = '<tr><td colspan="4">Aucun étudiant dans ce groupe</td></tr>';
        return;
      }

      students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.firstnames}</td>
          <td>${student.number}</td>
          <td class="group-options">
            ${[1, 2, 3, 4, 5, 6].map(num => `
              <button class="group-option" 
                      data-group="${num}"
                      data-student-id="${student._id}">
                Groupe ${num}
              </button>
            `).join('')}
            ${groupNumber !== 'none' ? `
              <button class="remove-btn" 
                      data-student-id="${student._id}"
                      title="Retirer du groupe">
                 Retirer
              </button>
            ` : ''}
          </td>
        `;
        container.appendChild(row);
      });
      document.querySelectorAll('.group-option').forEach(button => {
        button.addEventListener('click', function() {
          const studentId = this.dataset.studentId;
          const newGroup = this.dataset.group;
          assignStudentToGroup(studentId, newGroup);
        });
        
        
      });
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
          const studentId = this.dataset.studentId;
          removeStudentFromGroup(studentId);
        });
      });
    })
    .catch(error => console.error('Erreur:', error));
}

function assignStudentToGroup(studentId, groupNumber) {
  if (!groupNumber || groupNumber < 1 || groupNumber > 6) {
    showMessage('Numéro de groupe invalide', 'error');
    return;
  }

  fetch('/api/groups/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      studentId, 
      groupNumber: parseInt(groupNumber)
    })
  })
  .then(response => response.json())
  .then(data => {
    showMessage(data.message, 'success');
    const currentGroup = document.querySelector('.group-tag.active').dataset.group;
    loadGroupStudents(currentGroup);
  })
  .catch(error => {
    console.error("Erreur d'assignation:", error);
    showMessage(error.message || "Erreur lors de l'assignation", 'error');
  });
}

  function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type; 
    setTimeout(() => messageDiv.textContent = '', 3000);
  }

  function removeStudentFromGroup(studentId) {
    fetch('/api/groups/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        studentId, 
        groupNumber: 'none'
      })
    })
    .then(response => response.json())
    .then(data => {
      showMessage(data.message, 'success');
      const currentGroup = document.querySelector('.group-tag.active').dataset.group;
      loadGroupStudents(currentGroup);
    })
    .catch(error => {
      console.error("Erreur de suppression:", error);
      showMessage(error.message , 'error');
    });
  }
async function loadStudents(groupNumber) {
  try {
    const endpoint = groupNumber === 'none' 
      ? '/api/groups/none/students' 
      : `/api/groups/${groupNumber}/students`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Erreur de chargement");
    
    const students = await response.json();
    renderStudents(students, groupNumber);
    
  } catch (error) {
    console.error("Chargement échoué:", error);
    showMessage(`Erreur: ${error.message}`, 'error');
  }
}



  
  