document.getElementById('assignGroup').addEventListener('click', function () {
    const group = document.getElementById('group').value;
    if (group === 'none') {
      alert("Veuillez sélectionner un groupe !");
      return;
    }
    const studentList = document.getElementById('groupStudents');
    const groupName = `Groupe ${group}`;
  
    studentList.innerHTML = `<h2>Étudiants dans ${groupName}</h2>`;
      const studentItem = document.createElement('div');
    studentItem.classList.add('student');
    studentItem.innerHTML = `
      <p><strong>Nom:</strong> Doe</p>
      <p><strong>Prénom(s):</strong> John</p>
      <p><strong>Numéro étudiant:</strong> 12345</p>
      <button class="remove" onclick="removeFromGroup(this)">Retirer du groupe</button>
    `;
    studentList.appendChild(studentItem);
  });
  
  function removeFromGroup(button) {
    button.parentElement.remove();
  }
  
  