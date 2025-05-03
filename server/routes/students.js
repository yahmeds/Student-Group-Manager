document.getElementById('createUpdate').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const firstnames = document.getElementById('firstnames').value.trim();
    const number = document.getElementById('number').value.trim();
  
    if (!name || !firstnames || !number) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    const student = {
      name,
      firstnames,
      number
    };
      addStudentToList(student);
    clearForm();
  });
    function addStudentToList(student) {
    const studentList = document.getElementById('allstudents');
    const studentItem = document.createElement('div');
    studentItem.setAttribute('data-student-id', student._id); 
    studentItem.classList.add('student');
    studentItem.innerHTML = `
      <p><strong>Nom:</strong> ${student.name}</p>
      <p><strong>Prénom(s):</strong> ${student.firstnames}</p>
      <p><strong>Numéro étudiant:</strong> ${student.number}</p>
      <button class="delete" onclick="deleteStudent(this)">Supprimer</button>
    `;
    studentList.appendChild(studentItem);
  }
  
  function deleteStudent(button) {
    button.parentElement.remove();
  }
  
  function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('firstnames').value = '';
    document.getElementById('number').value = '';
  }
  
  document.getElementById('clear').addEventListener('click', function () {
    document.getElementById('allstudents').innerHTML = '';
  });
  